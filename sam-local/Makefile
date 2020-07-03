SAM-local-image-name = sam-local-docker

build:
	# todo find some efficient way to lock down the version of the sam cli in docker container
	$(MAKE) build-latest

build-latest:
	# build the most recent version of aws-cli
	docker build -f Dockerfile-latest -t $(SAM-local-image-name) .
