FROM node:10.0.0
RUN mkdir -p /usr/src/app/internado-server
WORKDIR /usr/src/app/internado-server

COPY . . 

RUN rm -Rf node_modules

RUN npm install && npm install bcrypt


RUN npm run prepare

EXPOSE 5050

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.4.0/wait /wait
RUN chmod +x /wait

CMD /wait && npm start