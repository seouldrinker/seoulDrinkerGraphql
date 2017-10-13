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
        cb(null, 'images/feeds/')
      },
      filename: function (req, file, cb) {
        const currentDate = new Date()
        cb(null, file.fieldname + '_' + currentDate.getTime()
          + '.' + file.mimetype.split('/')[1])
      }
    })
  }).fields([
    { name: 'feedImage', maxCount: 1 }
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
