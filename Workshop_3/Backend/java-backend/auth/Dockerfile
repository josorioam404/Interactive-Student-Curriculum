# Stage 1: Build
FROM maven:3.9.5-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy pom and source
COPY pom.xml .
COPY src ./src

# Package the app
RUN mvn package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy the JAR from build stage
COPY --from=build /app/target/auth-service-1.0.0.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]


