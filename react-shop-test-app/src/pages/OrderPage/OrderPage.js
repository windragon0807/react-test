import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import Type from "./Type";
import styled from "styled-components";
import Button from "react-bootstrap/Button";

const OrderPage = ({ setStep }) => {
    const [orderDatas] = useContext(OrderContext);

    return (
        <div>
            <Title>여행 상품</Title>
            <div>
                <Type orderType="products" />
            </div>
            <Row>
                <OptionBox>
                    <Type orderType="options" />
                </OptionBox>
                <PriceBox>
                    <Price>총 가격: {orderDatas.totals.total}</Price>
                    <br />
                    <Button onClick={() => setStep(1)}>주문하기</Button>
                </PriceBox>
            </Row>
        </div>
    );
};

const Title = styled.h1`
    text-align: center;
    font-weight: 600;
`;

const Row = styled.div`
    display: flex;
    margin-top: 20px;
`;

const OptionBox = styled.div`
    width: 50%;
`;

const PriceBox = styled.div`
    margin-top: 40px;
`;

const Price = styled.h2`
    font-weight: 600;
`;

export default OrderPage;
