import { z } from "zod";
import { elmaRequest } from "../client.js";

export const getTasksSchema = z.object({
  from: z.number().optional().describe("Смещение для пагинации (по умолчанию 0)"),
  size: z.number().optional().describe("Количество задач (по умолчанию 50)"),
});

export async function handleGetTasks(params: z.infer<typeof getTasksSchema>): Promise<string> {
  const queryParams: Record<string, string> = {};
  if (params.from !== undefined) queryParams.from = String(params.from);
  if (params.size !== undefined) queryParams.size = String(params.size);

  const result = await elmaRequest("GET", "bpm/task", undefined, queryParams);
  return JSON.stringify(result, null, 2);
}
