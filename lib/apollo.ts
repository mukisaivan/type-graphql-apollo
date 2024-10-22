import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: "abackend/index",
  cache: new InMemoryCache(),
})

export default client
