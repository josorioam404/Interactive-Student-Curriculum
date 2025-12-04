# **API Documentation**
# java-backend 

java-backend is responsible of Auth and application control logic.  

## **Base URL**
```
http://localhost:8080
```

## **Authentication**
Secured endpoints require a JWT token.

```
Authorization: Bearer <JWT>
```

---

# AUTH ENDPOINTS — `/auth`

## **POST /auth/register**
Endpoint used for registering a new student user, it's called by the Frontend after register request.

### **Request Body (`RegisterRequest`)**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "programCode": "ING01"
}
```

### **Success Response (200)**
```json
{
  "userId": 12,
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "STUDENT",
  "token": "<JWT>"
}
```

### **Error Response (400)**
```json
{
  "error": "BAD_REQUEST",
  "message": "Email already exists"
}
```

---

## **POST /auth/login**
Endpoint used for login users (Admins and Students), it's called by the Frontend after login request, in success returns a JWT Token.

### **Request Body (`LoginRequest`)**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### **Success Response (200)**
```json
{
  "userId": 12,
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "STUDENT",
  "token": "<JWT>"
}
```

### **Error Response (401)**
```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid credentials"
}
```

---

## **PUT /auth/update-program**
Endpoint used for updating academic program of users, it's called just after login successfully.

### **Auth Required:** Yes (Student)  
### **Request Body (`UpdateProgramRequest`)**
```json
{
  "programCode": "ING02"
}
```

### **Success Response (200)**
```json
{
  "userId": "12",
  "name": "John Doe",
  "email": "john@example.com",
  "programCode": "ING02",
  "message": "Program updated successfully"
}
```

### **Error Response (400)**
```json
{
  "error": "BAD_REQUEST",
  "message": "User not found"
}
```

---

# ADMIN ENDPOINTS — `/admin`
# Requires Role: **ADMIN**

## **GET /admin/logs**
Endpoint used for retrieving all audit logs entries (newest first), it's called at entering admin panel and after doing an admin modification.

### **Auth Required:** Yes (Admin)

### **Success Response (200)**
```json
[
  {
    "id": 101,
    "adminId": 1,
    "action": "CREATE_ADMIN",
    "targetType": "User",
    "targetId": "12",
    "details": "Created new admin: admin@example.com",
    "timestamp": "2024-01-01T15:32:10"
  }
]
```

---

## **POST /admin/create-admin**
Endpoint used for creating a new admin account, it's called by the Frontend after filling and pressing the <Create admin> button. 

### **Auth Required:** Yes (Admin)

### **Request Body (`RegisterRequest`)**
```json
{
  "fullName": "New Admin",
  "email": "admin2@example.com",
  "password": "password123"
}
```

### **Success Response (200)**
```json
{
  "userId": 15,
  "fullName": "New Admin",
  "email": "admin2@example.com",
  "role": "ADMIN",
  "token": "<JWT>"
}
```

### **Error Response (400)**
```json
{
  "error": "BAD_REQUEST",
  "message": "Admin creation failed"
}
```

---

## **POST /admin/upload-curriculum**
Endpoint used for uploading a curriculum to the database via **JSON/CSV**. It's called by the frontend and on success, Python FastAPI service is called.

### **Auth Required:** Yes (Admin)  
### **Consumes:** `multipart/form-data`

### **Request Example**
```
POST /admin/upload-curriculum
Content-Type: multipart/form-data

file: curriculum.csv
```

### **Success Response (200)**  
```json
{
  "success": true,
  "fileName": "curriculum.csv",
  "recordsProcessed": 120,
  "recordsCreated": 80,
  "recordsUpdated": 30,
  "recordsFailed": 10
}
```

### **Error Response (400)** — Invalid file
```json
{
  "error": "BAD_REQUEST",
  "message": "Archivo inválido. Debe ser CSV o JSON y menor a 10MB."
}
```

### **Error Response (500)** — Python service error
```json
{
  "error": "INTERNAL_ERROR",
  "message": "Error procesando archivo: <details>"
}
```

# python-backend 

python-backend handles curriculum/business logic and student progress.  
**Base URL:** `http://localhost:8000`  
**Auth:** Pass `Authorization: Bearer <JWT>` issued by the Java service for protected routes.

