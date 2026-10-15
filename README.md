# CloudTask — Task Management Platform

**A MERN Stack Application with a DevOps and Cloud Deployment Workflow**

CloudTask is a full-stack task management application developed as part of my DevOps Engineer Internship Final Project. The project combines application development with containerization, automated testing, CI/CD, security scanning, cloud infrastructure, deployment, and monitoring.

The main goal is to demonstrate how a simple web application can move from local development toward a repeatable, secure, and maintainable cloud deployment workflow.

**Project:** CloudTask — Task Management Platform  
**Category:** MERN Stack Development / DevOps / Cloud Engineering  
**Repository:** [Task-Management-application](https://github.com/UbimasterOfficial/Task-Management-application)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Objectives](#project-objectives)
- [Application Features](#application-features)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Project Structure](#project-structure)
- [REST API Documentation](#rest-api-documentation)
- [Environment Configuration](#environment-configuration)
- [Run the Application Locally](#run-the-application-locally)
- [Docker and Containerization](#docker-and-containerization)
- [Code Quality and Automated Testing](#code-quality-and-automated-testing)
- [Logging and Health Checks](#logging-and-health-checks)
- [CI/CD Pipeline](#cicd-pipeline)
- [Container Security Scanning](#container-security-scanning)
- [Kubernetes Deployment](#kubernetes-deployment)
- [AWS Cloud Architecture](#aws-cloud-architecture)
- [Infrastructure as Code](#infrastructure-as-code)
- [Monitoring and Troubleshooting](#monitoring-and-troubleshooting)
- [Security Practices](#security-practices)
- [Key Learning Outcomes](#key-learning-outcomes)
- [Project Screenshots](#project-screenshots)
- [Author](#author)

---

## Project Overview

CloudTask is a task management application built with the MERN stack:

- **MongoDB** — stores application data.
- **Express.js** — provides the backend REST API.
- **React** — builds the frontend user interface.
- **Node.js** — runs the backend application.

The application allows users to create tasks, view existing tasks, update task information and status, delete tasks, and filter tasks by status.

The project also includes development and operational features such as environment-based configuration, structured application logging, HTTP request logging, a health endpoint, automated API tests, code quality checks, and Docker containerization.

Beyond the application itself, the project demonstrates how DevOps practices can help automate the process of testing, building, scanning, deploying, and monitoring an application.

## Project Objectives

The main objectives are:

1. Develop a working full-stack MERN application.
2. Keep the source code simple, readable, and suitable for maintenance.
3. Create separate Docker images for the frontend and backend.
4. Automate code quality checks and backend tests.
5. Build Docker images automatically through GitHub Actions.
6. Scan container images for known vulnerabilities with Trivy.
7. Learn Kubernetes deployment, health probes, rollouts, and rollbacks.
8. Provision cloud infrastructure using Terraform.
9. Deploy the application on AWS using Amazon ECR and Amazon ECS.
10. Use MongoDB Atlas as the managed database.
11. Implement application health checks, logging, and monitoring.
12. Document the complete development and deployment process.

## Application Features

### Task Management

- Create a new task.
- View all existing tasks.
- View an individual task.
- Update task details and status.
- Delete a task.
- Filter tasks by status.
- Manage task priority where supported by the application.

### Backend and Operational Features

- RESTful API built with Express.js.
- MongoDB database integration using Mongoose.
- Environment-variable-based configuration.
- `/health` endpoint for application health checks.
- Application logging with Winston.
- HTTP request logging with Morgan.
- Automated API tests using Jest and Supertest.
- Code quality checks using ESLint.
- Docker-based packaging for deployment.

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React, JavaScript, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Containerization | Docker, Dockerfiles |
| CI/CD | GitHub Actions |
| Automated testing | Jest, Supertest |
| Code quality | ESLint |
| Security scanning | Trivy |
| Application logging | Winston |
| HTTP request logging | Morgan |
| Container orchestration learning | Kubernetes, Minikube |
| Infrastructure as Code | Terraform |
| Container registry | Amazon ECR |
| Cloud deployment | Amazon ECS with AWS Fargate |
| Load balancing | Application Load Balancer (ALB) |
| Networking | Amazon VPC, public and private subnets, NAT Gateway |
| Monitoring | Amazon CloudWatch |
| Database hosting | MongoDB Atlas |
| Version control | Git, GitHub |

*The technology list describes the project stack and target architecture. Refer to the committed workflow, infrastructure files, and deployment evidence to confirm which components are currently implemented and operational.*

## Application Architecture

The application has two main components: a React frontend and a Node.js/Express backend.

```text
                  User / Web Browser
                         |
                         v
                 React Frontend
                         |
                         v
                  Express REST API
                         |
                         v
                   Mongoose
                         |
                         v
                    MongoDB
```

The frontend is responsible for displaying the application interface and sending API requests. The backend handles requests, performs task operations, communicates with MongoDB, and returns responses to the frontend.

The backend and frontend are developed and packaged separately. This separation allows each component to be tested, built, and deployed independently.

## Project Structure

The main application repository is organized into frontend and backend directories.

```text
Task-Management-application/
|
|-- backend/
|   |-- src/
|   |-- tests/
|   |-- eslint.config.js
|   |-- package.json
|   |-- package-lock.json
|   |-- Dockerfile
|   `-- ...
|
|-- frontend/
|   |-- src/
|   |-- eslint.config.js
|   |-- index.html
|   |-- vite.config.js
|   |-- package.json
|   |-- package-lock.json
|   |-- Dockerfile
|   `-- ...
|
|-- .env.example
|-- .gitignore
|-- package.json
|-- package-lock.json
`-- README.md
```

The exact files may change as the project develops. Deployment workflows, Kubernetes manifests, and Terraform configuration should also be committed to the repository if they are part of the final submission.

## REST API Documentation

The backend provides the following endpoints.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Check application health |
| GET | `/api/tasks` | Retrieve tasks, with status filtering where supported |
| GET | `/api/tasks/:id` | Retrieve an individual task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update task information |
| DELETE | `/api/tasks/:id` | Delete a task |

### Example API Requests

Check the health endpoint:

```bash
curl http://localhost:5000/health
```

Retrieve all tasks:

```bash
curl http://localhost:5000/api/tasks
```

Filter tasks by status:

```bash
curl "http://localhost:5000/api/tasks?status=pending"
```

Create a task:

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Prepare deployment documentation"}'
```

Retrieve a particular task:

```bash
curl http://localhost:5000/api/tasks/TASK_ID
```

Update a task:

```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

Delete a task:

```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID
```

Replace `TASK_ID` with a real task identifier. The examples assume that the API accepts the illustrated fields and status values; use the actual validation rules in the backend when testing.

## Environment Configuration

The application uses environment variables to separate configuration from source code.

The repository includes a `.env.example` file. It documents the main backend settings without containing real database credentials.

Example:

```dotenv
PORT=5000
NODE_ENV=development
APP_VERSION=1.0.0
LOG_LEVEL=info

MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/cloudtask?retryWrites=true&w=majority

MONGODB_SEED_HOSTS=
MONGODB_REPLICA_SET=

CORS_ORIGINS=http://localhost:5173,http://localhost:8080
```

### Configuration Variables

| Variable | Purpose |
|---|---|
| `PORT` | Backend listening port |
| `NODE_ENV` | Application environment |
| `APP_VERSION` | Application version information |
| `LOG_LEVEL` | Controls logging detail |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_SEED_HOSTS` | Optional database connection fallback |
| `MONGODB_REPLICA_SET` | Optional replica-set configuration |
| `CORS_ORIGINS` | Allowed frontend origins |

Use your own MongoDB Atlas connection details. Never commit real passwords, API keys, or cloud credentials to GitHub.

## Run the Application Locally

### Prerequisites

Install the following tools:

- Git
- Node.js 22 or a compatible supported version
- npm
- MongoDB Atlas account and database
- Docker Desktop, if you want to run the containerized version

### 1. Clone the Repository

```bash
git clone https://github.com/UbimasterOfficial/Task-Management-application.git
cd Task-Management-application
```

### 2. Install Dependencies

Install the backend and frontend dependencies from the project root:

```bash
npm run install:all
```

### 3. Configure Environment Variables

Use `.env.example` as the configuration template. Create the environment file at the location expected by the backend configuration, then add your MongoDB Atlas connection string.

Do not replace the example placeholders with real credentials in a file that will be committed.

### 4. Start the Backend

Open a terminal at the project root:

```bash
npm run dev:backend
```

The backend uses port `5000` by default.

### 5. Start the Frontend

Open a second terminal at the project root:

```bash
npm run dev:frontend
```

Vite normally serves the development frontend at `http://localhost:5173`.

### 6. Open the Application

Visit:

```text
http://localhost:5173
```

Make sure MongoDB Atlas is configured correctly and the backend is running before testing task operations.

## Docker and Containerization

Docker packages the application and its dependencies into portable images.

CloudTask uses separate images for the frontend and backend. This separation allows the two components to be built and deployed independently.

```text
                Application Source
                       |
             +---------+---------+
             |                   |
             v                   v
      Backend Dockerfile   Frontend Dockerfile
             |                   |
             v                   v
      Backend Image       Frontend Image
             |                   |
             +---------+---------+
                       |
                       v
                Container Registry
```

### Build the Backend Image

Run from the repository root:

```bash
docker build -t cloudtask-backend:local ./backend
```

### Build the Frontend Image

```bash
docker build -t cloudtask-frontend:local ./frontend
```

### View the Images

```bash
docker images
```

### Important Container Ports

| Component | Port |
|---|---:|
| Backend API | `5000` |
| Frontend development server | `5173` |
| Frontend Nginx container | `8080` |

The frontend's development port and its production container port are different. When using the production Nginx image, use the port configured by the Dockerfile and Nginx configuration.

## Code Quality and Automated Testing

Automated checks help identify errors before code is released.

### ESLint

ESLint checks JavaScript code for common mistakes and consistency issues.

The project contains separate ESLint configuration files for the backend and frontend.

Run both lint checks from the project root:

```bash
npm run lint
```

You can also run the checks individually:

```bash
npm run lint --prefix backend
npm run lint --prefix frontend
```

### Jest and Supertest

Jest runs the automated tests, while Supertest sends HTTP requests to the Express application during API testing.

The backend tests cover API behavior, including health-check and task endpoint behavior.

Run the backend tests:

```bash
npm test
```

Or run them directly from the backend directory:

```bash
cd backend
npm test
```

The purpose of these tests is to catch regressions before changes are packaged and deployed.

## Logging and Health Checks

### Winston — Application Logging

Winston provides application-level logs. These logs help developers understand application activity and investigate errors.

### Morgan — HTTP Request Logging

Morgan records incoming HTTP requests, including useful request details such as the method, URL, status code, and response time, depending on its configured format.

### Standard Output (stdout)

Containerized applications should write logs to stdout or stderr rather than relying only on local log files. Docker and cloud logging systems can collect these streams.

This makes application logs easier to inspect during local development and after deployment.

### The `/health` Endpoint

The backend exposes:

```text
GET /health
```

It provides a health-check endpoint that can be used by monitoring tools and deployment platforms.

Different health checks have different responsibilities:

- **Application health endpoint:** Reports the state exposed by the application.
- **Docker health check:** Can call the endpoint to determine whether a container is healthy, if a Docker health check is configured.
- **ECS container health check:** Can execute a configured command inside a container.
- **ALB target health check:** Sends requests to the configured target path and port to decide whether a target should receive traffic.

These mechanisms are related but are not automatically enabled just because the API endpoint exists. Each must be configured in the relevant Docker, ECS, or load-balancer configuration.

## CI/CD Pipeline

The project uses GitHub Actions to automate development checks and container image validation.

The intended CI workflow is:

```text
Developer Push / Pull Request
              |
              v
     Checkout Repository
              |
              v
      Install Dependencies
              |
              v
         ESLint Checks
              |
              v
        Automated Tests
              |
              v
       Build Docker Images
              |
              v
       Trivy Image Scanning
              |
              v
      CI Validation Result
```

### Pipeline Responsibilities

- **Checkout:** Retrieves the source code.
- **Dependency installation:** Installs packages required by the application.
- **ESLint:** Checks source code quality.
- **Jest and Supertest:** Validate backend behavior.
- **Docker build:** Builds images for the frontend and backend.
- **Trivy:** Scans images for known vulnerabilities.
- **Result:** Reports whether the configured quality and security checks passed.

### Image Versioning

The workflow uses a short Git commit SHA as an image tag.

For example:

```text
cloudtask-backend:9430728
cloudtask-frontend:9430728
```

This helps connect a Docker image to the source-code version that produced it.

The short SHA is a convenient tag, while the full commit SHA remains available in Git history.

## Container Security Scanning

Trivy is used to scan Docker images for known security vulnerabilities.

A container image may include vulnerable operating-system packages or npm dependencies, even if the application's own source code is correct.

The security-scanning workflow is:

```text
Docker Image
     |
     v
Trivy Scan
     |
     v
Vulnerability Report
     |
     v
Review Findings
     |
     v
Update Affected Packages or Base Image
     |
     v
Rebuild and Scan Again
```

The pipeline can be configured to fail when vulnerabilities meet specified severity thresholds.

A failed scan should be investigated rather than automatically ignored. The appropriate fix depends on whether the issue comes from an application dependency, a transitive dependency, or the container's operating-system packages.

A successful Trivy run means that the image passed the configured scan policy; it does not guarantee that the image contains no security risks.

## Kubernetes Deployment

Kubernetes is included as a learning and deployment-validation component of the internship project.

Minikube provides a local Kubernetes cluster for testing containerized workloads without requiring a managed Kubernetes cluster in AWS.

The intended Kubernetes workflow includes:

1. Prepare Kubernetes manifests.
2. Deploy the backend and frontend.
3. Configure environment variables and secrets.
4. Configure Deployments and Services.
5. Configure application health probes.
6. Inspect Pods and application logs.
7. Perform a rolling update.
8. Demonstrate a rollback.
9. Collect deployment and troubleshooting evidence.

Example commands:

```bash
kubectl get pods
kubectl get deployments
kubectl get services
kubectl logs <pod-name>
```

A rollback can be performed with:

```bash
kubectl rollout undo deployment/<deployment-name>
```

Kubernetes is a separate deployment path for demonstrating orchestration skills. It is not the orchestration platform used by Amazon ECS.

## AWS Cloud Architecture

The target AWS deployment uses Amazon ECS with AWS Fargate to run the application containers.

The intended architecture is:

```text
                    Internet Users
                          |
                          v
                Application Load Balancer
                     Public Subnets
                          |
               +----------+----------+
               |                     |
               v                     v
        Frontend ECS Task      Backend ECS Task
           Private Subnets       Private Subnets
                                      |
                                      v
                                MongoDB Atlas
```

### AWS Services

| Service | Purpose |
|---|---|
| Amazon ECR | Stores frontend and backend Docker images |
| Amazon ECS | Manages container deployments |
| AWS Fargate | Runs ECS tasks without managing EC2 servers |
| Application Load Balancer | Routes incoming HTTP/HTTPS traffic |
| Amazon VPC | Provides the application's network boundary |
| Public subnets | Host internet-facing resources such as the ALB |
| Private subnets | Host ECS tasks without direct public IP exposure |
| NAT Gateway | Provides outbound internet connectivity for private-subnet resources when needed |
| AWS IAM | Controls permissions for AWS resources and deployment workflows |
| Amazon CloudWatch | Collects configured logs and metrics |
| MongoDB Atlas | Provides the managed MongoDB database |

### Deployment Flow

The intended release process is:

```text
GitHub Repository
        |
        v
GitHub Actions CI
        |
        v
Build and Scan Images
        |
        v
Push Images to Amazon ECR
        |
        v
Update ECS Task Definition
        |
        v
Deploy ECS Service
        |
        v
Check Application Health
        |
        v
Review Logs and Metrics
```

GitHub Actions can communicate with AWS APIs to push images and request ECS deployments. It does not normally need direct network access to the private ECS subnets.

For deployment authentication, GitHub Actions can use OpenID Connect (OIDC) with a suitably restricted AWS IAM role, avoiding long-lived AWS access keys in repository secrets.

## Infrastructure as Code

Terraform is used to define and manage AWS infrastructure as code.

Instead of creating every resource manually through the AWS Console, infrastructure can be described in `.tf` files, reviewed, and applied in a repeatable way.

The planned infrastructure may include:

- VPC and subnet configuration.
- Internet Gateway and NAT Gateway.
- Route tables and route associations.
- Security groups.
- ECR repositories.
- ECS cluster, task definitions, and services.
- IAM roles and policies.
- Application Load Balancer and target groups.
- CloudWatch log groups.

Typical Terraform commands include:

```bash
terraform fmt
terraform init
terraform validate
terraform plan
terraform apply
```

`terraform plan` previews the changes Terraform intends to make. `terraform apply` applies the approved changes.

Terraform provisions and manages infrastructure, while GitHub Actions automates the application build and release process. The two tools work together but have different responsibilities.

## Monitoring and Troubleshooting

Monitoring helps verify that the application continues to work after deployment.

The project uses the `/health` endpoint as an application health-check interface and includes application and request logging.

For an AWS deployment, CloudWatch can be used to inspect configured container logs and service metrics.

Useful troubleshooting checks include:

- Confirming that the application starts.
- Verifying database connectivity.
- Inspecting backend logs.
- Checking container health.
- Reviewing ECS service events.
- Checking ALB target health.
- Reviewing GitHub Actions job logs.
- Investigating Trivy vulnerability reports.
- Confirming that the deployed image tag matches the intended commit.

Monitoring features depend on the relevant log groups, metrics, health checks, and alerts being configured.

## Security Practices

Security is considered throughout the development and deployment process.

The project uses or targets the following practices:

- Keep secrets out of source control.
- Use environment variables for application configuration.
- Run automated tests before releasing changes.
- Use ESLint to identify common code issues.
- Scan container images with Trivy.
- Apply least-privilege IAM permissions.
- Restrict inbound traffic using security groups.
- Keep application containers in private subnets where appropriate.
- Use HTTPS for public production traffic.
- Review dependency and operating-system package vulnerabilities.
- Use short-lived GitHub OIDC credentials for AWS access when configured.

These practices reduce risk, but they do not replace ongoing security review and maintenance.

## Key Learning Outcomes

This project provides practical experience with:

- Developing a full-stack MERN application.
- Designing and testing REST APIs.
- Configuring environment variables.
- Implementing application and HTTP request logging.
- Writing automated API tests.
- Maintaining frontend and backend code quality.
- Building Docker images.
- Automating CI checks with GitHub Actions.
- Scanning container images for vulnerabilities.
- Understanding image tagging and release traceability.
- Deploying and troubleshooting Kubernetes workloads.
- Demonstrating rolling updates and rollbacks.
- Defining cloud infrastructure with Terraform.
- Understanding AWS networking and private-subnet access.
- Deploying containers using Amazon ECR and ECS.
- Connecting applications to MongoDB Atlas.
- Using health checks, logs, and monitoring for troubleshooting.

## Project Screenshots



## Author

**Madusha Lakshan**  
Junior DevOps & Cloud Engineer

- GitHub: [@UbimasterOfficial](https://github.com/UbimasterOfficial)
- LinkedIn: [Madusha Lakshan](https://www.linkedin.com/in/iam-madusha-lakshan/)

---

*CloudTask is an internship project created to demonstrate full-stack development and practical DevOps and cloud engineering skills. Deployment and infrastructure status should be confirmed against the committed source files and execution evidence.*
