import gql from 'graphql-tag'

export default {
  feedList: {
    query: gql`query FeedList($type: String) {
      feedList(type: $type) {
        _id
        beers {
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
        pub {
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
        user {
          name
          picture
        }
        image
        context
        udt_dt
      }
    }`,
    variables: {
      type: 'all'
    },
    // update를 직접 치게되면 smart query는 동작하지만, 데이터 매핑이 자동으로 되지 않음.
    // update (data) {
    //   // this.$store.commit('RETRIEVE_FEED_LIST', data.feedList)
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
  }
}
