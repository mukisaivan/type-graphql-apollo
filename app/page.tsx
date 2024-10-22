"use client"

import { ApolloProvider } from "@apollo/client"
import client from "../lib/apollo"

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div></div>
    </ApolloProvider>
  )
}
