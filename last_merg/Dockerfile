FROM alpine:latest
RUN apk --update --no-cache upgrade
RUN apk add  nodejs
RUN apk add curl 
RUN apk add git
RUN apk add npm
WORKDIR /app/webapp/front-end
COPY ./front-end/  .
RUN npm install 
RUN npm run build 
RUN npm run  dev
WORKDIR /app/webapp/server
COPY ./server/ .
RUN npm install
EXPOSE 3001
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

