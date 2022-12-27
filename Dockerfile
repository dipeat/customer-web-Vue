FROM node:14.17.5
WORKDIR /crispicy_customer
COPY package*.json ./
COPY package-lock*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "serve"]
