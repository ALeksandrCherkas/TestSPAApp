FROM nginx:alpine

# Копируем собранную на твоем ПК папку build внутрь Nginx
COPY build /usr/share/nginx/html

# Открываем порт 3000
EXPOSE 3000

# Настраиваем Nginx на работу с портом 3000 вместо дефолтного 80
RUN sed -i 's/listen[:[:space:]]*80;/listen 3000;/g' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]


