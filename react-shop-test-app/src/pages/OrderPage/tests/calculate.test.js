import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import Type from "../Type";
import OrderPage from "../OrderPage";

test.only("update product's total when products change", async () => {
    render(<Type orderType="products" />);

    // "상품 총 가격:" 뒤에 어떠한 텍스트가 있어도 해당하는 element 가져오기
    const productsTotal = screen.getByText("상품 가격:", { exact: false });
    expect(productsTotal).toHaveTextContent("0");

    // 아메리카 여행 상품 한 개 올리기
    const americaInput = await screen.findByRole("spinbutton", {
        name: "America",
    });
    userEvent.clear(americaInput); // type으로 입력을 주기 전에 항상 초기화
    userEvent.type(americaInput, "1");

    console.log("use", productsTotal.textContent);
    expect(productsTotal).toHaveTextContent("1000");
});

test("update option's total when options change", async () => {
    render(<Type orderType="options" />);
    // 옵션 총 가격이 0부터 시작
    const optionsTotal = screen.getByText("옵션 가격:", { exact: false });
    expect(optionsTotal).toHaveTextContent("0");
    // Insurance 옵션 추가
    const insuranceCheckbox = await screen.findByRole("checkbox", {
        name: "Insurance",
    });
    userEvent.click(insuranceCheckbox);
    expect(optionsTotal).toHaveTextContent("500");
    // Dinner 옵션 추가
    const dinnerCheckbox = await screen.findByRole("checkbox", {
        name: "Dinner",
    });
    userEvent.click(dinnerCheckbox);
    expect(optionsTotal).toHaveTextContent("1000");
    // Dinner 옵션 제거
    userEvent.click(dinnerCheckbox);
    expect(optionsTotal).toHaveTextContent("500");
});

describe("total price of goods and options", () => {
    test("total price starts with 0 and Updating total price when adding one product", async () => {
        render(<OrderPage />);

        const total = screen.getByText("총 가격:", { exact: false });
        expect(total).toHaveTextContent("0");

        const americaInput = await screen.findByRole("spinbutton", {
            name: "America",
        });
        userEvent.clear(americaInput);
        userEvent.type(americaInput, "1");

        expect(total).toHaveTextContent("1000");
    });

    test("Updating total price when adding one option", async () => {
        render(<OrderPage />);
        const total = screen.getByText("총 가격:", { exact: false });

        const insuranceCheckbox = await screen.findByRole("checkbox", {
            name: "Insurance",
        });
        userEvent.click(insuranceCheckbox);
        expect(total).toHaveTextContent("500");
    });

    test("Updating total price when removing option and product", async () => {
        render(<OrderPage />);
        const total = screen.getByText("총 가격:", { exact: false });

        const insuranceCheckbox = await screen.findByRole("checkbox", {
            name: "Insurance",
        });
        userEvent.click(insuranceCheckbox);

        const americaInput = await screen.findByRole("spinbutton", {
            name: "America",
        });
        userEvent.clear(americaInput);
        userEvent.type(americaInput, "3");

        userEvent.clear(americaInput);
        userEvent.type(americaInput, "1");

        expect(total).toHaveTextContent("1500");
    });
});
