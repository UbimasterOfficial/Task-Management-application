
# ECR - Frontend
output "frontend_ecr_repository_url" {
  description = "ECR URL for the frontend image"
  value       = aws_ecr_repository.frontend.repository_url
}

# ECR - Backend
output "backend_ecr_repository_url" {
  description = "ECR URL for the backend image"
  value       = aws_ecr_repository.backend.repository_url
}
