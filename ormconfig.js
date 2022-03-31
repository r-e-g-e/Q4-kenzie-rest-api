const host = process.env.NODE_ENV === "docker" ?
"postgres" :
"localhost"

const config = {
  host,
  type: "postgres",
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    "./src/entities/**/**.ts"
  ],
  migrations: [
    "./migrations/**/**.ts"
  ],
  cli: {
    entitiesDir: "./src/entities",
    migrationsDir: "./migrations",
  }
}

module.exports = config