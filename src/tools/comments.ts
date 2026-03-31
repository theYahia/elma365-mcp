import { z } from "zod";
import { elmaRequest } from "../client.js";

export const getCommentsSchema = z.object({
  namespace: z.string().describe("Пространство имён приложения"),
  code: z.string().describe("Код приложения"),
  itemId: z.string().describe("ID элемента, к которому привязаны комментарии"),
  from: z.number().optional().describe("Смещение для пагинации (по умолчанию 0)"),
  size: z.number().optional().describe("Количество комментариев (по умолчанию 50)"),
});

export async function handleGetComments(params: z.infer<typeof getCommentsSchema>): Promise<string> {
  const queryParams: Record<string, string> = {};
  if (params.from !== undefined) queryParams.from = String(params.from);
  if (params.size !== undefined) queryParams.size = String(params.size);

  const result = await elmaRequest(
    "GET",
    `app/${params.namespace}/${params.code}/${params.itemId}/comment/list`,
    undefined,
    queryParams,
  );
  return JSON.stringify(result, null, 2);
}

export const addCommentSchema = z.object({
  namespace: z.string().describe("Пространство имён приложения"),
  code: z.string().describe("Код приложения"),
  itemId: z.string().describe("ID элемента"),
  text: z.string().describe("Текст комментария"),
});

export async function handleAddComment(params: z.infer<typeof addCommentSchema>): Promise<string> {
  const result = await elmaRequest(
    "POST",
    `app/${params.namespace}/${params.code}/${params.itemId}/comment`,
    { text: params.text },
  );
  return JSON.stringify(result, null, 2);
}
