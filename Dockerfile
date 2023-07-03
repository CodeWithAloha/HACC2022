FROM node:19.9.0-alpine3.16
WORKDIR /app
COPY package.json .
ARG DB_STRING
RUN npm install
COPY . .
EXPOSE 2121
ENV PORT 2121
RUN chown -R node /app
CMD ["npm", "run", "start"]


# FROM node:12-slim

# WORKDIR /starter
# ENV NODE_ENV development

# COPY package.json /starter/package.json

# RUN npm install pm2 -g
# RUN npm install --production

# COPY .env.example /starter/.env.example
# COPY . /starter

# CMD ["pm2-runtime","app.js"]

# EXPOSE 8080
