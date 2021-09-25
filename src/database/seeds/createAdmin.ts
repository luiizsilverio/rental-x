import { createConnection } from 'typeorm'
import { v4 as uuid } from "uuid"
import { hash } from "bcrypt"

async function create() {

  const connection = await createConnection()
  const id = uuid()
  const password = await hash("admin", 8)

  await connection.query(`
    INSERT INTO USERS (id, name, email, cnh, password, "isAdmin")
    VALUES('${id}', 'admin', 'admin@rentx.com.br', '123456', '${password}', true)
  `)

  await connection.close;
}

create().then(() => console.log("User admin created"))

