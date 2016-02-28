resource "aws_ecs_task_definition" "movie_api" {
  family = "${concat("movie-api-",var.env)}"
  container_definitions = "${file("movie-api-task.json")}"
}
