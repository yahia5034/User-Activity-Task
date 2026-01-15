# User Activity Log Microservice

This repository contains the backend microservice for the Eyego process. It is an event-driven application designed to handle user activity logs using Node.js, Kafka, and MongoDB, orchestrated with Kubernetes.

## Architecture Decisions

For this task, I aimed to build something that isn't just "working code" but a scalable foundation.

*   **Domain-Driven Design (DDD)**: I structured the codebase into `domain`, `infrastructure`, `application`, and `interfaces` layers. This ensures the core logic (the Log entity) remains isolated from the database or the message broker limitations.
*   **Event-Driven (Kafka)**: Instead of writing directly to the database from the API, I implemented a Producer-Consumer pattern. The API publishes events to Kafka, and a separate consumer processes and saves them.this allows the system to handle traffic spikes without blocking the client.
*   **MongoDB**: Since activity logs are high-volume and often semi-structured, a NoSQL solution like MongoDB offers better write performance and flexibility compared to a relational database.
*   **Kubernetes**: Used for deployment to ensure the service is self-healing and scalable. The configuration includes limits and readiness probes to simulate a production-ready environment.

## Tech Stack
*   **Runtime**: Node.js 20 (Alpine)
*   **Framework**: Express.js
*   **Message Broker**: Apache Kafka
*   **Database**: MongoDB
*   **Containerization**: Docker & Kubernetes

---

## Setup & Deployment

### Prerequisites
*   Docker & Kubernetes (Minikube or Docker Desktop)
*   Node.js (for local development)

### Option 1: Kubernetes (Recommended)
This deploys the entire stack (Mongo, Kafka/Zookeeper, App) to your cluster.

1.  **Apply Configurations**:
    ```bash
    kubectl apply -f src/k8s/kafka.yaml
    kubectl apply -f src/k8s/deployment.yaml
    kubectl apply -f src/k8s/mongo.yaml
    ```
    *Note: Allow a few moments for the Kafka and MongoDB pods to reach the `Running` state.*

2.  **Verify Pods**:
    ```bash
    kubectl get pods
    ```

3.  **Access the Service**:
    ```bash
    minikube service src-node-app
    ```
    The application is now available throught the outputed url.
    ```bash
    PS D:\yahia\TASK> minikube service src-node-app
    🏃  Starting tunnel for service src-node-app.
    │ NAMESPACE │     NAME     │ TARGET PORT │          URL           │
    ├───────────┼──────────────┼─────────────┼────────────────────────┤
    │ default   │ src-node-app │             │ http://127.0.0.1:50890 │
    └───────────┴──────────────┴─────────────┴────────────────────────┘
    🎉  Opening service default/src-node-app in default browser...
    ❗  Because you are using a Docker driver on windows, the terminal needs to be open to run it.
    ```

### Option 2: Docker Compose (Local Testing)
If you prefer running it without K8s overhead:
```bash
docker-compose up --build
```
The API will be available at `http://localhost:3000`.

---

## API Documentation

### 1. Ingest Log (Producer)
Send a new activity log to the Kafka topic.

*   **Endpoint**: `POST /logs`
*   **Body**:
    ```json
    {
      "userId": "user_123",
      "action": "click_button",
      "timestamp": "2024-01-15T10:00:00Z"
    }
    ```

### 2. Fetch Logs (Consumer View)
Retrieve processed logs from MongoDB with pagination.

*   **Endpoint**: `GET /logs`
*   **Query Params**:
    *   `page`: Page number (default: 1)
    *   `limit`: Items per page (default: 10)
    *   `userId`: Filter by specific user ID
*   **Example**:
    ```
    GET /logs?page=1&limit=5&userId=user_123
    ```

---

## Video Demo
[Link to recorded demo showcasing end-to-end functionality]

## Project Structure
```
src/
├── application/     # Use Cases (Business Logic flows)
├── domain/          # Entities and validation logic
├── infrastructure/  # MongoDB models, Kafka producer/consumer
├── interfaces/      # Express routes and controllers
└── k8s/             # Kubernetes Manifests
```

---
*Submission for Eyego Backend Internship.*
