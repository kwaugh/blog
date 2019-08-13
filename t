[1mdiff --git a/README.md b/README.md[m
[1mindex 825db4c..e4b4696 100644[m
[1m--- a/README.md[m
[1m+++ b/README.md[m
[36m@@ -1,12 +1,10 @@[m
 # A really out-of-date blog application that I wrote in high school.[m
 [m
 ## To run with docker[m
[31m-> docker-compose up[m
[32m+[m[32m> docker-compose up -d[m
[32m+[m[32mor[m
[32m+[m[32m> docker-compose up --build -d[m
 [m
 The above will build a container for the blog web app as well as a container for[m
[31m-a mongo instance. To restore a backup of the mongo database:[m
[31m-[m
[31m-> docker cp $PATH_TO_BACKUP blog_mongo_1:/root[m
[31m-> docker exec -it $MONGO_CONTAINER_ID bash[m
[31m-> tar -xzvf $BACKUP_NAME[m
[31m-> mongorestore $BACKUP_NAME[m
[32m+[m[32ma mongo instance. To restore a backup of the mongo database, make sure that a[m
[32m+[m[32mfile named backup.tgz is in the db directory when building the image.[m
[1mdiff --git a/docker-compose.yml b/docker-compose.yml[m
[1mindex 383748c..f176b99 100644[m
[1m--- a/docker-compose.yml[m
[1m+++ b/docker-compose.yml[m
[36m@@ -5,5 +5,4 @@[m [mservices:[m
     ports:[m
       - "6000:80"[m
   db:[m
[31m-    # image: webhippie/mongodb:latest[m
     build: ./db[m
