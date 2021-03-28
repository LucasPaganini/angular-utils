FROM node:14.16.0
RUN npm install -g npm@7.7.5

RUN apt-get update \
    && apt-get install -y \
      xvfb \
      chromium \
      firefox-esr
ENV CHROME_BIN=/usr/bin/chromium \
    FIREFOX_BIN=/usr/bin/firefox-esr

WORKDIR /workspace
