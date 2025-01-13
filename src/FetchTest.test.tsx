import { describe, test, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FetchComponent } from "./FetchComponent";
import { setupServer } from "msw/node"; // browser 대신 node를 사용
import { http, HttpResponse } from "msw";

const MOCK_TODO_RESPONSE = {
  userId: 1,
  id: 1,
  title: "this is title for user id number 1",
  completed: false,
};

const server = setupServer(
  http.get("/todos/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ ...MOCK_TODO_RESPONSE, id: Number(id) });
  })
);
beforeAll(() => {
  server.listen(); // worker.start() 대신 server.listen() 사용
});

describe("FetchComponent 테스트", () => {
  beforeEach(() => {
    render(<FetchComponent />);
  });

  it("데이터를 불러오기 전에는 기본 문구가 뜬다", async () => {
    const nowLoading = await screen.findByText(/불러온 데이터가 없습니다./);
    expect(nowLoading).toBeInTheDocument();
  });
});
