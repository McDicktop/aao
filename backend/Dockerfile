FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

COPY . .

RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 8080

CMD [ "node", "server.js" ]