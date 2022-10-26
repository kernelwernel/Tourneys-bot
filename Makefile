SRC=./src/index.ts
USR=nonce1
CONTAINER=tourneys-bot
IMG=tourneys_img

.PHONY: all run nodemon reconfig docker docrun heroku herokurestart herokupush herokukill dockerkill

all: run

run:
	@ts-node $(SRC)

nodemon:
	@nodemon $(SRC)

tsconfig:
	@rm -rf tsconfig.json && tsc -init

docker:
	@docker build --tag $(IMG) .
	@docker image tag $(IMG) $(USR)/$(CONTAINER)
	@docker push $(USR)/$(CONTAINER)

dockerrun:
	@docker run -it $(CONTAINER)

heroku:
	@heroku ps:scale worker=1

herokurestart:
	@heroku restart

gh:
	@git pull
	@git add --all
	@git commit -m "automated commit"
	@git push

herokupush:
	@heroku container:login
	@heroku container:push worker
	@heroku container:release worker
	@docker tag $(IMG) registry.heroku.com/$(CONTAINER)/worker
	@docker push registry.heroku.com/$(CONTAINER)/worker

herokukill:
	@heroku ps:scale worker=0
	@heroku ps:scale worker=1

dockerkill:
	@docker system prune -f
	@docker image prune -a
	@docker stop $(docker ps -a -q)
	@docker rm $(docker ps -a -q)