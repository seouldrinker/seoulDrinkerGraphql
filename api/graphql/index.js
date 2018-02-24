import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

// Put together a schema
export default makeExecutableSchema({
  typeDefs,
  resolvers,
})