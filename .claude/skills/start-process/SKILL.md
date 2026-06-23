---
name: skill-start-process
description: "Запусти бизнес-процесс — запуск процесса ELMA365 по namespace и коду"
argument-hint: <namespace> <код_процесса> [параметры]
allowed-tools:
  - Bash
  - Read
---

# /skill-start-process — Запусти бизнес-процесс

Запускает бизнес-процесс в ELMA365 по разделу (`namespace`) и коду с опциональными параметрами контекста.

## Алгоритм

1. Получи `namespace` (раздел) и `code` (код процесса) от пользователя.
   - Не знаешь namespace/код? Вызови `list_namespaces`, затем `list_processes <namespace>`.
2. Если нужно — запроси входные параметры (`context`).
3. Вызови `start_process` с `namespace`, `code` и `context`.
4. Покажи результат запуска.

## Формат ответа

```
## Процесс запущен

- Раздел: sales
- Код: approval_flow
- ID экземпляра: abc-123-def
- Статус: Запущен
- Контекст: { "amount": 50000 }
```

## Примеры

```
/skill-start-process sales approval_flow
/skill-start-process hr onboarding {"employee": "Иванов"}
```
