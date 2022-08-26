import { rest } from "msw";

export const handlers = [
    rest.get("http://localhost:5000/products", (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: "America",
                    imagePath: "/images/america.jpeg",
                },
                {
                    name: "England",
                    imagePath: "/images/england.jpeg",
                },
            ])
        );
    }),
    rest.get("http://localhost:5000/options", (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: "Insurance",
                },
                {
                    name: "Dinner",
                },
            ])
        );
    }),
    rest.post("http://localhost:5000/order", (req, res, ctx) => {
        let dummyData = [{ orderNumber: 2131234324, price: 2000 }];
        return res(ctx.json(dummyData));
    }),
];

/*
  Mock Service Worker(MSW)
    Backend에서 데이터를 가져오는 부분을 테스트하기 위해서는 실제로 서버에 호출하는
    end-to-end 테스트를 할 수 있지만,
    여기서는 서버에 요청을 보낼 때, 그 요청을 가로채서 Mock Service Worker라는 것으로
    요청을 처리하고 모의 응답(mocked response)을 보낸다.

  MSW 작동 방식
    브라우저에 서비스 워커를 등록하여 외부로 나가는 네트워크 요청을 감지한다.
    그리고 그 요청을 실제 서버로 갈 때 중간에 가로채서 MSW 클라이언트 사이드 라이브러리로 보낸다.
    그 후 등록된 핸들러에서 요청을 처리한 후, 모의 응답을 브라우저로 보낸다.
*/
