FROM node:18
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm purne --production
CMD ["node", "./dist/main.js"]
