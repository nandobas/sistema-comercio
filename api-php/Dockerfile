FROM alpine:latest

RUN apk add vim openrc wget nginx supervisor curl bash git tzdata openssh \
        php7 php7-fpm php7-mysqli php7-json php7-openssl php7-curl php7-zip php7-xmlwriter php7-tokenizer php7-iconv  \
        php7-zlib php7-xml php7-simplexml php7-phar php7-intl php7-dom php7-xmlreader php7-ctype php7-fileinfo php7-session \
        php7-mbstring php7-gd php7-pspell php7-pdo_mysql php7-dev php7-pear libc6-compat sqlite php7-pdo_sqlite gcc make g++ zlib-dev && \
        curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer && \
        cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && echo "America/Sao_Paulo" >  /etc/timezone && apk del tzdata

WORKDIR "/var/www/html"

RUN adduser --disabled-password --gecos "" --no-create-home www && mkdir -p /run/nginx
COPY --chown=www . .

COPY ./composer.json .

RUN composer install

COPY ./docker-config/fpm-pool.conf /etc/php7/php-fpm.d/www.conf
COPY ./docker-config/default.conf /etc/nginx/conf.d
COPY ./docker-config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
