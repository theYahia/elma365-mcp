#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getAppItemsSchema, handleGetAppItems, createItemSchema, handleCreateItem } from "./tools/app-items.js";
import { getTasksSchema, handleGetTasks } from "./tools/tasks.js";
import { getProcessesSchema, handleGetProcesses, startProcessSchema, handleStartProcess } from "./tools/processes.js";
import { getUsersSchema, handleGetUsers, getUserByIdSchema, handleGetUserById } from "./tools/users.js";
import { getCommentsSchema, handleGetComments, addCommentSchema, handleAddComment } from "./tools/comments.js";
import { startHttpTransport } from "./transport/http.js";

const TOOL_COUNT = 8;

export function createServer(): McpServer {
  const server = new McpServer({
    name: "elma365-mcp",
    version: "1.1.0",
  });

  // --- App Items ---
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

  // --- Tasks ---
  server.tool(
    "get_tasks",
    "Получить список BPM-задач ELMA365.",
    getTasksSchema.shape,
    async (params) => ({ content: [{ type: "text", text: await handleGetTasks(params) }] }),
  );

  // --- Processes ---
  server.tool(
    "get_processes",
    "Получить список бизнес-процессов ELMA365.",
    getProcessesSchema.shape,
    async (params) => ({ content: [{ type: "text", text: await handleGetProcesses(params) }] }),
  );

  server.tool(
    "start_process",
    "Запустить бизнес-процесс ELMA365 по коду.",
    startProcessSchema.shape,
    async (params) => ({ content: [{ type: "text", text: await handleStartProcess(params) }] }),
  );

  // --- Users ---
  server.tool(
    "get_users",
    "Получить список пользователей ELMA365.",
    getUsersSchema.shape,
    async (params) => ({ content: [{ type: "text", text: await handleGetUsers(params) }] }),
  );

  server.tool(
    "get_user_by_id",
    "Получить пользователя ELMA365 по ID.",
    getUserByIdSchema.shape,
    async (params) => ({ content: [{ type: "text", text: await handleGetUserById(params) }] }),
  );

  // --- Comments ---
  server.tool(
    "get_comments",
    "Получить комментарии к элементу приложения ELMA365.",
    getCommentsSchema.shape,
    async (params) => ({ content: [{ type: "text", text: await handleGetComments(params) }] }),
  );

  server.tool(
    "add_comment",
    "Добавить комментарий к элементу приложения ELMA365.",
    addCommentSchema.shape,
    async (params) => ({ content: [{ type: "text", text: await handleAddComment(params) }] }),
  );

  return server;
}

async function main() {
  const args = process.argv.slice(2);
  const httpFlag = args.includes("--http");
  const portIndex = args.indexOf("--port");
  const port = portIndex !== -1 ? parseInt(args[portIndex + 1], 10) : 3000;

  const server = createServer();

  if (httpFlag) {
    await startHttpTransport(server, port);
  } else {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`[elma365-mcp] Сервер запущен (stdio). ${TOOL_COUNT + 1} инструментов. Требуется ELMA365_DOMAIN + ELMA365_TOKEN.`);
  }
}

main().catch((error) => {
  console.error("[elma365-mcp] Ошибка:", error);
  process.exit(1);
});
