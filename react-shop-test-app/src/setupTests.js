// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mocks/server";
// 모든 테스트 시작 전에 서버 시작
beforeAll(() => server.listen());
// 하나하나의 테스트 이후에 핸들러 리셋하여 다른 테스트에 독립적으로 만듦
afterEach(() => server.resetHandlers());
// 테스트가 끝나면 서버 종료
afterAll(() => server.close());
