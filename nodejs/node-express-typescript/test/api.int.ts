import request from "supertest";
const r = request("http://localhost:3000");

describe.skip("GET /book", () => {
    it.skip("should return 200 OK", async () => {
        const response = await r.get("/book")
            .set({"accept": "application/json"})
            .expect(200);
        console.log(response);
    });
});