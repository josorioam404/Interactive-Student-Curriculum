package com.curriculum.auth.application.service;

import com.curriculum.auth.application.dto.FileUploadResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CurriculumImportService {

  @Value("${python.api.url}")
  private String pythonApiUrl;

  private final RestTemplate restTemplate;

  public CurriculumImportService() {
    this.restTemplate = new RestTemplate();
  }

  /**
   * Process uploaded curriculum file by forwarding to Python FastAPI
   */
  public FileUploadResponse processFile(MultipartFile file) {
    String fileName = file.getOriginalFilename();

    if (fileName == null || fileName.isEmpty()) {
      return new FileUploadResponse(
          false,
          "Nombre de archivo inválido",
          0, 0, 0, 0,
          "");
    }

    try {
      // Forward file to Python FastAPI
      return forwardToPythonAPI(file);

    } catch (Exception e) {
      return new FileUploadResponse(
          false,
          "Error procesando archivo: " + e.getMessage(),
          0, 0, 0, 0,
          fileName);
    }
  }

  /**
   * Forward file to Python FastAPI endpoint
   */
  private FileUploadResponse forwardToPythonAPI(MultipartFile file) throws Exception {
    String fileName = file.getOriginalFilename();

    // Prepare multipart request
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.MULTIPART_FORM_DATA);

    // Convert MultipartFile to ByteArrayResource for RestTemplate
    ByteArrayResource fileResource = new ByteArrayResource(file.getBytes()) {
      @Override
      public String getFilename() {
        return fileName;
      }
    };

    // Build multipart body
    MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
    body.add("file", fileResource);

    HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

    // Call Python API endpoint
    String pythonEndpoint = pythonApiUrl + "/api/curriculum/upload";

    try {
      ResponseEntity<PythonUploadResponse> response = restTemplate.exchange(
          pythonEndpoint,
          HttpMethod.POST,
          requestEntity,
          PythonUploadResponse.class);

      // Check if request was successful
      if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
        PythonUploadResponse pythonResponse = response.getBody();

        return new FileUploadResponse(
            pythonResponse.isSuccess(),
            pythonResponse.getMessage(),
            pythonResponse.getRecordsProcessed(),
            pythonResponse.getRecordsCreated(),
            pythonResponse.getRecordsUpdated(),
            pythonResponse.getRecordsFailed(),
            fileName);
      } else {
        return new FileUploadResponse(
            false,
            "Error en respuesta de Python: " + response.getStatusCode(),
            0, 0, 0, 0,
            fileName);
      }

    } catch (Exception e) {
      // If Python API is not available or returns error
      return new FileUploadResponse(
          false,
          "Error conectando con Python API: " + e.getMessage() +
              ". Verifique que el servidor Python esté corriendo en " + pythonApiUrl,
          0, 0, 0, 0,
          fileName);
    }
  }

  /**
   * Validate file size and type
   */
  public boolean validateFile(MultipartFile file) {
    // Check file is not empty
    if (file.isEmpty()) {
      return false;
    }

    // Check file size (max 10MB)
    long maxSize = 10 * 1024 * 1024; // 10MB
    if (file.getSize() > maxSize) {
      return false;
    }

    // Check file extension
    String fileName = file.getOriginalFilename();
    if (fileName == null) {
      return false;
    }

    String extension = fileName.toLowerCase();
    return extension.endsWith(".csv") || extension.endsWith(".json");
  }

  /**
   * Inner class to map Python API response
   */
  private static class PythonUploadResponse {
    private boolean success;
    private String message;
    private int recordsProcessed;
    private int recordsCreated;
    private int recordsUpdated;
    private int recordsFailed;

    public PythonUploadResponse() {
    }

    // Getters and Setters
    public boolean isSuccess() {
      return success;
    }

    public void setSuccess(boolean success) {
      this.success = success;
    }

    public String getMessage() {
      return message;
    }

    public void setMessage(String message) {
      this.message = message;
    }

    public int getRecordsProcessed() {
      return recordsProcessed;
    }

    public void setRecordsProcessed(int recordsProcessed) {
      this.recordsProcessed = recordsProcessed;
    }

    public int getRecordsCreated() {
      return recordsCreated;
    }

    public void setRecordsCreated(int recordsCreated) {
      this.recordsCreated = recordsCreated;
    }

    public int getRecordsUpdated() {
      return recordsUpdated;
    }

    public void setRecordsUpdated(int recordsUpdated) {
      this.recordsUpdated = recordsUpdated;
    }

    public int getRecordsFailed() {
      return recordsFailed;
    }

    public void setRecordsFailed(int recordsFailed) {
      this.recordsFailed = recordsFailed;
    }
  }
}
