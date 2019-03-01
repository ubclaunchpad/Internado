FROM node:10.0.0
RUN mkdir -p /usr/src/app/internado-server
WORKDIR /usr/src/app/internado-server

COPY package*.json ./

RUN npm install 
RUN npm install -g typescript@3.1.3

COPY . .

RUN npm run build

EXPOSE 5000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.4.0/wait /wait
RUN chmod +x /wait

CMD /wait && npm start
