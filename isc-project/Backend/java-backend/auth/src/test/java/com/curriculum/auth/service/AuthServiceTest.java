package com.curriculum.auth.service;

import com.curriculum.auth.application.dto.LoginRequest;
import com.curriculum.auth.application.dto.RegisterRequest;
import com.curriculum.auth.application.service.AuthService;
import com.curriculum.auth.domain.model.Student;
import com.curriculum.auth.infrastructure.repository.UserRepository;
import com.curriculum.auth.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @Mock
    private JwtService jwtService;
    
    @InjectMocks
    private AuthService authService;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private Student testStudent;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest();
        registerRequest.setFullName("Test User");
        registerRequest.setEmail("test@example.com");
        registerRequest.setPassword("password123");
        registerRequest.setSelectedProgramCodeSia("ING01");

        loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");

        testStudent = new Student("Test User", "test@example.com", "encodedPassword", "ING01");
    }

    @Test
    void registerStudent_Success() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(Student.class))).thenReturn(testStudent);
        when(jwtService.generateToken(anyString(), anyMap())).thenReturn("jwt-token");

        var result = authService.registerStudent(registerRequest);

        assertNotNull(result);
        assertEquals("Test User", result.getName());
        assertEquals("test@example.com", result.getEmail());
        assertEquals("jwt-token", result.getToken());
        verify(userRepository).save(any(Student.class));
    }

    @Test
    void registerStudent_EmailExists_ThrowsException() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(true);

        assertThrows(RuntimeException.class, () -> authService.registerStudent(registerRequest));
        verify(userRepository, never()).save(any(Student.class));
    }

    @Test
    void login_Success() {
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(testStudent));
        when(passwordEncoder.matches(loginRequest.getPassword(), testStudent.getPasswordHash())).thenReturn(true);
        when(jwtService.generateToken(anyString(), anyMap())).thenReturn("jwt-token");

        var result = authService.login(loginRequest);

        assertNotNull(result);
        assertEquals("Test User", result.getName());
        assertEquals("jwt-token", result.getToken());
    }

    @Test
    void login_InvalidCredentials_ThrowsException() {
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(testStudent));
        when(passwordEncoder.matches(loginRequest.getPassword(), testStudent.getPasswordHash())).thenReturn(false);

        assertThrows(RuntimeException.class, () -> authService.login(loginRequest));
    }

    @Test
    void login_UserNotFound_ThrowsException() {
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> authService.login(loginRequest));
    }
}