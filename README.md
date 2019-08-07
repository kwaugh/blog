# A really out-of-date blog application that I wrote in high school.

## To run with docker
Build the image
> docker build -t kwaugh/blog .

Run the image
> docker run -p PORT:80 --network NETWORK_NAME --name APP_NAME kwaugh/blog

Note that this container expects another container with mongodb to be running on
the same machine on the same docker network. For example:
> docker run --network NETWORK_NAME --name mongodb webhippie/mongodb:latest

After running this application for the first time with name APP_NAME, in the
future it can be started by just running
> docker start APP_NAME
