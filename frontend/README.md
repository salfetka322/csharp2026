# loomi

## Опис

**loomi** — це додаток для знайомств з унікальним підходом до пошуку нових
людей.  
Мета проєкту — створити просту та інтуїтивну платформу, де студенти
університетів можуть знаходити друзів чи потенційних партнерів, обмінюватися
повідомленнями та формувати спільноти.

## Інсталяція та запуск

git clone <https://github.com/r1nozaki/loomi>

cd loomi

npm install

### Налаштування Google OAuth

1. Створіть файл `.env` в директорії `frontend/`
2. Додайте змінну середовища:
   ```
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```
3. Отримайте Google Client ID:
   - Перейдіть на [Google Cloud Console](https://console.cloud.google.com/)
   - Створіть новий проект або виберіть існуючий
   - Увімкніть Google+ API
   - Створіть OAuth 2.0 Client ID (тип: Web application)
   - Додайте авторизовані джерела (URI вашого сайту, наприклад: `http://localhost:5173`)
   - Скопіюйте Client ID та вставте в `.env` файл

npm run dev

## Технології

-JavaScript

-React

-Java

-Spring

-Tailwind CSS

-PostgreSQL

## Структура репозиторію

[`Documentation`](https://docs.google.com/document/d/13Ws_p25qviVMbPeRwGo52kzgil1xX_mbbaH0YcE56Pg/edit?tab=t.o9zvuqz8frrp)

/src - код

## Автори

Іван Загоруй - Frontend Developer

Валентин Новосад - Backend Developer

Андрій Дроб - UX/UI Designer

Максим Мальований - Team Lead
