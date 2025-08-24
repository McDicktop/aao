#!/bin/bash

echo "Начинаем развертывание приложения..."

if ! command -v docker $> /dev/null; then
    echo "Docker не установлен. Установите его и повторите попытку."
    exit 1
fi

if ! command -v docker-compose $> /dev/null; then
    echo "Docker Compose не установлен. Установите его и повторите попытку."
    exit 1
fi



# Остановливаем все контейнеры
docker-compose down

# Удаляем старые образы
docker system prune -f

# Собираем новые образы
docker-compose build --no-cache

# Запускаем образы
docker-compose up -d

# Ожидаем запуска
sleep 10

# Проверяем статус контейнеров
docker-compose ps