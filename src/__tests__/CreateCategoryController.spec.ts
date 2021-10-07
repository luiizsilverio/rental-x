import 'reflect-metadata'
import request from "supertest"
import { app } from "../app"

describe("Create Category Controller", () => {

  it("should be able to create a new category", async () => {
    const tokenResp = await request(app)
      .post("/sessions")
      .send({
        email: "admin@rentx.com.br",
        password: "admin"
      })

    const { refresh_token } = tokenResp.body

    const response = await request(app)
      .post("/categories")
      .send({
        name: "test",
        description: "test"
      }).set({
        Authorization: `Bearer ${refresh_token}`
      })

      expect(response.status).toBe(201)
  })
})