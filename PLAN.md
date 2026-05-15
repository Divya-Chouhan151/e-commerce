# E-Commerce Website Plan: Hand-Knitted Items (Microservices Architecture)

## Background & Motivation
The goal is to build an e-commerce website for selling hand-knitted items. The architectural goal is to implement a highly scalable, enterprise-grade **Microservices Architecture** using Java 17 and Spring Boot, with a heavy emphasis on **automated testing** and **security compliance**.

## Scope & Impact
The project will be built from scratch in `/home/divya/projects/hunar/`.
- **Backend Framework:** Java 17, Spring Boot 3.x
- **Frontend Framework:** Next.js (React) with Tailwind CSS
- **Inter-service Communication:** Spring Cloud OpenFeign, REST APIs.
- **Infrastructure:** Spring Cloud Gateway, Netflix Eureka.
- **Testing:** JUnit 5, Mockito, AssertJ, Spring Boot Test (Integration Tests).
- **Quality & Security:** Adherence to SonarQube (Code Quality) and Checkmarx (SAST) standards.

## Proposed Solution: Microservices Architecture

### 1. Frontend Application (`frontend-app`)
- Next.js UI communicating with the API Gateway.

### 2. API Gateway & Service Registry
- `api-gateway` (Port 8080) and `discovery-server` (Port 8761).

### 3. Core Microservices
- `user-service`: Auth, Profiles, Wishlists.
- `product-service`: Catalog and Inventory.
- `order-service`: Checkout and History.

## Quality & Validation Strategy

### 1. Automated Testing (Mandatory)
Each Java class will be accompanied by corresponding tests:
- **Unit Tests:** Using **JUnit 5** and **Mockito** to test service logic in isolation (mocking database and external calls).
- **Integration Tests:** Using **@SpringBootTest** and **Testcontainers** (if available) to test the interaction between the API, Service, and Database layers.
- **Target Coverage:** Aim for high line and branch coverage to satisfy SonarQube requirements.

### 2. Security & Vulnerability Scanning (Sonar & Checkmarx)
We will follow "Security by Design" to ensure the code passes SonarQube and Checkmarx scans:
- **Input Sanitization:** Rigorous use of `@Valid` and Bean Validation to prevent injection.
- **No Secrets in Code:** Use environment variables and Spring Cloud Config for sensitive data (to avoid Checkmarx hardcoded secrets).
- **Secure Communication:** JWT for authentication and encrypted communication where applicable.
- **Dependency Scanning:** Ensure all libraries are up-to-date to avoid known CVEs.

## Phased Implementation Plan

### Phase 1: Infrastructure & Project Setup
1. Initialize multi-module project structure.
2. Setup `discovery-server` and `api-gateway`.
3. **Verify:** Run initial build and ensure zero "Code Smells" in local analysis.

### Phase 2: Core Microservices with TDD
1. Build `product-service`: 
   - Implement DTOs, Entities, Repositories, and Services.
   - **Write Unit Tests** for all Service methods.
   - **Write Integration Tests** for REST endpoints.
2. Repeat for `user-service` and `order-service`.

### Phase 3: Frontend & Integration
1. Initialize Next.js and build UI components.
2. Implement cross-service calls via Feign with error handling and fallback logic.

### Phase 4: Final Validation
1. Execute the full test suite across all modules.
2. Perform a final code review focused on Sonar/Checkmarx compliance (avoiding `System.out`, ensuring proper logging, fixing potential null pointers).

## Verification
- **Test Success:** 100% pass rate for all JUnit tests.
- **Inventory Integrity:** Test cases specifically for race conditions during inventory deduction.
- **Security Check:** Verify JWT tokens are correctly validated and unauthorized access is blocked.
