FROM node:14.4.0-alpine3.10
WORKDIR /gypz_dom
COPY package.json yarn.lock ./
ENV REACT_APP_HOST_IP_ADDRESS=http://localhost:8000
RUN yarn install
COPY . .
CMD ["yarn", "start"]