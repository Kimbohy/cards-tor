import { api } from "@/lib/eden";
import { describe, expect, it } from "bun:test";

describe("Elysia", () => {
  it("return a Hello message", async () => {
    const { data, status } = await api.hello.get();
    expect(data).toEqual({ message: "Hello from Elysia!" });
    expect(status).toBe(200);
  });
});
