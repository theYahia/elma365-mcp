#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getAppItemsSchema, handleGetAppItems, createItemSchema, handleCreateItem } from "./tools/app-items.js";
import { getTasksSchema, handleGetTasks } from "./tools/tasks.js";

const server = new McpServer({
  name: "elma365-mcp",
  version: "1.0.0",
});

server.tool(
  "get_app_items",
  "Получить список элементов приложения ELMA365 по namespace и code.",
  getAppItemsSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetAppItems(params) }] }),
);

server.tool(
  "create_item",
  "Создать новый элемент в приложении ELMA365.",
  createItemSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateItem(params) }] }),
);

server.tool(
  "get_tasks",
  "Получить список BPM-задач ELMA365.",
  getTasksSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetTasks(params) }] }),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[elma365-mcp] Сервер запущен. 3 инструмента. Требуется ELMA365_DOMAIN + ELMA365_TOKEN.");
}

main().catch((error) => {
  console.error("[elma365-mcp] Ошибка:", error);
  process.exit(1);
});
