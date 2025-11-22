package com.curriculum.auth.infrastructure.repository;

import com.curriculum.auth.domain.model.LogEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogEntryRepository extends JpaRepository<LogEntry, Integer> {
}
