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

#Create private subnet 02
resource "aws_subnet" "private-01" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = var.availability_zones[0]

  tags = {
    Name = "private subnet 01"
  }
}

#Create internet gateway
resource "aws_internet_gateway" "main_gw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main_internet_gateway"
  }
}

#Create NAT gateway
resource "aws_nat_gateway" "main_ngw" {
  subnet_id     = aws_subnet.private-01.id

  tags = {
    Name = "main_nat_gateway"
  }
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

# Associate public subnet with route table
resource "aws_route_table_association" "public_subnet_association" {
  subnet_id      = aws_subnet.public-01.id
  route_table_id = aws_route_table.public_route.id
}

# Associate private subnet with route table
resource "aws_route_table_association" "private_subnet_association" {
  subnet_id      = aws_subnet.private-01.id
  route_table_id = aws_route_table.private_route.id
}

