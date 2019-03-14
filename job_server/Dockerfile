FROM node:9.0.0
RUN mkdir -p /usr/src/app/internado_job_server
WORKDIR /usr/src/app/internado_job_server

COPY . . 

RUN rm -Rf node_modules

RUN npm install


RUN npm run prepare

EXPOSE 5000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.4.0/wait /wait
RUN chmod +x /wait

CMD /wait && npm start