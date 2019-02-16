FROM node:8.0.0
RUN mkdir -p /usr/src/app/internado-auth
WORKDIR /usr/src/app/internado-auth

COPY . .

RUN npm install
RUN npm run build

EXPOSE 5050

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.4.0/wait /wait
RUN chmod +x /wait

CMD /wait && npm start
