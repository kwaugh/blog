# A really out-of-date blog application that I wrote in high school.

## To run with docker
> docker-compose up

The above will build a container for the blog web app as well as a container for
a mongo instance. To restore a backup of the mongo database:

> docker cp $PATH_TO_BACKUP blog_mongo_1:/root
> docker exec -it $MONGO_CONTAINER_ID bash
> tar -xzvf $BACKUP_NAME
> mongorestore $BACKUP_NAME
