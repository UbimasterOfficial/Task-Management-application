
resource "aws_secretsmanager_secret" "mongodb_uri" {
  name        = "${var.project_name}/mongodb-uri"
  description = "MongoDB Atlas connection string for CloudTask backend"

  tags = {
    Name = "${var.project_name}-mongodb-uri"
  }
}


