FROM node:19-alpine

WORKDIR /app

#Add bash to use it if we need to inspect the
RUN apk update && apk add bash

ADD package.json /app/package.json

RUN npm config set registry http://registry.npmjs.org

RUN yarn

COPY . /app

RUN yarn build

# Create a group and user
RUN addgroup -S intranetapigroup && adduser -S intranetapiuser -G intranetapigroup
# Give it permissions to the /app folder
RUN cd /app && find . -path ./node_modules -prune -o -name user -type d -exec chown -R :intranetapigroup {} \;
RUN cd /app && find . -path ./node_modules -prune -o -name user -type d -exec chmod -R 755 {} \;

# Tell docker that all future commands should run as the intranetapiuser user
USER intranetapiuser

EXPOSE 3000

CMD ["yarn", "start"]
