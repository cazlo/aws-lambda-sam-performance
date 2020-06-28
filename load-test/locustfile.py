from locust import HttpUser, task, between

class UserBehavior(HttpUser):
    wait_time = between(0, 1)

    @task
    def putBook(self):
        self.client.put(url="/book", data='{"name":"test"}', name="putBook", headers={"Content-Type": "Application/JSON"})

    @task
    def getBook(self):
        self.client.get("/book/42", name="getBook")