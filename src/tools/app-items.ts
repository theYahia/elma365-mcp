import { z } from "zod";
import { elmaRequest } from "../client.js";

export const getAppItemsSchema = z.object({
  namespace: z.string().describe("Пространство имён приложения (namespace)"),
  code: z.string().describe("Код приложения"),
  from: z.number().optional().describe("Смещение для пагинации (по умолчанию 0)"),
  size: z.number().optional().describe("Количество элементов (по умолчанию 50)"),
});

export async function handleGetAppItems(params: z.infer<typeof getAppItemsSchema>): Promise<string> {
  const queryParams: Record<string, string> = {};
  if (params.from !== undefined) queryParams.from = String(params.from);
  if (params.size !== undefined) queryParams.size = String(params.size);

  const result = await elmaRequest("GET", `app/${params.namespace}/${params.code}/list`, undefined, queryParams);
  return JSON.stringify(result, null, 2);
}

export const createItemSchema = z.object({
  namespace: z.string().describe("Пространство имён приложения (namespace)"),
  code: z.string().describe("Код приложения"),
  data: z.record(z.unknown()).describe("Данные нового элемента (поля приложения)"),
});

export async function handleCreateItem(params: z.infer<typeof createItemSchema>): Promise<string> {
  const result = await elmaRequest("POST", `app/${params.namespace}/${params.code}/create`, params.data);
  return JSON.stringify(result, null, 2);
}
