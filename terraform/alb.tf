
#secutiry group for load balancer
resource "aws_security_group" "lb_sg" {
  name        = "${var.project_name}-lb-sg"
  description = "Allow HTTP and HTTPS inbound traffic"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-lb-sg"
  }

    ingress {
        description = "Allow HTTP inbound traffic"
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        description = "Allow HTTPS inbound traffic"
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        description = "Allow all outbound traffic"
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

}

#Create Application Load Balancer
resource "aws_lb" "app_lb" {
  name               = "${var.project_name}-lb-tf"
  internal           = false
  load_balancer_type = "application"

  security_groups    = [aws_security_group.lb_sg.id]

  subnets            = [
    aws_subnet.public-01.id,
    aws_subnet.public-02.id
    ]

  tags = {
    Environment = "production"
  }
}
