docker image prune -f
docker network prune -f
docker volume prune -f
if [ $(docker ps -f status=created -f status=removing -f status=exited -f status=dead -q | wc -l) -gt 0 ] 
then docker rm -f $(docker ps -f status=created -f status=removing -f status=exited -f status=dead -q)
fi