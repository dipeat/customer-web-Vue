# crispicy_front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Docker-Compose code for Crispicy

version: '3.6'

services:

  redis:
    image: redis:alpine
    container_name: redis
    restart: always
    ports:
      - 6379:6379
    

  backend:
    restart: always
    build: ./crispicy_django/backend/backend_api
    image: crispicy_backend_image
    container_name: crispicy_backend
    volumes:
      - ./crispicy_django/backend/backend_api:/crispicy_backend
    ports:
      - 8000:8000
    links:
      - redis
    depends_on:
      - redis

  frontend:
    restart: always
    build: ./crispicy_vue/crispicy_front
    image: crispicy_customer_image
    container_name: crispicy_customer
    volumes:
      - ./crispicy_vue/crispicy_front:/crispicy_customer
    ports:
      - 8080:8080
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "8010:80"
    depends_on:
      - backend
      - frontend