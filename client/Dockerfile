FROM node:8.7.0-alpine
RUN mkdir -p /usr/src/app/internado-client
WORKDIR /usr/src/app/internado-client
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]

