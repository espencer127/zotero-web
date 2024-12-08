FROM node:lts-alpine

WORKDIR /home/em/code/zotero-web/server
COPY . .
RUN npm install

COPY . .
EXPOSE 3000

CMD ["node", "index.js"]