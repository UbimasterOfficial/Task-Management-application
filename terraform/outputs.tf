
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

output "alb_dns_name" {
  description = "Public DNS name of the application load balancer"
  value       = aws_lb.app_lb.dns_name
}

output "alb_zone_id" {
  description = "Hosted zone ID of the load balancer"
  value       = aws_lb.app_lb.zone_id
}