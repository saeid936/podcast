# syntax=docker/dockerfile:1

# --- Stage 1: Base ---
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache curl unzip bash

# --- Stage 2: Dependencies ---
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
# Use npm ci for clean and predictable installs
RUN npm ci

# --- Stage 3: Development ---
FROM deps AS development
COPY . .
# Generate prisma client
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]

# --- Stage 4: Builder ---
FROM deps AS builder
COPY . .
# The build script includes: prisma generate && vite build
RUN npm run build

# --- Stage 5: Production ---
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy only the necessary production artifacts
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Install only production dependencies
RUN npm ci --omit=dev

# TSX is in dependencies so we can run src/server/main.ts
EXPOSE 3000

# Start the server using tsx as defined in package.json start script
CMD ["npm", "start"]
