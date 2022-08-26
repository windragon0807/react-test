import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// 모의 서버 생성
export const server = setupServer(...handlers);
