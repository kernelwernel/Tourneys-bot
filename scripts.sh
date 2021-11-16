#!/bin/bash
container=tourneys-bot-docker

if [ $# == 0 ] ; then
    echo $USAGE
    exit 1;
fi

while getopts ":i:vh" optname
  do
    case "$optname" in
      "run")
        sudo docker-compose up
        exit 0;
        ;;
      "build")
        sudo docker-compose build
        ;;
      "kill")
        docker stop $container
        exit 0;
        ;;
      "restart")
        if [ "$containerRunning" == "true" ]; then
          docker stop $containerName
          docker start $containerName
        else
          ./scripts.sh run 
        fi
        exit 0;
        ;;
      "?")
        echo "Unknown option $OPTARG"
        exit 0;
        ;;
      ":")
        echo "No argument value for option $OPTARG"
        exit 0;
        ;;
      *)
        echo "Unknown error while processing options"
        exit 0;
        ;;
    esac
  done

shift $(($OPTIND - 1))

param1=$1
param2=$2

# --- Locks -------------------------------------------------------
LOCK_FILE=/tmp/$SUBJECT.lock
if [ -f "$LOCK_FILE" ]; then
   echo "Script is already running"
   exit
fi