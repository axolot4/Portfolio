 # Use a Gradle image with Java 17 instead of the default Gradle image
FROM gradle:8.11-jdk17 AS builder
WORKDIR /usr/src/app

# Copy source files and build.gradle
COPY src ./src
COPY build.gradle .
COPY settings.gradle .
# Ensure settings.gradle is copied if it exists
COPY gradle ./gradle
COPY gradlew .
COPY gradlew.bat .

# Ensure Gradle Wrapper has execution permissions
RUN chmod +x gradlew

# Build the Spring Boot JAR file using the Gradle Wrapper
RUN ./gradlew bootJar --no-daemon

EXPOSE 8080

# Use OpenJDK 17 as the runtime
FROM openjdk:17
ARG JAR_FILE=build/libs/*.jar

# Copy the built JAR file from the builder stage
COPY --from=builder /usr/src/app/${JAR_FILE} app.jar

# Install curl and jq (optional)
#RUN apt-get update && apt-get install -y curl jq

# Set the default command to run the Spring Boot app
ENTRYPOINT ["java", "-jar", "/app.jar"] 