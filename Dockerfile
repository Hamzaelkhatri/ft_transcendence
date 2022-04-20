FROM alpine:latest
RUN apk --update --no-cache upgrade
RUN apk add  nodejs
RUN apk add curl 
RUN apk add git
RUN apk add npm
WORKDIR /app/webapp/front-end
COPY ./front-end/  .
WORKDIR /app/webapp/server
COPY ./server/ .
COPY .env .
RUN npm install
EXPOSE 3001
EXPOSE 3000
CMD ["npm", "run", "deploy"]

