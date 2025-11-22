package com.curriculum.auth.config;

import com.curriculum.auth.security.AuthEntryPointJwt;
import com.curriculum.auth.security.CustomUserDetailsService;
import com.curriculum.auth.security.JwtAuthFilter;
import com.curriculum.auth.security.JwtService;
import com.curriculum.auth.infrastructure.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// This class manages the distintion between public and private endpoints
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

  private final JwtService jwtService;
  private final CustomUserDetailsService userDetailsService;
  private final AuthEntryPointJwt authEntryPoint;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  public SecurityConfig(JwtService jwtService,
      CustomUserDetailsService userDetailsService,
      AuthEntryPointJwt authEntryPoint,
      PasswordEncoder passwordEncoder,
      UserRepository userRepository) {
    this.jwtService = jwtService;
    this.userDetailsService = userDetailsService;
    this.authEntryPoint = authEntryPoint;
    this.passwordEncoder = passwordEncoder;
    this.userRepository = userRepository;
  }

  @Bean
  public JwtAuthFilter jwtAuthFilter() {
    return new JwtAuthFilter(jwtService, userDetailsService, userRepository);
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .cors(Customizer.withDefaults())
        .csrf(csrf -> csrf.disable())
        .exceptionHandling(ex -> ex.authenticationEntryPoint(authEntryPoint))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            // Public endpoints - no authentication required
            .requestMatchers("/auth/register").permitAll() // Student self-registration
            .requestMatchers("/auth/login").permitAll() // Login for all users
            .requestMatchers(HttpMethod.GET, "/actuator/**").permitAll()

            // Admin-only endpoints - requires ROLE_ADMIN
            .requestMatchers("/admin/**").hasRole("ADMIN") // All admin operations

            // All other requests require authentication
            .anyRequest().authenticated());

    http.addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig)
      throws Exception {
    return authConfig.getAuthenticationManager();
  }
}
