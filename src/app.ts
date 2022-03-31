import "reflect-metadata"
import express from "express"
import routes from "./routes"
import connectDatabase from "./database"

const app = express()

connectDatabase()

app.use(express.json())
app.use(routes)

export { app }