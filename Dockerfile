FROM node:16.17.0

WORKDIR /home/app

COPY src /home/app/src
COPY ./*.json /home/app/
COPY ./.env /home/app/

COPY ./.sequelizerc /home/app/.sequelizerc

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

RUN npm install

EXPOSE 3000

CMD ["npm", "rin", "start"]
