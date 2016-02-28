variable "aws_access_key" {}
variable "aws_secret_key" {}

variable "env" {
	description = "Environment name (production,staging,development)"
	default = "production"
}

variable "iam_role_arn" {
	description = "The ECS IAM role ARN from ecs.tfstate in"
}

variable "ecs_cluster_id" {
	description = "Previously constructed ECS cluster ID from ecs.tfstate"
}
