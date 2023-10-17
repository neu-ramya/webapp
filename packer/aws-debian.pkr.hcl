packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "ami_name" {
  type    = string
  default = "csye6225-debian12-{{ timestamp }}"
  // default = env("AMI_NAME")
}

variable "ec2_instance_types" {
  type    = string
  default = "t2.micro"
  // default = env("EC2_INSTANCE_TYPES")
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
  // default = env("AWS_REGION")
}

variable "aws_access_key" {
  sensitive = true
  type    = string
  default = env("AWS_ACCESS_KEY_ID")
}

variable "aws_secret_key" {
  sensitive = true
  type    = string
  default = env("AWS_SECRET_ACCESS_KEY")
}

variable "shared_users" {
  type    = list(string)
  default = [
    "544530547780"
  ]
}

source "amazon-ebs" "debian12" {
  ami_name      = var.ami_name
  instance_type = var.ec2_instance_types
  region        = var.aws_region
  access_key    = var.aws_access_key
  secret_key    = var.aws_secret_key
  ami_users     = var.shared_users
  source_ami_filter {
    filters = {
      name                = "debian-12-*"
      virtualization-type = "hvm"
      root-device-type    = "ebs"
      architecture        = "x86_64"
    }
    most_recent = true
    owners      = ["136693071363"]
  }
  ssh_username = "admin"
}

build {
  name = "build-packer"
  sources = [
    "source.amazon-ebs.debian12"
  ]

  provisioner "file" {
    source      = "${path.root}/install-dependencies.sh"
    destination = "/home/admin/install-dependencies.sh"
  }

  provisioner "file" {
    source      = "${path.root}/target"
    destination = "/home/admin/target"
  }

  provisioner "shell" {
    inline = [
      "./install-dependencies.sh",
    ]
  }

}
