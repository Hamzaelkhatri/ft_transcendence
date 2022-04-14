FROM alpine:latest
RUN apk update && apk upgrade 
RUN apk add --no-cache curl
RUN apk add --no-cache git
RUN apk add --no-cache nodejs
RUN apk add --no-cache npm
COPY . /frontend
WORKDIR /frontend
RUN npm install 
EXPOSE 3000
CMD export IP_LOCAL="192.168.63.100"
ENTRYPOINT npm run dev