FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY ./*.html /usr/share/nginx/html/
COPY ./*.css /usr/share/nginx/html/
COPY ./*.js /usr/share/nginx/html/

RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx \
  && chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
