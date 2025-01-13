import { describe, test, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { FetchComponent } from "./FetchComponent";
import { setupServer } from "msw/node"; // browser 대신 node를 사용
import { http, HttpResponse } from "msw";

const MOCK_TODO_RESPONSE = {
  userId: 1,
  id: 1,
  title: "this is title for user id number 1",
  completed: false,
};

//test시 mock server 사용

const server = setupServer(
  http.get("/todos/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ ...MOCK_TODO_RESPONSE, id: Number(id) });
  })
);

//It’s common to enable the interception in the beforeAll hook of your testing framework. Below you can find an example of how to do that with Jest.
//https://mswjs.io/docs/api/setup-server/listen

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

  it("버튼 클릭 시 데이터 불러온다", async () => {
    const button = screen.getByRole("button", { name: /1번/ });
    fireEvent.click(button);

    const data = await screen.findByText(MOCK_TODO_RESPONSE.title);
    expect(data).toBeInTheDocument();
  });

  it("버튼 클릭 후 서버 에러가 발생하면 에러문구를 노출한다", async () => {
    server.use(
      http.get("/todos/:id", () => {
        return new HttpResponse(null, { status: 503 });
      })
    );

    const button = screen.getByRole("button", { name: /1번/ });
    fireEvent.click(button);

    const error = await screen.findByText(/에러가 발생했습니다/);
    expect(error).toBeInTheDocument();
  });
});
