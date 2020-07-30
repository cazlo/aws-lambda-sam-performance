all:
	$(MAKE) setup test build

setup:
	yarn install --frozen-lockfile

test:
	yarn lint

build:
	yarn build

deploy:
	yarn deploy