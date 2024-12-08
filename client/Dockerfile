# Use a multi-stage build to create a smaller production image
FROM node:lts-alpine

WORKDIR /home/em/code/zotero-web/client
COPY . .
RUN npm install

RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]