# @theyahia/elma365-mcp

MCP-сервер для ELMA365 API — элементы приложений, BPM-задачи, процессы, пользователи, комментарии. **9 инструментов.**

[![npm](https://img.shields.io/npm/v/@theyahia/elma365-mcp)](https://www.npmjs.com/package/@theyahia/elma365-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/theYahia/elma365-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/theYahia/elma365-mcp/actions)

Часть серии [Russian API MCP](https://github.com/theYahia/russian-mcp) (50 серверов) by [@theYahia](https://github.com/theYahia).

## Установка

### Claude Desktop

```json
{
  "mcpServers": {
    "elma365": {
      "command": "npx",
      "args": ["-y", "@theyahia/elma365-mcp"],
      "env": {
        "ELMA365_DOMAIN": "mycompany",
        "ELMA365_TOKEN": "your-token"
      }
    }
  }
}
```

### Claude Code

```bash
claude mcp add elma365 \
  -e ELMA365_DOMAIN=mycompany \
  -e ELMA365_TOKEN=your-token \
  -- npx -y @theyahia/elma365-mcp
```

### VS Code / Cursor

```json
{
  "servers": {
    "elma365": {
      "command": "npx",
      "args": ["-y", "@theyahia/elma365-mcp"],
      "env": {
        "ELMA365_DOMAIN": "mycompany",
        "ELMA365_TOKEN": "your-token"
      }
    }
  }
}
```

### Streamable HTTP (для веб-клиентов)

```bash
ELMA365_DOMAIN=mycompany ELMA365_TOKEN=your-token npx @theyahia/elma365-mcp --http --port 3000
```

Endpoint: `http://localhost:3000/mcp`
Health check: `http://localhost:3000/health`

### Smithery

Используйте `smithery.yaml` в корне репозитория для деплоя на [Smithery](https://smithery.ai).

> Требуется `ELMA365_DOMAIN` (домен или поддомен ELMA365, например `mycompany`) и `ELMA365_TOKEN` (Bearer API-токен).

## Инструменты (9)

| Инструмент | Описание |
|------------|----------|
| `get_app_items` | Список элементов приложения по namespace и code |
| `create_item` | Создание нового элемента в приложении |
| `get_tasks` | Список BPM-задач |
| `get_processes` | Список бизнес-процессов |
| `start_process` | Запуск бизнес-процесса по коду |
| `get_users` | Список пользователей |
| `get_user_by_id` | Получение пользователя по ID |
| `get_comments` | Комментарии к элементу приложения |
| `add_comment` | Добавить комментарий к элементу |

## Skills (Claude Code)

| Skill | Описание |
|-------|----------|
| `/skill-my-tasks` | Мои задачи — показать текущие BPM-задачи |
| `/skill-start-process` | Запусти бизнес-процесс по коду |

## Примеры

```
Покажи элементы приложения deals/crm_deals
Создай новый элемент в приложении hr/candidates
Покажи мои BPM-задачи
Покажи список бизнес-процессов
Запусти процесс approval_flow с параметрами {"amount": 50000}
Покажи пользователей
Покажи комментарии к элементу item-123 в deals/crm_deals
Добавь комментарий "Согласовано" к элементу item-123 в deals/crm_deals
```

## Транспорт

| Режим | Команда | Описание |
|-------|---------|----------|
| stdio (по умолчанию) | `npx @theyahia/elma365-mcp` | Для Claude Desktop, Claude Code, Cursor |
| Streamable HTTP | `npx @theyahia/elma365-mcp --http` | Для веб-клиентов, port 3000 по умолчанию |
| Streamable HTTP (порт) | `npx @theyahia/elma365-mcp --http --port 8080` | Кастомный порт |

## Аутентификация

- `ELMA365_DOMAIN` — домен ELMA365 (например `mycompany` для `mycompany.elma365.ru`, или полный домен `mycompany.elma365.ru`)
- `ELMA365_TOKEN` — Bearer-токен для ELMA365 API

Базовый URL: `https://{domain}.elma365.ru/pub/v1/`

## Разработка

```bash
npm install
npm run build
npm test
npm run dev    # запуск через tsx
```

## Лицензия

MIT
