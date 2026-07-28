# Static web (PWA) image for 갭갭갭
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
ENV EXPO_PUBLIC_API_BASE_URL=https://app-navi-production.up.railway.app
RUN npx expo export --platform web

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN npm install -g serve@14
COPY --from=build /app/dist ./dist

EXPOSE 3000
# Bind all interfaces so Railway healthchecks can reach the container
CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:3000"]