## Health — `/health`
**GET /health** — Connectivity check to PostgreSQL.  
Response 200
```json
{
  "status": "healthy",
  "database": "connected"
}
```

## Student — `/api/student`
**GET /api/student/curriculum** — Full curriculum for the authenticated student.  
Response 200
```json
{
  "userId": 12,
  "userName": "John Doe",
  "programCode": "ING01",
  "curriculum": [
    {
      "id": 1,
      "subject_code": "FUND101",
      "suggested_semester": 1,
      "component": "Core",
      "is_obligatory": true,
      "prereq_rules": null,
      "subject": {
        "name": "Foundations I",
        "credits": 3,
        "weekly_hours": 4,
        "description": "Intro course"
      },
      "progress": {
        "status": "Completed",
        "final_grade": 4.2
      }
    }
  ]
}
```

**GET /api/student/progress-summary** — Credits and GPA summary.  
Response 200
```json
{
  "userId": 12,
  "completedSubjects": 6,
  "completedCredits": 18,
  "totalProgramCredits": 160,
  "progressPercentage": 11.3,
  "gpa": 4.1,
  "papa": 4.0
}
```

**POST /api/student/progress** — Upsert subject status/grade.  
Query/form params: `subject_code` (string), `status` ("Not Taken" | "Completed" | "Planned" | "Enrolled"), `final_grade` (optional 0.0–5.0).  
Response 200
```json
{
  "success": true,
  "message": "Progress updated for FUND101",
  "subject_code": "FUND101",
  "status": "Completed",
  "final_grade": 4.5
}
```

**GET /api/student/available-courses** — Subjects unlocked by prerequisites.  
Response 200
```json
{
  "userId": 12,
  "availableCourses": [
    {
      "subject_code": "CALC102",
      "name": "Calculus II",
      "credits": 4,
      "suggested_semester": 2,
      "status": "Not Taken"
    }
  ],
  "count": 1
}
```

## Curriculum — `/api/curriculum`
**GET /api/curriculum/available-subjects** — Alternative calculation of available subjects (based on completed courses).  
Response 200
```json
{
  "userId": 12,
  "data": [
    {
      "code": "CALC102",
      "name": "Calculus II",
      "credits": 4,
      "semester": 2,
      "component": "Core",
      "status": "Available"
    }
  ]
}
```

**POST /api/curriculum/upload** — Upload CSV/JSON study plan (multipart/form-data).  
Request (multipart):
```
file: curriculum.csv
```
Response 200
```json
{
  "success": true,
  "message": "Archivo curriculum.csv procesado correctamente",
  "recordsProcessed": 120,
  "recordsCreated": 120,
  "recordsUpdated": 0,
  "recordsFailed": 0
}
```

## Admin (placeholders) — `/api/subjects`
These endpoints currently return stub data for UI development.

**GET /api/subjects/search?query=phys**  
Response 200
```json
[{
  "code": "FISG1001",
  "name": "Fundamentos de Física I",
  "credits": 4,
  "prerequisites": []
}]
```

**GET /api/subjects/{code}**  
Response 200
```json
{
  "code": "FISG1001",
  "name": "Fundamentos de Física I",
  "credits": 4,
  "type": "Required",
  "semester": 1,
  "prerequisites": []
}
```

**PUT /api/subjects/{code}**  
Request body example:
```json
{
  "name": "Fundamentos de Física I",
  "credits": 4,
  "prerequisites": []
}
```
Response 200
```json
{
  "success": true,
  "message": "Subject FISG1001 updated successfully",
  "subject": {
    "name": "Fundamentos de Física I",
    "credits": 4,
    "prerequisites": []
  }
}
```
