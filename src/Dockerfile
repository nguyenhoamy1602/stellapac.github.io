FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY . ./
RUN \
  yarn && \
  yarn build

EXPOSE 80
# start nginx
CMD ["yarn", "start-silent"]