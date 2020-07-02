appName = quarkus-api-gw-proxy

build-function-zip:
	docker build -t $(appName) . && \
	mkdir -p target && \
	docker run --rm --entrypoint cat $(appName) /usr/src/app/target/function.zip > target/function.zip
	#./mvnw clean package -Pnative -Dnative-image.docker-build=true

deploy:
	echo 'TODO deploy steps go here' && \
	touch packaged.yaml