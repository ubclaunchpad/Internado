FROM node:8.0.0
RUN mkdir -p /usr/src/app/internado-client
WORKDIR /usr/src/app/internado-client
COPY package.json ./usr/src/app/internado-client/package.json
RUN npm install --silent
COPY . /usr/src/app/internado-client
RUN npm rebuild node-sass
RUN npm run build
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
