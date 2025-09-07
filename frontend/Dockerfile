FROM nginx:alpine

# نسخ ملف الإعدادات
COPY nginx.conf /etc/nginx/nginx.conf

# نسخ ملفات الواجهة
COPY ./*.html /usr/share/nginx/html/
COPY ./*.css /usr/share/nginx/html/
COPY ./*.js /usr/share/nginx/html/

# تأكد أن nginx عنده صلاحيات على مجلد الكاش
RUN mkdir -p /var/cache/nginx && \
    chmod -R 777 /var/cache/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
