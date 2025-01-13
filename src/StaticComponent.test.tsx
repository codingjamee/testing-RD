import { render, screen } from "@testing-library/react";
import StaticComponent from "./StaticComponent";

beforeEach(() => {
  render(<StaticComponent />);
});

describe("링크확인", () => {
  it("링크가 3개 존재한다", () => {
    const ul = screen.getByTestId("ul");
    expect(ul.children.length).toBe(3);
  });

  it("링크목록의 스타일이 square다", () => {});
});

describe("리액트 링크 테스트", () => {
  it("리액트 링크가 존재한다", () => {
    screen.debug();

    const reactLink = screen.getByText("리액트");
    console.log({
      text: reactLink.textContent,
      href: reactLink.getAttribute("href"),
      target: reactLink.getAttribute("target"),
      tagName: reactLink.tagName,
      outerHTML: reactLink.outerHTML,
    });
    expect(reactLink).toBeVisible();
  });
});
