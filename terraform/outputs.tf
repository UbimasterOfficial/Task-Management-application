
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

# Frontend ECS service
output "frontend_ecs_service_name" {
  description = "Name of the frontend ECS service"
  value       = aws_ecs_service.frontend.name
}

# Backend ECS service
output "backend_ecs_service_name" {
  description = "Name of the backend ECS service"
  value       = aws_ecs_service.backend.name
}

output "alb_dns_name" {
  description = "Public DNS name of the application load balancer"
  value       = aws_lb.app_lb.dns_name
}

output "alb_zone_id" {
  description = "Hosted zone ID of the load balancer"
  value       = aws_lb.app_lb.zone_id
}

output "mongodb_secret_arn" {
  description = "ARN of the MongoDB URI secret"
  value       = aws_secretsmanager_secret.mongodb_uri.arn
}