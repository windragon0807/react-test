import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Products from "./Products";
import Options from "./Options";
import ErrorBanner from "../../components/ErrorBanner";
import { OrderContext } from "../../contexts/OrderContext";
import styled from "styled-components";

const Type = ({ orderType }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [orderDatas, updateItemCount] = useContext(OrderContext);

    useEffect(() => {
        loadItems(orderType);
    }, [orderType]);

    const loadItems = async (orderType) => {
        try {
            const response = await axios.get(`http://localhost:5000/${orderType}`);
            setItems(response.data);
        } catch (error) {
            setError(true);
        }
    };

    if (error) {
        return <ErrorBanner message="에러가 발생했습니다." />;
    }

    const ItemComponents = orderType === "products" ? Products : Options;

    const optionItems = items.map((item) => (
        <ItemComponents
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) =>
                updateItemCount(itemName, newItemCount, orderType)
            }
        />
    ));

    const orderTypeKorean = orderType === "products" ? "여행 상품" : "여행 옵션";

    return (
        <>
            <SubTitle className="mb-4">{orderTypeKorean} 종류</SubTitle>
            <p>
                {orderTypeKorean} 가격: {orderDatas.totals[orderType]}
            </p>
            <div
                style={{
                    display: "flex",
                    flexDirection: orderType === "options" && "column",
                }}
            >
                {optionItems}
            </div>
        </>
    );
};

const SubTitle = styled.h2`
    margin-top: 40px;
    font-weight: 600;
`;

export default Type;
