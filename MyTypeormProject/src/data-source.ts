import "reflect-metadata"
import { DataSource } from "typeorm"
import { users } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 3000,
    username: "lorenzodandasan",
    password: "password",
    database: "api",
    synchronize: true,
    logging: false,
    entities: [users],
    migrations: [],
    subscribers: [],
})
