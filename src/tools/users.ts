import { z } from "zod";
import { elmaRequest } from "../client.js";

export const getUsersSchema = z.object({
  from: z.number().optional().describe("Смещение для пагинации (по умолчанию 0)"),
  size: z.number().optional().describe("Количество пользователей (по умолчанию 50)"),
});

export async function handleGetUsers(params: z.infer<typeof getUsersSchema>): Promise<string> {
  const queryParams: Record<string, string> = {};
  if (params.from !== undefined) queryParams.from = String(params.from);
  if (params.size !== undefined) queryParams.size = String(params.size);

  const result = await elmaRequest("GET", "user/list", undefined, queryParams);
  return JSON.stringify(result, null, 2);
}

export const getUserByIdSchema = z.object({
  id: z.string().describe("ID пользователя"),
});

export async function handleGetUserById(params: z.infer<typeof getUserByIdSchema>): Promise<string> {
  const result = await elmaRequest("GET", `user/${params.id}`);
  return JSON.stringify(result, null, 2);
}
