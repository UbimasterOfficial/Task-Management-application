#Create main VPC
resource "aws_vpc" "main" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name = "main"
  }
}

#Create public subnet 01
resource "aws_subnet" "public-01" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = var.availability_zones[0]
  map_public_ip_on_launch = true

  tags = {
    Name = "public subnet 01"
  }
}

#create public subnet 02
resource "aws_subnet" "public-02" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = var.availability_zones[1]
  map_public_ip_on_launch = true

  tags = {
    Name = "public subnet 02"
  }
}

#Create private subnet 01
resource "aws_subnet" "private-01" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = var.availability_zones[0]

  tags = {
    Name = "private subnet 01"
  }
}

#Create private subnet 02
resource "aws_subnet" "private-02" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = var.availability_zones[1]

  tags = {
    Name = "private subnet 02"
  }
}


#Create internet gateway
resource "aws_internet_gateway" "main_gw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main_internet_gateway"
  }
}

#Create NAT gateway Ip address
resource "aws_eip" "nat_eip" {
  domain = "vpc"

  tags = {
    Name = "main_nat_eip"
  }
}

#Create NAT gateway
resource "aws_nat_gateway" "main_ngw" {
  subnet_id     = aws_subnet.public-01.id
  allocation_id = aws_eip.nat_eip.id

  tags = {
    Name = "main_nat_gateway"
  }

  depends_on = [aws_internet_gateway.main_gw]  #Create the Internet Gateway before creating the NAT Gateway
}

# Create ideal route table for public subnet
resource "aws_route_table" "public_route" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "public_route"
  }
}

# Give internet access for public_route
resource "aws_route" "internet_access" {
  route_table_id         = aws_route_table.public_route.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main_gw.id
}

# Create ideal route table for private subnet
resource "aws_route_table" "private_route" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "private_route"
  }
}

# Give internet access for private_route through NAT gateway
resource "aws_route" "private_internet_access" {
  route_table_id         = aws_route_table.private_route.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.main_ngw.id
}

# Associate public subnet with route table
resource "aws_route_table_association" "public_subnet_association" {
    for_each = {
    public_01 = aws_subnet.public-01.id
    public_02 = aws_subnet.public-02.id
  }

  subnet_id      = each.value
  route_table_id = aws_route_table.public_route.id
}

# Associate private subnet with route table
resource "aws_route_table_association" "private_subnet_association" {
  for_each = {
    private_01 = aws_subnet.private-01.id
    private_02 = aws_subnet.private-02.id
  }
  subnet_id      = each.value
  route_table_id = aws_route_table.private_route.id
}


#Create SG for Frontend ECS
resource "aws_security_group" "frontend_sg" {
  name        = "${var.project_name}-frontend-sg"
  description = "Allow HTTP and HTTPS inbound traffic from ALB"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-frontend-sg"
  }

    ingress {
        description = "Allow inbound traffic from ALB"
        from_port   = 5173
        to_port     = 5173
        protocol    = "tcp"
        cidr_blocks = [aws_security_group.lb_sg.id]
    }

    egress {
        description = "Allow all outbound traffic"
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

}

#Create SG for Backend ECS
resource "aws_security_group" "backend_sg" {
  name        = "${var.project_name}-backend-sg"
  description = "Allow HTTP and HTTPS inbound traffic from ALB"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-backend-sg"
  }

    ingress {
        description = "Allow inbound traffic from ALB"
        from_port   = 5000
        to_port     = 5000
        protocol    = "tcp"
        cidr_blocks = [aws_security_group.lb_sg.id]
    }

    egress {
        description = "Allow all outbound traffic"
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

}