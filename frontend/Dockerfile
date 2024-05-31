FROM  node:latest AS builder

# Set working directory
WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app


# Copy the entire frontend directory to the working directory
COPY . /app

# RUN npm install -g expo-cli && \
#    npm install expo-build-properties@0.11.1 --force


RUN npm install

EXPOSE 8081
EXPOSE 19001
EXPOSE 19002

CMD ["npx","expo", "start", "--tunnel"]
