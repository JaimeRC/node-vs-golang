FROM node:10-alpine

# Create app directory
RUN mkdir -p /src
WORKDIR /src

# Install app dependencies
COPY . .
RUN npm install

RUN npm run compile

CMD [ "npm", "run", "start" ]
