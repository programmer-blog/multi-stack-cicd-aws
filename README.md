# Multi-Stack Microservices Deployment (May 2026)

This project demonstrates a fully automated CI/CD pipeline for a multi-language microservice architecture (Node.js, Python, PHP, and Java) deployed on a single AWS EC2 instance using Docker and GitHub Actions.

## 🚀 Architecture Overview

The system consists of four independent services running in Docker containers, each accessible via a specific port on a single AWS EC2 Linux host.

| Service | Language/Framework | Internal Port | External Port | Deployment Strategy |
| --- | --- | --- | --- | --- |
| **Node-App** | Node.js / Express | 3000 | 80 | GitHub Actions + SSH |
| **Python-App** | Python / Flask | 5000 | 8081 | GitHub Actions + SSH |
| **PHP-App** | PHP / Apache | 80 | 8082 | GitHub Actions + SSH |
| **Java-App** | Java / Spring Boot | 8080 | 8083 | GitHub Actions + SSH |

---

## 🛠️ Tech Stack

* **Cloud Provider:** AWS (EC2 t3.micro)
* **Containerization:** Docker & Docker Hub
* **CI/CD:** GitHub Actions
* **OS:** Amazon Linux 2023
* **Security:** AWS Security Groups (Port mapping 80, 8081-8083)

---

## 🏗️ CI/CD Pipeline Logic

Each service has a dedicated workflow file in `.github/workflows/`. The logic follows a standard "Build-Push-Deploy" pattern:

1. **Build Stage:**
* Triggers only when code in the specific app folder changes.
* Authenticates with Docker Hub using repository secrets.
* Builds the Docker image and tags it as `latest`.
* Pushes the image to the remote registry.


2. **Deploy Stage (SSH-based):**
* Connects to EC2 via SSH using a Private Key (`.pem`).
* Pulls the new image from Docker Hub.
* Stops and removes the existing container of that specific service.
* Launches a new container with specified port mapping and memory limits.
* **Java Special Handling:** Automatically stops lighter services to ensure the Java Spring Boot app has enough RAM (512MB limit) to run on the Free Tier.



---

## 🔑 Required Secrets

To replicate this deployment, the following GitHub Secrets must be configured:

* `DOCKERHUB_USERNAME`: Docker Hub ID.
* `DOCKERHUB_TOKEN`: Personal Access Token for Docker.
* `EC2_HOST`: Public IP of the AWS Instance.
* `EC2_SSH_KEY`: Full content of the `.pem` key file.

---

## 📉 Lessons Learned

* **Port Management:** How to map multiple internal container ports to unique external host ports.
* **Resource Constraints:** Managing the "Out of Memory" (OOM) killer on small 1GB RAM instances by limiting container memory (`-m 512m`).
* **Idempotent Scripts:** Using `|| true` in shell scripts to prevent the pipeline from failing when a container doesn't yet exist.
* **Security:** Configuring AWS Inbound Rules to expose only specific application ports to the public internet.
