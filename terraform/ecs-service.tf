resource "aws_ecs_service" "movie_api" {
	name = "${concat("movie_api-",var.env)}"
	cluster = "${var.ecs_cluster_id}"
	task_definition = "${aws_ecs_task_definition.movie_api.arn}"
	desired_count = 2
	iam_role = "${var.iam_role_arn}"

	load_balancer {
		elb_name = "${aws_elb.movie_api_elb.id}"
		container_name = "movie-api"
		container_port = 3000
	}
}
