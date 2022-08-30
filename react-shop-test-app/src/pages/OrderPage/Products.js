import React from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";

const Products = ({ name, imagePath, updateItemCount }) => {
    const handleChange = (event) => {
        const currentValue = event.target.value;
        updateItemCount(name, currentValue);
    };

    return (
        <Box>
            <Forms>
                <Label htmlFor={name}>{name}</Label>
                <Image src={`http://localhost:5000/${imagePath}`} alt={`${name} product`} />
                <Input
                    id={name}
                    type="number"
                    name="quantity"
                    min="0"
                    defaultValue={0}
                    onChange={handleChange}
                />
            </Forms>
        </Box>
    );
};

const Box = styled.div`
    text-align: center;
`;

const Forms = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

const Label = styled(Form.Label)`
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 15px;
`;

const Image = styled.img`
    width: 60%;
    border-radius: 30px;
    margin-bottom: 15px;
`;

const Input = styled(Form.Control)`
    width: 40%;
`;

export default Products;
