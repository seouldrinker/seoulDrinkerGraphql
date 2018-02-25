import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

import User from '../models/user'
import Brewery from '../models/brewery'
import Feed from '../models/feed'
import Beer from '../models/beer'
import Pub from '../models/pub'

import { deleteFeed, getFeedList, getPubFeedList, getBeerFeedList } from '../modules/feed'
import { getBeerDetail, getBeerList, getBeerRankList } from '../modules/beer'
import { getPubDetail, getPubList, getPubRankList } from '../modules/pub'
import { getNewsList } from '../modules/news'
import { addUser, getUserDetail } from '../modules/user'

const resolvers = {
  Query: {
    // [news]
    newsList: () => getNewsList(),
    // [beer]
    beerDetail: (root, {beerId}) => getBeerDetail(beerId),
    beerList: (root, {keyword}) => getBeerList(keyword),
    beerRankList: () => getBeerRankList(),
    // [pub]
    pubDetail: (root, {pubId}) => getPubDetail(pubId),
    pubList: (root, {keyword}) => getPubList(keyword),
    pubRankList: () => getPubRankList(),
    // [feed]
    feedList: (root, {type, page, count}) => getFeedList(type, page, count),
    feedPubList: (root, {pubId, type, page, count}) => getPubFeedList(pubId, type, page, count),
    feedBeerList: (root, {beerId, type, page, count}) => getBeerFeedList(beerId, type, page, count),
    // [user]
    userDetail: (root, {userId}) => getUserDetail(userId),
  },
  Mutation: {
    addUser: (root, args) => addUser(args),
    deleteFeed: (root, {feedId}) => deleteFeed(feedId)
  },
  User: {
    _feeds: user => Feed.find({is_ok: 1, user})
  },
  Pub: {
    brewery: pub => Brewery.findOne({is_ok: 1, _id: pub.brewery}),
    _feedList: pub => Feed.find({is_ok: 1, pub: pub})
  },
  Beer: {
    brewery: beer => Brewery.findOne({is_ok: 1, _id: beer.brewery}),
    _feedList: beer => Feed.find({is_ok: 1, beers: beer})
  },
  Feed: {
    beers: feed => Beer.find({is_ok: 1, _id: { $in: feed.beers }}),
    pub: feed => Pub.findOne({is_ok: 1, _id: feed.pub}),
    user: feed => User.findOne({is_ok: 1, _id: feed.user})
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string format
      }
      return null
    }
  })
}

export default resolvers