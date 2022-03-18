FROM strapi/base:14-alpine
# Create and change to the app directory.
WORKDIR /usr/src/app
ENV NODE_ENV=development
# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./
# Install production dependencies.
RUN npm install
# Copy local code to the container image.
COPY . ./
# Build Strapi

# Run the web service on container startup.
RUN yarn develop