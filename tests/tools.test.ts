import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { handleGetAppItems, handleCreateItem } from "../src/tools/app-items.js";
import { handleGetTasks } from "../src/tools/tasks.js";
import { handleGetProcesses, handleStartProcess } from "../src/tools/processes.js";
import { handleGetUsers, handleGetUserById } from "../src/tools/users.js";
import { handleGetComments, handleAddComment } from "../src/tools/comments.js";

describe("tools", () => {
  beforeEach(() => {
    process.env.ELMA365_DOMAIN = "testdomain";
    process.env.ELMA365_TOKEN = "test-token";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockFetch = (data: unknown) =>
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(data), { status: 200 }),
    );

  describe("app-items", () => {
    it("get_app_items returns JSON string", async () => {
      mockFetch({ result: [{ __id: "1", __name: "Item 1" }] });
      const result = await handleGetAppItems({ namespace: "deals", code: "crm" });
      const parsed = JSON.parse(result);
      expect(parsed.result).toHaveLength(1);
      expect(parsed.result[0].__name).toBe("Item 1");
    });

    it("create_item sends data", async () => {
      const spy = mockFetch({ __id: "new-id" });
      const result = await handleCreateItem({ namespace: "hr", code: "candidates", data: { name: "John" } });
      expect(JSON.parse(result).__id).toBe("new-id");
      expect(spy.mock.calls[0][1]?.body).toContain('"name":"John"');
    });
  });

  describe("tasks", () => {
    it("get_tasks returns task list", async () => {
      mockFetch({ result: [{ id: "t1", subject: "Task 1" }] });
      const result = await handleGetTasks({});
      expect(JSON.parse(result).result[0].subject).toBe("Task 1");
    });

    it("get_tasks with pagination", async () => {
      const spy = mockFetch({ result: [] });
      await handleGetTasks({ from: 10, size: 5 });
      expect(String(spy.mock.calls[0][0])).toContain("from=10");
      expect(String(spy.mock.calls[0][0])).toContain("size=5");
    });
  });

  describe("processes", () => {
    it("get_processes returns list", async () => {
      mockFetch({ result: [{ id: "p1", name: "Approval" }] });
      const result = await handleGetProcesses({});
      expect(JSON.parse(result).result[0].name).toBe("Approval");
    });

    it("start_process sends code and context", async () => {
      const spy = mockFetch({ id: "instance-1", status: "started" });
      const result = await handleStartProcess({ code: "approval", context: { amount: 5000 } });
      expect(JSON.parse(result).status).toBe("started");
      expect(String(spy.mock.calls[0][0])).toContain("bpm/process/approval/start");
    });
  });

  describe("users", () => {
    it("get_users returns user list", async () => {
      mockFetch({ result: [{ __id: "u1", __name: "Ivan" }] });
      const result = await handleGetUsers({});
      expect(JSON.parse(result).result[0].__name).toBe("Ivan");
    });

    it("get_user_by_id fetches single user", async () => {
      const spy = mockFetch({ __id: "u1", __name: "Ivan", email: "ivan@test.ru" });
      const result = await handleGetUserById({ id: "u1" });
      expect(JSON.parse(result).email).toBe("ivan@test.ru");
      expect(String(spy.mock.calls[0][0])).toContain("user/u1");
    });
  });

  describe("comments", () => {
    it("get_comments returns comment list", async () => {
      const spy = mockFetch({ result: [{ __id: "c1", text: "Hello" }] });
      const result = await handleGetComments({ namespace: "deals", code: "crm", itemId: "item-1" });
      expect(JSON.parse(result).result[0].text).toBe("Hello");
      expect(String(spy.mock.calls[0][0])).toContain("app/deals/crm/item-1/comment/list");
    });

    it("add_comment sends text", async () => {
      const spy = mockFetch({ __id: "c2" });
      const result = await handleAddComment({ namespace: "hr", code: "emp", itemId: "e1", text: "Note" });
      expect(JSON.parse(result).__id).toBe("c2");
      expect(spy.mock.calls[0][1]?.body).toContain('"text":"Note"');
    });
  });
});
