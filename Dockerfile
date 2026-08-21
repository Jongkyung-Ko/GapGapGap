# Static web (PWA) image for 갭갭갭
# rebuild: 2026-07-29 metric chips + eok format
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

COPY --from=build /app/dist ./dist
COPY --from=build /app/serve.json ./dist/serve.json
RUN npm install --omit=dev serve@14

EXPOSE 3000
# Do NOT use `serve -s`: it rewrites /analysis to root index.html and blanks the report.
# Pre-rendered Expo routes are served as static HTML; Seoul district deep links use serve.json rewrites.
CMD ["sh", "-c", "npx serve dist -l tcp://0.0.0.0:${PORT:-3000}"]
