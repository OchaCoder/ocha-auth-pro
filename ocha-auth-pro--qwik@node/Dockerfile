ARG NODE_VERSION=18.18.2

# ================================================================================
# Base image
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

# ================================================================================
# Install dependencies
FROM base AS deps

COPY package.json .
COPY package-lock.json .

RUN npm install --legacy-peer-deps

# ================================================================================
# Build app
FROM deps AS build

COPY . .

RUN npm run build

# ================================================================================
# Final runtime image
FROM base AS final

ENV NODE_ENV=production
ENV ORIGIN=https://ocha-auth-pro.ochacoder.com

USER node

COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/server ./server

EXPOSE 3000
CMD ["npm", "run", "serve"]
