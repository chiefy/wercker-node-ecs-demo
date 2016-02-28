# Create a new load balancer
resource "aws_elb" "movie_api_elb" {
	name = "${concat("movie-api-",var.env)}"

	availability_zones = ["us-east-1a", "us-east-1c", "us-east-1d"]

	listener {
		instance_port = 3000
		instance_protocol = "http"
		lb_port = 80
		lb_protocol = "http"
	}

	health_check {
		healthy_threshold = 3
		unhealthy_threshold = 3
		timeout = 3
		target = "HTTP:3000/"
		interval = 30
	}

	cross_zone_load_balancing = true
	idle_timeout = 400
	connection_draining = true
	connection_draining_timeout = 400

	tags {
		Name = "${concat("Movie API - ",var.env)}"
		Env = "${var.env}"
	}
}
