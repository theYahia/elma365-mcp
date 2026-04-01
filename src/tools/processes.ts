import { z } from "zod";
import { elmaRequest } from "../client.js";

export const getProcessesSchema = z.object({
  from: z.number().optional().describe("Смещение для пагинации (по умолчанию 0)"),
  size: z.number().optional().describe("Количество процессов (по умолчанию 50)"),
});

export async function handleGetProcesses(params: z.infer<typeof getProcessesSchema>): Promise<string> {
  const queryParams: Record<string, string> = {};
  if (params.from !== undefined) queryParams.from = String(params.from);
  if (params.size !== undefined) queryParams.size = String(params.size);

  const result = await elmaRequest("GET", "bpm/process", undefined, queryParams);
  return JSON.stringify(result, null, 2);
}

export const startProcessSchema = z.object({
  code: z.string().describe("Код бизнес-процесса для запуска"),
  context: z.record(z.unknown()).optional().describe("Контекст запуска (входные параметры процесса)"),
});

export async function handleStartProcess(params: z.infer<typeof startProcessSchema>): Promise<string> {
  const body: Record<string, unknown> = {};
  if (params.context) body.context = params.context;

  const result = await elmaRequest("POST", `bpm/process/${params.code}/start`, body);
  return JSON.stringify(result, null, 2);
}
