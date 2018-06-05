FROM node:8.6.0-alpine
LABEL maintainer "Mey&Liron"
# reset permissions back to root for tools installation
USER root
# put the app in the right folder
RUN mkdir -p /var/app
WORKDIR /var/app
COPY ./package.json /var/app
COPY . /var/app
RUN npm install 
#allow access to user node to all the installed packages
RUN chown -R node:node /var/app/node_modules
#install npm modules in volume mount
VOLUME /var/app/node_modules
EXPOSE 9300
#install linux packages/commands
RUN apk add --no-cache dumb-init
# reduce permissions for account running app
USER node
ENTRYPOINT ["dumb-init"]
CMD ["npm","run","watch"]

