FROM richarvey/nginx-php-fpm:latest

# Copy application files
COPY . /var/www/html

# Set environment variables for the image
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1

# Install composer dependencies
RUN composer install --no-dev --optimize-autoloader

# Setup storage permissions
RUN chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache
