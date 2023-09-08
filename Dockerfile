FROM --platform=$TARGETPLATFORM node:lts-bullseye-slim

ARG TARGETPLATFORM
ARG BUILDPLATFORM

RUN echo "I am running on $BUILDPLATFORM, building for $TARGETPLATFORM" > /log

RUN npm install -g pnpm

# Create app directory
WORKDIR /app

# Copy package.json and pnpm-lock.json
COPY package*.json pnpm-lock.yaml ./

# Install packages
RUN pnpm install

# Copy the app code
COPY . .

# Build the project
RUN npm run build

# Expose ports
EXPOSE 3001

# Run the application
CMD [ "node", "dist/index.js" ]