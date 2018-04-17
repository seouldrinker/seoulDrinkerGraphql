import gql from 'graphql-tag'

export default {
  newsList: {
    query: gql`query NewsList {
      newsList {
        _id
        context
        image
        is_ok
        udt_dt
      }
    }`,
    // update를 직접 치게되면 smart query는 동작하지만, 데이터 매핑이 자동으로 되지 않음.
    // update (data) {
    //   // this.$store.commit('RETRIEVE_NEWS_LIST', data.newsList)
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
