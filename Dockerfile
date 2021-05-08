# Production Build
# Stage 1: Build react client
FROM node:14-alpine as client
# Working directory be app
WORKDIR /usr/app/client/
COPY client/package*.json ./
# Install dependencies
RUN npm install
# copy local files to app folder
COPY client/ ./
RUN npm run build
# Stage 2 : Build Server
FROM node:14-alpine
WORKDIR /usr/src/app/
COPY --from=client /usr/app/client/build/ ./client/build/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
USER node
CMD ["npm", "start"]