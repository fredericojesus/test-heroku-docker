FROM node:slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    npm install -g yarn && \
    npm install -g bower && \
    npm cache clean

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx-site.conf /etc/nginx/conf.d/tlaw-site.conf

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN adduser tlaw && \
    chown -R tlaw /usr/local && \
    chown -R tlaw /usr/src/app

USER tlaw

RUN yarn config set ignore-optional true -g && \
    yarn install --pure-lockfile

# RUN yarn install --pure-lockfile && \
    # $(yarn bin)/bower install -F

USER root

# RUN npm run prod

EXPOSE 80

CMD nginx && npm run prod