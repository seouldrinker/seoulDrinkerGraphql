import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ROOT_URL } from './config'

export default new ApolloClient({
  link: new HttpLink({uri: `${ROOT_URL}/graphql`}),
  cache: new InMemoryCache(),
  connectToDevTools: true
})
