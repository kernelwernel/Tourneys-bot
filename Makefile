# ik makefiles shouldn't be used for typescript projects and it's not designed for something like this, but shut up

SRC=./src/index.ts
USR=nonce1
CONTAINER=tourneys-bot
IMG=tourneys_img

all: run

run:
	ts-node $(SRC)

nodemon:
	nodemon $(SRC)

reconfig:
	rm -rf tsconfig.json && tsc -init

build:
	docker build --tag $(IMG) .
	docker image tag $(IMG) $(USR)/$(CONTAINER)

docrun:
	docker run -it $(CONTAINER)

push:
	docker push $(USR)/$(CONTAINER)

heroku:
	heroku container:login
	heroku container:push worker
	heroku container:release worker
	docker tag $(IMG) registry.heroku.com/$(CONTAINER)/worker
	docker push registry.heroku.com/$(CONTAINER)/worker


docker:
	make build
	make push


	