# build environment
FROM node:16-alpine3.14

#Creating Directory and move the workdir
RUN mkdir -p /home/app
WORKDIR /home/app

ENV PATH /home/app/node_modules/.bin:$PATH

COPY . ./
# install app dependencie
RUN npm install 

# start server
CMD npm start
