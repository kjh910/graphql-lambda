FROM --platform=linux/amd64 node:18.3
WORKDIR /app
COPY . /app/

RUN chmod 777 /app/runserver.sh

ENTRYPOINT ["/app/runserver.sh"]