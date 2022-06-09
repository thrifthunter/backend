# build environment
FROM node:16-alpine3.14

#Creating Directory and move the workdir
RUN mkdir -p /home/app
WORKDIR /home/app

ARG dbPass
ENV DB_PASS=$dbPass

ARG dbHost
ENV DB_HOST=$dbHost

ARG privKey
ENV PRIV_KEY=$privKey

ARG privKeyId
ENV PRIV_KEY_ID=$privKeyId
ENV PATH /home/app/node_modules/.bin:$PATH
COPY . ./



RUN sed -i "s|DB_PASSWORD=|DB_PASSWORD=$DB_PASS|g" /home/app/.env
RUN sed -i "s|DB_HOST=|DB_HOST=$DB_HOST|g" /home/app/connection.js
RUN sed -i "s|}|\tPRIV_KEY,\n\tPRIV_KEY_ID\n}|g" firestorecred.json
RUN npm install 

# start server
CMD npm start
