FROM debian:11

RUN apt-get update && \
    apt-get install -y git gnupg curl && \
    apt-get clean

ENV HOME=/root

WORKDIR ${HOME}

COPY app/ ${HOME}/

RUN git clone https://github.com/asdf-vm/asdf.git ${HOME}/asdf --depth 1 --branch v0.9.0

ENV BASH_ENV="${HOME}/asdf/asdf.sh"
# Because asdf is loaded via BASH_ENV, all commands using adsf need to be executed using /usr/bin/env bash -c
SHELL ["/usr/bin/env", "bash", "-c"]

COPY .tool-versions ${HOME}/.tool-versions
# The app only needs yarn and node
RUN sed -i -nr '/node|yarn/p' ${HOME}/.tool-versions && \
    cat ${HOME}/.tool-versions | cut -f 1 -d ' ' | xargs -n 1 asdf plugin-add && \
    asdf plugin-update --all && \
    asdf install && \
    asdf reshim

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init
ENTRYPOINT ["dumb-init", "--"]

ENV NODE_ENV=production

RUN PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 \
    yarn install --frozen-lockfile --production=false && \
    # yarn build:relay && \
    # yarn build:server && \
    yarn build:next && \
    yarn install --frozen-lockfile --production=true && \
    yarn cache clean
    # Make everything in the home group-writable to support OpenShift's restricted SCC
    # Needs to be done as root to chown
    # same layer as yarn install to keep re-chowned files from using up several hundred MBs more space



CMD ["/usr/bin/env", "bash", "-c", "yarn start"]
