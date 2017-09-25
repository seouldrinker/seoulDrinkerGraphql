import axios from 'axios'
import { API_KEY } from '../../config'

/**
  NOTE: 전체 경로 조회 (한꺼번에)
**/
export async function getAllWalkCourse(session, next) {
  if (!session.getAllWalkCourse) {
    session.getAllWalkCourse = await _makeCollectedWalkCourse(next)
  }
  return session.getAllWalkCourse
}

async function _makeCollectedWalkCourse(next) {
  let tempWalkAllCourse = {}
  let newWalkAllCourse = []
  const walkAllCourse = await _collectWalkAllCourse(next)

  for (var i=0; i<walkAllCourse.length; i++ ) {
    if (!tempWalkAllCourse[walkAllCourse[i].COURSE_NAME]) {
      tempWalkAllCourse[walkAllCourse[i].COURSE_NAME] = []
    }
    tempWalkAllCourse[walkAllCourse[i].COURSE_NAME].push(walkAllCourse[i])
  }

  for (const name in tempWalkAllCourse) {
    newWalkAllCourse.push({
      name,
      contents: tempWalkAllCourse[name]
    })
  }
  return newWalkAllCourse
}

async function _collectWalkAllCourse(next) {
  let results = []
  let roads = await _queryAllWalkCourse(1, 1000, next)
  const course = roads.data.SeoulGilWalkCourse
  const totalPageCount = Math.ceil(course.list_total_count/1000)
  results = results.concat(course.row)

  for (let i=2; i<=totalPageCount; i++) {
    const endCount = i * 1000
    const startCount = endCount - 1000 + 1
    roads = await _queryAllWalkCourse(startCount, endCount, next)
    results = results.concat(roads.data.SeoulGilWalkCourse.row)
  }
  // console.log(results.length)
  return results
}

function _queryAllWalkCourse(startCount, endCount, next) {
  return _getWalkCourse(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/SeoulGilWalkCourse/${startCount}/${endCount}`, next)
}


/**
  NOTE: 특정 경로 조회
**/
export async function getOneWalkCourse(id, next) {
  const roads = await _queryOneWalkCourse(id, next)
  return roads.data.SeoulGilWalkCourse.row
}

function _queryOneWalkCourse(id, next) {
  return _getWalkCourse(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/SeoulGilWalkCourse/1/1000/${id}`, next)
}


/**
  NOTE: 공통으로 코스에 대한 데이터를 가져옴
**/
async function _getWalkCourse(url, next) {
  const results = await axios.get(url)
  const course = results.data.SeoulGilWalkCourse
  let errDetail = null

  // Success
  if (course && course.RESULT.CODE === 'INFO-000' && course.list_total_count > 0) {
    return results
  } else if (results.data.RESULT.CODE === 'INFO-100') {
    errDetail = new Error('Invalid API KEY')
    errDetail.status = 403
  } else if (results.data.RESULT.CODE === 'INFO-200') {
    errDetail = new Error('Have no return value')
    errDetail.status = 406
  } else {
    errDetail = new Error('Server error')
    errDetail.status = 500
  }
  return next(errDetail)
}
