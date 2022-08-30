import { useState, useContext } from "react";
import styled from "styled-components";
import { OrderContext } from "../../contexts/OrderContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SummaryPage = ({ setStep }) => {
    const [orderDatas] = useContext(OrderContext);
    const [checked, setChecked] = useState(false);

    const productArray = Array.from(orderDatas.products);
    const productList = productArray.map(([key, value]) => (
        <li key={key}>
            {key} x {value}
        </li>
    ));

    const hasOptions = orderDatas.options.size > 0;
    let optionsRender = null;
    if (hasOptions) {
        const optionsArray = Array.from(orderDatas.options.keys());
        const optionList = optionsArray.map((key) => <li key={key}>{key}</li>);
        optionsRender = (
            <>
                <PartPrice>옵션: {orderDatas.totals.options}</PartPrice>
                <ul>{optionList}</ul>
            </>
        );
    }

    const handleSubmit = () => {
        setStep(2);
    };

    return (
        <div>
            <Title className="mb-4">주문 확인</Title>
            <PartPrice>여행 상품: {orderDatas.totals.products}</PartPrice>
            <ul>{productList}</ul>
            {optionsRender}
            <Forms>
                <Checkbox
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    id="confirm-checkbox"
                />
                <Form.Label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</Form.Label>
            </Forms>
            <Button disabled={!checked} type="submit" onClick={() => handleSubmit()}>
                주문 확인
            </Button>
        </div>
    );
};

const Title = styled.h1`
    font-weight: 600;
`;

const PartPrice = styled.h2`
    font-weight: 600;
    margin-bottom: 20px;
`;

const Forms = styled(Form)`
    display: flex;
    margin: 20px 0;
`;

const Checkbox = styled(Form.Check)`
    margin-right: 10px;
`;

export default SummaryPage;
