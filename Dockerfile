FROM gradle:9-jdk26 AS builder
WORKDIR /app
COPY . .
RUN gradle assemble --no-daemon

FROM eclipse-temurin:26-jdk-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
