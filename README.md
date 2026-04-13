# Andrii Site — Сухарєв Андрій

Персональний сайт + ФОП інвойсинг на Next.js з PostgreSQL.

## Швидкий старт

### 1. Встанови залежності

```bash
nvm use
pnpm install
```

Проєкт зафіксовано на Node.js `v24.14.1` через `.nvmrc` та `.node-version`, а пакетний менеджер зафіксовано на `pnpm`.

### 2. Налаштуй PostgreSQL

Переконайся що PostgreSQL запущений локально. Створи базу:

```bash
createdb fop_invoicing
```

Або через psql:
```sql
CREATE DATABASE fop_invoicing;
```

### 3. Налаштуй .env

Файл `.env` вже створений з дефолтним підключенням:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fop_invoicing"
```

Зміни username/password якщо потрібно.

### 4. Ініціалізуй базу даних

```bash
pnpm setup
```

Це згенерує Prisma клієнт і створить таблиці в БД.

### 5. Запусти

```bash
pnpm dev
```

Відкрий http://localhost:3500

## Можливості

- **Dashboard** — огляд бізнесу, статистика, останні інвойси
- **Клієнти** — CRUD, пошук, фільтрація (оптимізовано для 20+ контрагентів)
- **Інвойси** — створення (hourly rate + fixed price), USD/EUR/UAH
- **PDF експорт** — генерація PDF інвойсів з усіма реквізитами ФОП
- **Реквізити ФОП** — всі дані вбудовані (ІПН, IBAN, банк)
- **Автонумерація** — інвойси нумеруються автоматично

## Стек

- Next.js 15 (App Router)
- PostgreSQL + Prisma ORM
- jsPDF для генерації PDF
- TypeScript
