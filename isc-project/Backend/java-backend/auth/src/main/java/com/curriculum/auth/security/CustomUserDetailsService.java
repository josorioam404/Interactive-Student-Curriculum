package com.curriculum.auth.security;

import com.curriculum.auth.domain.model.User;
import com.curriculum.auth.infrastructure.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

  private final UserRepository userRepository;

  public CustomUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
    Optional<User> maybeUser = userRepository.findByEmail(identifier);
    if (maybeUser.isEmpty()) {
      maybeUser = userRepository.findByFullName(identifier);
    }

    User user = maybeUser.orElseThrow(
        () -> new UsernameNotFoundException("User not found: " + identifier));

    String roleStr = user.getRole().toUpperCase();

    GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + roleStr);

    return org.springframework.security.core.userdetails.User.builder()
        .username(user.getEmail())
        .password(user.getPasswordHash())
        .authorities(List.of(authority))
        .build();
  }
}
