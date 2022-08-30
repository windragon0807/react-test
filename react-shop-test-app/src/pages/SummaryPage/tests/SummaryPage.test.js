import SummaryPage from "../SummaryPage";
import { render, screen } from "../../../test-utils";

// 체크박스가 체크되지 않으면 버튼 비활성화
test("checkbox and button", () => {
    render(<SummaryPage />);
    const checkbox = screen.getByRole("checkbox", {
        name: "주문하려는 것을 확인하셨나요?",
    });
    expect(checkbox.checked).toEqual(false);

    const confirmButton = screen.getByRole("button", { name: "주문 확인" });
    expect(confirmButton.disabled).toBeTruthy();
});
