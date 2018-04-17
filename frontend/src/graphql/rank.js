import gql from 'graphql-tag'

export default {
  pubRankList: {
    query: gql`query PubRankList {
      pubRankList {
        _id
        brewery {
          kor_name
          eng_name
          about
          est
          location
          phone
          homepage
          logo_image
          brand_image
          instagram
          facebook
          udt_dt
        }
        kor_name
        eng_name
        location
        phone
      }
    }`,
    // update를 직접 치게되면 smart query는 동작하지만, 데이터 매핑이 자동으로 되지 않음.
    // update (data) {
    //   // this.$store.commit('RETRIEVE_BEER_LIST', data.beerList)
    //   console.log(data)
    // },
    // Optional result hook
    result ({ data, loader, networkStatus }) {
      console.log('We got some result!')
    },
    // Error handling
    error (error) {
      console.error('We\'ve got an error!', error)
    },
    loadingKey: 'loading'
  },
  beerRankList: {
    query: gql`query BeerRankList {
      beerRankList {
        _id
        brewery {
          kor_name
          eng_name
          about
          est
          location
          phone
          homepage
          logo_image
          brand_image
          instagram
          facebook
          udt_dt
        }
        kor_name
        eng_name
        image
        abv
        feature
        style
        release
        udt_dt
      }
    }`,
    // update를 직접 치게되면 smart query는 동작하지만, 데이터 매핑이 자동으로 되지 않음.
    // update (data) {
    //   // this.$store.commit('RETRIEVE_BEER_DETAIL', data.beerDetail)
    //   console.log(data)
    // },
    // Optional result hook
    result ({data, loader, networkStatus}) {
      console.log('We got some result!')
    },
    // Error handling
    error (error) {
      console.error('We\'ve got an error!', error)
    },
    loadingKey: 'loading'
  }
}
