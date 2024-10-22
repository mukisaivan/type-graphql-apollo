import { ApolloServer } from "apollo-server-express"
import express from "express"
import { startStandaloneServer } from "@apollo/server/standalone"

import { ItemResolver } from "./resolvers/ItemResolver"
import { buildSchema } from "type-graphql"

const main = async () => {
  const app = express()

  // app.get("/", (req, res) => {
  //   res.send("messaage")
  // })

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ItemResolver],
      validate: false,
    }),
  })

  server.applyMiddleware({ app: app as any })
  // const { url } = await startStandaloneServer(server)

  app.listen(4000, () => {
    console.log("server started")
  })

  // console.log(`🚀 Server ready at ${url}`)
}

main().catch((e) => {
  console.log(e)
})
