package com.curriculum.auth.security;

import com.curriculum.auth.domain.model.User;
import com.curriculum.auth.infrastructure.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final CustomUserDetailsService userDetailsService;
  private final UserRepository userRepository;

  public JwtAuthFilter(JwtService jwtService,
      CustomUserDetailsService userDetailsService,
      UserRepository userRepository) {
    this.jwtService = jwtService;
    this.userDetailsService = userDetailsService;
    this.userRepository = userRepository;
  }

  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {

    final String header = request.getHeader("Authorization");
    if (!StringUtils.hasText(header) || !header.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    final String token = header.substring(7);
    if (!jwtService.validateToken(token)) {
      filterChain.doFilter(request, response);
      return;
    }

    Claims claims = jwtService.parseClaims(token);
    String email = claims.getSubject();

    if (email == null || SecurityContextHolder.getContext().getAuthentication() != null) {
      filterChain.doFilter(request, response);
      return;
    }

    // Load full User from DB
    Optional<User> maybeUser = userRepository.findByEmail(email);
    if (maybeUser.isEmpty()) {
      filterChain.doFilter(request, response);
      return;
    }

    User user = maybeUser.get();
    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

    // Create authentication token
    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
        userDetails,
        null,
        userDetails.getAuthorities());

    auth.setDetails(String.valueOf(user.getId()));

    SecurityContextHolder.getContext().setAuthentication(auth);

    filterChain.doFilter(request, response);
  }
}
