FROM node:21-alpine as build

WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


FROM nginx:1.24-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/palestine-martyrs-kinship-ui /usr/share/nginx/html

# Expose port 80
EXPOSE 80
