docker container stop `docker container ps | grep dh-vis-* | awk '{print $1}'`
docker container rm `docker container ls -a | grep dh-vis-* | awk '{print $1}'
