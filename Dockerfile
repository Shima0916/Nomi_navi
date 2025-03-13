FROM node:22-alpine

WORKDIR /nextjs

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "start"]
