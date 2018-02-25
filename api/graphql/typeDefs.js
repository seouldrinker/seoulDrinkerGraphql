const typeDefs = `
  scalar Date
    
  type User {
    _id: String!
    name: String
    email: String
    platform: String
    picture: String
    _feeds: [Feed]
    is_ok: Int!
    crt_dt: Date!
    udt_dt: Date!
  }
  
  type Badge {
    _id: String!
    user: User
    name: String
    context: String
    image: String
    is_ok: Int!
    crt_dt: Date!
    udt_dt: Date!
  }
  
  type Feed {
    _id: String!
    beers: [Beer]
    pub: Pub
    user: User!
    image: String
    context: String
    is_ok: Int!
    crt_dt: Date!
    udt_dt: Date!
  }
  
  type Brewery {
    _id: String!
    kor_name: String
    eng_name: String
    about: String
    est: String
    location: String
    phone: String
    homepage: String
    logo_image: String
    brand_image: String
    instagram: String
    facebook: String
    is_ok: Int!
    crt_dt: Date!
    udt_dt: Date!
  }
  
  type Pub {
    _id: String!
    brewery: Brewery
    kor_name: String
    eng_name: String
    location: String
    phone: String
    _feedList: [Feed]
    _feedCount: Int!
    is_ok: Int!
    crt_dt: Date!
    udt_dt: Date!
  }
  
  type Beer {
    _id: String!
    brewery: Brewery
    kor_name: String
    eng_name: String
    image: String
    abv: String
    feature: String
    style: String
    release: String
    _feedList: [Feed]
    _feedCount: Int!
    is_ok: Int!
    crt_dt: Date!
    udt_dt: Date!
  }
  
  type News {
    _id: String!
    context: String
    image: String
    is_ok: Int!
    crt_dt: Date!
    udt_dt: Date!
  }
  
  type Query {
    newsList: [News],
    beerList(keyword: String): [Beer]
    beerRankList: [Beer]
    beerDetail(beerId: String!): Beer
    pubList(keyword: String): [Pub]
    pubRankList: [Pub]
    pubDetail(pubId: String!): Pub
    feedList(
      type: String
      page: Int
      count: Int
    ): [Feed]
    feedPubList(
      pubId: String!
      type: String
      page: Int
      count: Int
     ): [Feed]
    feedBeerList(
      beerId: String!
      type: String
      page: Int
      count: Int
     ): [Feed]
    userDetail(userId: String!): User
  }
  
  type Mutation {
    addUser(
      id: String
      platform: String
      access_token: String
      email: String
      name: String
      picture: String
    ): User
    deleteFeed(feedId: String!): Feed
  }
`

// user put
// feed add, put

export default typeDefs