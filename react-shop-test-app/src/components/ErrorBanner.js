import styled from "styled-components";

const ErrorBanner = ({ message }) => {
    const errorMessage = message || "에러입니다.";

    return <ErrorBox data-testid="error-banner">{errorMessage}</ErrorBox>;
};

const ErrorBox = styled.div`
    background-color: red;
    color: white;
`;

export default ErrorBanner;
