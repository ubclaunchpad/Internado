FROM node:8.0.0
RUN mkdir -p /usr/src/app/internado-server
WORKDIR /usr/src/app/internado-server
COPY package*.json ./
RUN npm install && npm install bcrypt
COPY . .
EXPOSE 1337
CMD [ "npm", "start" ]
