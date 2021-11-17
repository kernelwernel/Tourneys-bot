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

tag:
	docker image tag $(IMG) $(USR)/$(CONTAINER)

docrun:
	docker run -it -p 4000:4000 $(CONTAINER)

push:
	docker push $(USR)/$(CONTAINER)

docker:
	make build
	make tag
	make push