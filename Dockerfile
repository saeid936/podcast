# syntax=docker/dockerfile:1

# --- Stage 1: Base ---
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache curl unzip bash

# Install Bun (required for the server build step in package.json)
RUN curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin/bun

# --- Stage 2: Dependencies ---
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
# Use npm ci for clean and predictable installs
RUN npm ci

# --- Stage 3: Development ---
FROM deps AS development
COPY . .
EXPOSE 3000
# In dev mode, we usually want tsx to run our main.ts
CMD ["npm", "run", "dev"]

# --- Stage 4: Builder ---
FROM deps AS builder
COPY . .
# The build script includes: prisma generate && vite build && bun build ...
RUN npm run build

# --- Stage 5: Production ---
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy only the necessary production artifacts
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist-server ./dist-server
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Start the bundled server
CMD ["npm", "start"]
