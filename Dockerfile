FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

ENV MONGODB_USERNAME=username
ENV MONGODB_PASSWORD=password
ENV MONGODB_HOST=mongodb
ENV MONGODB_DATABASE=marketplace

CMD ["npm", "start"]