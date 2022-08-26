import { render, screen } from "../../../test-utils";
import { server } from "../../../mocks/server";
import Type from "../Type";
import { rest } from "msw";

test("displays product images from server", async () => {
    render(<Type orderType="products" />);

    // * product로 끝나는 alt 속성 이름을 가진 <img /> 노드들을 비동기로 가져오기
    // findby = get + waitfor 이기 때문에 async + awiat가 필요하다.
    const productImages = await screen.findAllByRole("img", {
        name: /product$/i,
    });
    expect(productImages).toHaveLength(2); // 가져온 Product 개수 확인

    const altText = productImages.map((element) => element.alt);
    expect(altText).toEqual(["America product", "England product"]);
});

test("fetch option information from server", async () => {
    render(<Type orderType="options" />);

    // 체크박스 가져오기
    const optionCheckboxes = await screen.findAllByRole("checkbox");

    expect(optionCheckboxes).toHaveLength(2);
});

test("when fetching product datas, face an error", async () => {
    // 에러가 난 상황을 일부러 만들기 위해서 에러를 발생시키는 handlers로 재설정시킨다.
    // 정상적이라면 server에 설정한 handlers에서 처리된다.
    server.resetHandlers(
        rest.get("http://localhost:5000/products", (req, res, ctx) => {
            return res(ctx.status(500));
        })
    );

    render(<Type orderType="products" />);
    // 바로 에러가 나는 것이 아닌, 비동기 요청을 준 후에 에러가 나야 에러 처리를 할 수 있으므로 async
    const errorBanner = await screen.findByTestId("error-banner");
    expect(errorBanner).toHaveTextContent("에러가 발생했습니다.");
});
