provider "aws" {
  access_key = "AKIAQUVTYO3QLG7ZG2U5"
  secret_key = "F1ME3LAGRJjrFtnKvvjk90adBiQuwkxN+WD+Nn0U+"
  region     = "eu-west-2"

}

resource "aws_instance" "app_server" {
  ami                    = "ami-0fb391cce7a602d1f"
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.clo.id]
  user_data              = file("init.sh")
}



resource "aws_security_group" "clod" {
   name = "WS SG"
   description = "workid"

  ingress {
    from_port   = 8081
    protocol    = "tcp"
    to_port     = 8081
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    protocol    = "tcp"
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

   ingress {
    from_port   = 3000
    protocol    = "tcp"
    to_port     = 3000
    cidr_blocks = ["0.0.0.0/0"]

  }
    ingress {
    from_port   = 443
    protocol    = "tcp"
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]

  }

  egress {
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}