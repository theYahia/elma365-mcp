---
name: elma365-apps
description: Управление элементами приложений и BPM-задачами в ELMA365
argument-hint: <действие> [namespace/code]
allowed-tools:
  - Bash
  - Read
---

# /elma365-apps — Работа с приложениями и задачами ELMA365

## Алгоритм

1. Не знаешь точные namespace/code/поля? Сначала discovery: `list_namespaces` → `list_apps <namespace>` → `get_app_schema <namespace> <code>`.
2. Вызови `get_app_items` для получения элементов приложения (`get_app_item` — один по id).
3. Вызови `create_item` / `update_app_item` / `set_app_item_status` для записи.
4. Вызови `get_tasks` для получения BPM-задач.

## Формат ответа

```
## Элементы приложения deals/crm_deals

Найдено: 25 элементов

1. Сделка с ООО Ромашка — В работе
2. ...
```

## Примеры

```
/elma365-apps элементы deals/crm_deals
/elma365-apps создать элемент hr/candidates
/elma365-apps задачи
```
