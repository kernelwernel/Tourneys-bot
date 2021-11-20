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

docker:
	docker build --tag $(IMG) .
	docker image tag $(IMG) $(USR)/$(CONTAINER)
	docker push $(USR)/$(CONTAINER)

docrun:
	docker run -it $(CONTAINER)

heroku:
	heroku ps:scale worker=1

herokurestart:
	heroku restart

herokupush:
	heroku container:login
	heroku container:push worker
	heroku container:release worker
	docker tag $(IMG) registry.heroku.com/$(CONTAINER)/worker
	docker push registry.heroku.com/$(CONTAINER)/worker

herokukill:
	heroku ps:scale worker=0

dockerkill:
	docker system prune -f
	docker image prune -a
	docker stop $(docker ps -a -q)
	docker rm $(docker ps -a -q)