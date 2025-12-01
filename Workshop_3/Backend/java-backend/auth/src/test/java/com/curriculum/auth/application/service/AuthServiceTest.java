package com.curriculum.auth.application.service;

import com.curriculum.auth.application.dto.LoginRequest;
import com.curriculum.auth.application.dto.RegisterRequest;
import com.curriculum.auth.application.dto.AuthResponse;
import com.curriculum.auth.domain.model.Student;
import com.curriculum.auth.domain.model.User;
import com.curriculum.auth.infrastructure.repository.UserRepository;
import com.curriculum.auth.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
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
    
    private Student testStudent;
    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        testStudent = new Student("Test User", "test@unal.edu.co", "encodedPassword", "ing_sistemas");
        
        registerRequest = new RegisterRequest();
        registerRequest.setFullName("Test User");
        registerRequest.setEmail("test@unal.edu.co");
        registerRequest.setPassword("password123");
        registerRequest.setSelectedProgramCodeSia("ing_sistemas");
        
        loginRequest = new LoginRequest();
        loginRequest.setEmail("test@unal.edu.co");
        loginRequest.setPassword("password123");
    }

    @Test
    void registerStudent_ShouldCreateUser_WhenValidRequest() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(testStudent);
        when(jwtService.generateToken(anyString(), any(Map.class))).thenReturn("jwt-token");

        AuthResponse response = authService.registerStudent(registerRequest);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals("test@unal.edu.co", response.getEmail());
        assertEquals("student", response.getRole());
        
        verify(userRepository).existsByEmail(registerRequest.getEmail());
        verify(passwordEncoder).encode(registerRequest.getPassword());
        verify(userRepository).save(any(User.class));
        verify(jwtService).generateToken(anyString(), any(Map.class));
    }

    @Test
    void registerStudent_ShouldThrowException_WhenEmailExists() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(true);

        assertThrows(RuntimeException.class, () -> authService.registerStudent(registerRequest));
        
        verify(userRepository).existsByEmail(registerRequest.getEmail());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void login_ShouldReturnToken_WhenValidCredentials() {
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(testStudent));
        when(passwordEncoder.matches(loginRequest.getPassword(), testStudent.getPasswordHash())).thenReturn(true);
        when(jwtService.generateToken(anyString(), any(Map.class))).thenReturn("jwt-token");

        AuthResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals("test@unal.edu.co", response.getEmail());
        assertEquals("student", response.getRole());
        
        verify(userRepository).findByEmail(loginRequest.getEmail());
        verify(passwordEncoder).matches(loginRequest.getPassword(), testStudent.getPasswordHash());
        verify(jwtService).generateToken(anyString(), any(Map.class));
    }

    @Test
    void login_ShouldThrowException_WhenUserNotFound() {
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> authService.login(loginRequest));
        
        verify(userRepository).findByEmail(loginRequest.getEmail());
        verify(jwtService, never()).generateToken(anyString(), any(Map.class));
    }
}