import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

import User from '../models/user'
import Brewery from '../models/brewery'
import Feed from '../models/feed'
import Beer from '../models/beer'
import Pub from '../models/pub'
import News from '../models/news'

import { getBeerDetail, getBeerList, getBeerRankList } from '../modules/beer'
import { getNewsList } from '../modules/news'

const resolvers = {
  Query: {
    newsList: () => getNewsList(),
    beerDetail: (root, {beerId}) => getBeerDetail(beerId),
    beerList: (root, {keyword}) => getBeerList(keyword),
    beerRankList: () => getBeerRankList(),

    // Mutation: {
    //   addChannel: (root, args) => {
    //     const newChannel = { id: nextId++, name: args.name }
    //     channels.push(newChannel)
    //     return newChannel
    //   },
    // }
  },
  Beer: {
    brewery: (beer) => {
      return Brewery.findOne({is_ok: 1, _id: beer.brewery})
    },
    _feedList: (beer) => {
      return Feed.find({is_ok: 1, beers: {
          $in: [beer._id]
        }}).exec((err, feed) => {
        if (err) {
          return null
        }
        return feed
      })
    }
  },
  Feed: {
    beers: feed => {
      return Beer.find({is_ok: 1, _id: {
          $in: feed.beers
        }}).exec((err, beers) => {
        if (err) {
          return null
        }
        return beers
      })
    },
    pub: feed => {
      return Pub.findOne({is_ok: 1, _id: feed.pub})
    },
    user: feed => {
      return User.findOne({is_ok: 1, _id: feed.user})
    }
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