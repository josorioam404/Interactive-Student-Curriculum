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

python-backend is responsible of CRUD and business logic of the app.

