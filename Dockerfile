FROM node:10

EXPOSE 8081

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENTRYPOINT [ "npm", "start" ]