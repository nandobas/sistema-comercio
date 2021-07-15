FROM node:10.16.3-alpine

RUN apk add php7 php7-fpm php7-mysqli php7-json php7-openssl php7-curl php7-session \
    php7-pear php7-dev gcc musl-dev make curl-dev openssl-dev \
    php7-zlib php7-xml php7-phar php7-intl php7-dom php7-xmlreader php7-ctype php7-tokenizer php7-xmlwriter php7-fileinfo \
    php7-mbstring php7-gd nginx supervisor curl bash git php7-pspell php7-pdo_mysql vim openrc openssl && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --version=1.9.0 && \
    chmod +x /usr/local/bin/composer 

WORKDIR /var/www/html
RUN adduser --disabled-password --gecos "" --no-create-home www && mkdir -p /run/nginx

COPY ./docker-config/fpm-pool.conf /etc/php7/php-fpm.d/www.conf
COPY ./docker-config/api-nginx.conf /etc/nginx/conf.d
COPY ./docker-config/front-nginx.conf /etc/nginx/conf.d
COPY ./docker-config/php.ini /etc/php7/php.ini
COPY ./docker-config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./docker-config/nginx.conf /etc/nginx/http.d


RUN cd SPTApi && rm -rf .env && cp .env.example .env && composer install && cd ..

EXPOSE 8080
EXPOSE 8000

CMD ["bash"]
