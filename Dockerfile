# stage -1
FROM regdb.synisys.com/base/node:10 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# stage -2
FROM nginx:alpine
COPY --from=builder /app/dist/dreams-dashboard /usr/share/nginx/html
