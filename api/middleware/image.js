import multer from 'multer'

/**
  NOTE: 이미지 업로드
**/
export function imageUpload (req, res, next) {
  let mapCounter = 0
  let imageCounter = 0

  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'feeds/')
      },
      filename: function (req, file, cb) {
        const currentDate = new Date()
        cb(null, file.fieldname
          + (file.fieldname === 'map' ? mapCounter++ : imageCounter++) + '_'
          + currentDate.getFullYear()
          + (currentDate.getMonth() < 10 ? '0' : '') + currentDate.getMonth()
          + (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate()
          + (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours()
          + (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes()
          + (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds()
          + '.' + file.mimetype.split('/')[1])
      }
    })
  }).fields([
    { name: 'map', maxCount: 1 },
    { name: 'photo', maxCount: 100 }
  ])

  upload(req, res, function (err) {
    if (!err) {
      return next()
    }
    let errDetail = new Error('Image save failure.')
    errDetail.status = 500
    return next(errDetail)
  })
}
