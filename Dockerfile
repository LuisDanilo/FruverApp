FROM node:18.16

# Install Apache HTTP Server
RUN apt-get update && apt-get install -y apache2

# Expose port 80 for Apache
EXPOSE 80

# Set the working directory
WORKDIR /app

# Copy your Node.js application code
# COPY ./frontend /app

# Install Node.js dependencies
# RUN npm install

# Build application
# RUN npm build -op /var/www/html

# Start Apache
CMD apache2ctl -D FOREGROUND