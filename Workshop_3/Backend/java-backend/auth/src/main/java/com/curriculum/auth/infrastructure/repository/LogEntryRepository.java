package com.curriculum.auth.infrastructure.repository;

import com.curriculum.auth.domain.model.LogEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogEntryRepository extends JpaRepository<LogEntry, Integer> {

  // Encontrar Logs ordenados por fecha de creación
  List<LogEntry> findAllByOrderByTimestampDesc();

}
