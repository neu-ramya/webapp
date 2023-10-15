packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

// variable "aws_access_key" {
//   type    = string
//   default = env("AWS_ACCESS_KEY_ID")
// }

// variable "aws_secret_key" {
//   type    = string
//   default = env("AWS_SECRET_ACCESS_KEY")
// }

source "amazon-ebs" "debian12" {
  ami_name      = "csye6225-debian12"
  instance_type = "t2.micro"
  region        = "us-west-2"
  ami_users = [
    "544530547780"
  ]
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

  provisioner "shell" {
    inline = [
      "./install-dependencies.sh",
      "pwd",
      "ls -al"
    ]
  }

}
