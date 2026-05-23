# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

# Set to production
ENV NODE_ENV=production

WORKDIR /app

# Add a non-root user for security
RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

# Use the non-root user
USER nodeapp

EXPOSE 5000

CMD ["node", "dist/server.js"]
