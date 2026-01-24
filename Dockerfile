# first stage: building the site
from node:25-slim as build

workdir /app

copy . .

run npm run clean && npm install && npm run build

# second stage: running the lab
from nginx:latest as runtime

copy --from=build /app/dist/cv-landing/browser /usr/share/nginx/html

entrypoint ["nginx", "-g", "daemon off;"]
cmd []