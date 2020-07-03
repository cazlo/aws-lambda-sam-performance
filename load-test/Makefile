users = 10
userHatchRate = 1

load-local:
	docker run -p 8089:8089 --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u 2 -r 2 \
		--host http://127.0.0.1:3000/

load-micronaut-2:
	docker run -p 8089:8089 --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://yvxxfw2nf2.execute-api.us-west-2.amazonaws.com/Prod

load-micronaut-1-3-6:
	docker run -p 8089:8089 --network host -v $(CURDIR):/mnt/locust locustio/locust:1.0.2 -f /mnt/locust/locustfile.py \
		--headless -u $(users) -r $(userHatchRate) \
		--host https://6ug86qoohk.execute-api.us-west-2.amazonaws.com/Prod