import gql from 'graphql-tag'

export default {
  pubList: {
    query: gql`query PubList {
      pubList {
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
    //   // this.$store.commit('RETRIEVE_BEER_LIST', data.pubList)
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
  pubDetail: {
    query: gql`query PubDetail($pubId: String!) {
      pubDetail(pubId: $pubId) {
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
    variables () {
      if (this.$route && this.$route.params) {
        return {
          pubId: this.$route.params.id
        }
      }
      return {
        pubId: 1
      }
    },
    // update를 직접 치게되면 smart query는 동작하지만, 데이터 매핑이 자동으로 되지 않음.
    // update (data) {
    //   // this.$store.commit('RETRIEVE_BEER_DETAIL', data.pubDetail)
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
