variable "aws_region" {
  description = "The AWS region to create resources in."
  type        = string
  default     = "us-east-1"

}


variable "environment" {
  description = "The environment for the resources."
  type        = list(string)
  default = [
    "test",
    "development",
  "production"]

}

variable "availability_zones" {
  description = "List of availability zones to use for the subnets."
  type        = list(string)
  default = [
    "us-east-1a",
    "us-east-1b",
  "us-east-1c"]

}
