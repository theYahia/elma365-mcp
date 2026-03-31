# @theyahia/elma365-mcp

MCP-сервер для ELMA365 API — элементы приложений, BPM-задачи. **3 инструмента.**

[![npm](https://img.shields.io/npm/v/@theyahia/elma365-mcp)](https://www.npmjs.com/package/@theyahia/elma365-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Часть серии [Russian API MCP](https://github.com/theYahia/russian-mcp) (50 серверов) by [@theYahia](https://github.com/theYahia).

## Установка

### Claude Desktop

```json
{
  "mcpServers": {
    "elma365": {
      "command": "npx",
      "args": ["-y", "@theyahia/elma365-mcp"],
      "env": { "ELMA365_DOMAIN": "your-domain.elma365.ru", "ELMA365_TOKEN": "your-token" }
    }
  }
}
```

### Claude Code

```bash
claude mcp add elma365 -e ELMA365_DOMAIN=your-domain.elma365.ru -e ELMA365_TOKEN=your-token -- npx -y @theyahia/elma365-mcp
```

### VS Code / Cursor

```json
{ "servers": { "elma365": { "command": "npx", "args": ["-y", "@theyahia/elma365-mcp"], "env": { "ELMA365_DOMAIN": "your-domain.elma365.ru", "ELMA365_TOKEN": "your-token" } } } }
```

### Windsurf

```json
{ "mcpServers": { "elma365": { "command": "npx", "args": ["-y", "@theyahia/elma365-mcp"], "env": { "ELMA365_DOMAIN": "your-domain.elma365.ru", "ELMA365_TOKEN": "your-token" } } } }
```

> Требуется `ELMA365_DOMAIN` (домен вашего ELMA365) и `ELMA365_TOKEN` (API-токен).

## Инструменты (3)

| Инструмент | Описание |
|------------|----------|
| `get_app_items` | Список элементов приложения по namespace и code |
| `create_item` | Создание нового элемента в приложении |
| `get_tasks` | Список BPM-задач |

## Примеры

```
Покажи элементы приложения deals/crm_deals
Создай новый элемент в приложении hr/candidates
Покажи мои BPM-задачи
```

## Лицензия

MIT
