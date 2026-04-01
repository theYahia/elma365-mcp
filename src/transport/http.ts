import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

export async function startHttpTransport(server: McpServer, port: number): Promise<void> {
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: () => crypto.randomUUID() });
  await server.connect(transport);

  const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url ?? "/", `http://localhost:${port}`);

    if (url.pathname === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", server: "elma365-mcp" }));
      return;
    }

    if (url.pathname === "/mcp") {
      await transport.handleRequest(req, res);
      return;
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found. Use /mcp or /health" }));
  });

  httpServer.listen(port, () => {
    console.error(`[elma365-mcp] HTTP transport on http://localhost:${port}/mcp`);
  });
}
