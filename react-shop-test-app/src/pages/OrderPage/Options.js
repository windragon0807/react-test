import Form from "react-bootstrap/Form";
import styled from "styled-components";

const Options = ({ name, updateItemCount }) => {
    return (
        <Forms>
            <Checkbox
                type="checkbox"
                id={`${name} option`}
                onChange={(event) => {
                    updateItemCount(name, event.target.checked ? 1 : 0);
                }}
            />{" "}
            <Form.Label htmlFor={`${name} option`}>{name}</Form.Label>
        </Forms>
    );
};

const Forms = styled.form`
    display: flex;
`;

const Checkbox = styled(Form.Check)`
    width: 20px;
    margin-right: 10px;
`;

export default Options;
