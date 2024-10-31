FROM node:18.20.1

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

ENV API_PORT=8000
ENV API_HOST=0.0.0.0
ENV API_MONGODB_URI=mongodb://127.0.0.1:27017/

COPY  ./src ./src

EXPOSE $API_PORT

CMD [ "npm", "start" ]
