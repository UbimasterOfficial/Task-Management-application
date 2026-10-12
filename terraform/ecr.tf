
# Frontend Docker image repository
resource "aws_ecr_repository" "frontend" {
  name                 = "cloudtask-frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "${var.project_name}-frontend-ecr"
  }
}


# Backend Docker image repository
resource "aws_ecr_repository" "backend" {
  name                 = "cloudtask-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "${var.project_name}-backend-ecr"
  }
}


