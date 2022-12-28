docker network prune -f
docker volume prune -f
if [ "$(ls -A mysql-example/mysql)" ]
then rm -r mysql-example/mysql/*
fi
if [ $(docker ps -a -q | wc -l) -gt 0 ]
then docker rm -f $(docker ps -a -q)
fi
if [ $(docker image ls -q | wc -l) -gt 0 ]
then docker rmi -f $(docker image ls -q)
fi