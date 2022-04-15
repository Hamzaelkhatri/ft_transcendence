FROM node:16.13.0
WORKDIR /app/webapp
COPY ./front-end/  ./front-end
COPY ./server/ ./server
WORKDIR /app/webapp/front-end
RUN npm install && npm build && npm start
WORKDIR /app/webapp/server
RUN npm install
EXPOSE 3001
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

