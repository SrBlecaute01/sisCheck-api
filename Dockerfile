FROM node:18-alpine
WORKDIR /app

ENV PORT=3056
ENV NODE_ENV=production

ENV DB_HOST=""
ENV DB_PORT=""
ENV DB_NAME=""
ENV DB_USER=""
ENV DB_PASSWORD=""
ENV JWT_SECRET=""
ENV ADMIN_EMAIL=""
ENV ADMIN_PASSWORD=""

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3056

CMD ["node", "src/server.js"]