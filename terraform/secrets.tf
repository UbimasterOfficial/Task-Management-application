
resource "aws_secretsmanager_secret" "mongodb_uri" {
  name        = "${var.project_name}/mongodb-uri"
  description = "MongoDB Atlas connection string for CloudTask backend"

  tags = {
    Name = "${var.project_name}-mongodb-uri"
  }
}

output "mongodb_secret_arn" {
  description = "ARN of the MongoDB URI secret"
  value       = aws_secretsmanager_secret.mongodb_uri.arn
}
