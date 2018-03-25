import { expect } from 'chai'
import axios from 'axios'

it('Main page content', (done) => {
  axios.get('http://127.0.0.1:3000').then((response) => {
    expect(response.data.split('<body>')[1].split('</body>')[0].trim())
      .to.equal('Seoul Drinker GraphQL')
    done()
  }).catch(err => {
    done(err)
  })
})
