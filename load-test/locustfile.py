from locust import HttpLocust, TaskSet, between, task

class UserBehavior(TaskSet):
    @task
    def putBook(l):
        l.client.get("/book", name="putBook")

    @task
    def getBook(l):
        l.client.get("/book/42", name="getBook")