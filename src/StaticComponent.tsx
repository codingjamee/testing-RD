import AnchorTagComponent from "./AnchorTagComponent";

const StaticComponent = () => {
  return (
    <>
      <h1>Static Component</h1>
      <div>유용한 링크</div>

      <ul data-testid="ul">
        <li>
          <AnchorTagComponent
            targetBlank
            name="리액트"
            href="https://reactjs.org"
          />
        </li>
        <li>
          <AnchorTagComponent
            targetBlank
            name="네이버"
            href="https://www.naver.com"
          />
        </li>
        <li>
          <AnchorTagComponent
            targetBlank
            name="블로그"
            href="https://yceffeort.kr"
          />
        </li>
      </ul>
    </>
  );
};

export default StaticComponent;
