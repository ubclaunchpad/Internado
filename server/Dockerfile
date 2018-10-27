FROM node:8.7.0-alpine
RUN mkdir -p /usr/src/app/internado-server
WORKDIR /usr/src/app/internado-server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 1337
CMD [ "npm", "start" ]
