import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import ErrorBanner from "../../components/ErrorBanner";
import { OrderContext } from "../../contexts/OrderContext";
import Button from "react-bootstrap/Button";

const CompletePage = ({ setStep }) => {
    const [OrderDatas, , resetOrderDatas] = useContext(OrderContext);
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        orderCompleted(OrderDatas);
    }, []);

    const orderCompleted = async (OrderDatas) => {
        try {
            const response = await axios.post("http://localhost:5000/order", OrderDatas);
            setOrderHistory(response.data);
            setLoading(false);
        } catch (error) {
            setError(true);
        }
    };

    if (error) {
        return <ErrorBanner message="에러가 발생했습니다." />;
    }

    const orderTable = orderHistory.map((item) => (
        <tr key={item.orderNumber}>
            <td>{item.orderNumber}</td>
            <td>{item.price}</td>
        </tr>
    ));

    const handleClick = () => {
        resetOrderDatas();
        setStep(0);
    };

    if (loading) {
        return <div>loading</div>;
    } else {
        return (
            <Wrapper>
                <SuccessGuide>상품 구입에 성공했습니다.</SuccessGuide>
                <ListGuide>구매 목록</ListGuide>
                <Table>
                    <tbody>
                        <tr>
                            <th>주문 번호</th>
                            <th>주문 가격</th>
                        </tr>
                        {orderTable}
                    </tbody>
                </Table>
                <Button className="mt-3" onClick={handleClick}>
                    첫페이지로
                </Button>
            </Wrapper>
        );
    }
};

const Wrapper = styled.div`
    margin-top: 150px;
    text-align: center;
`;

const SuccessGuide = styled.h2`
    font-weight: 600;
    margin-bottom: 40px;
`;

const ListGuide = styled.h3`
    font-weight: 600;
`;

const Table = styled.table`
    margin: auto;
`;

export default CompletePage;
