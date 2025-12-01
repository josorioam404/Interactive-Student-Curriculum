package com.curriculum.auth.controller;

import com.curriculum.auth.application.dto.AuthResponse;
import com.curriculum.auth.application.dto.LoginRequest;
import com.curriculum.auth.application.dto.RegisterRequest;
import com.curriculum.auth.application.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void registerStudent_ShouldReturnAuthResponse_WhenValidRequest() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setFullName("Test User");
        request.setEmail("test@unal.edu.co");
        request.setPassword("password123");
        request.setSelectedProgramCodeSia("ing_sistemas");

        AuthResponse response = new AuthResponse("jwt-token", "1", "Test User", "student", "test@unal.edu.co", "Ingeniería", "ing_sistemas");
        when(authService.registerStudent(any(RegisterRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/register/student")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("jwt-token"))
                .andExpect(jsonPath("$.email").value("test@unal.edu.co"))
                .andExpect(jsonPath("$.role").value("student"));
    }

    @Test
    void login_ShouldReturnAuthResponse_WhenValidCredentials() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@unal.edu.co");
        request.setPassword("password123");

        AuthResponse response = new AuthResponse("jwt-token", "1", "Test User", "student", "test@unal.edu.co", "Ingeniería", "ing_sistemas");
        when(authService.login(any(LoginRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("jwt-token"))
                .andExpect(jsonPath("$.email").value("test@unal.edu.co"));
    }

    @Test
    void registerStudent_ShouldReturnBadRequest_WhenInvalidEmail() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setFullName("Test User");
        request.setEmail("invalid-email");
        request.setPassword("password123");

        mockMvc.perform(post("/api/auth/register/student")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }
}