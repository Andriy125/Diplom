provider "aws" {
  access_key = "AKIAQUVTYO3QK7GZA7H7"
  secret_key = "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"
  region     = "eu-west-2"

}

resource "aws_instance" "app_server" {
  ami                    = "ami-078a289ddf4b09ae0"
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.clo.id]
  user_data              = file("init.sh")
}



resource "aws_security_group" "clo" {
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