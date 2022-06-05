// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  const type = event.type
  const size = event.size

  const datas = await db.collection(type)
  .aggregate()
  .sample({
    size: size
  })
  .end()

  console.log(datas)

  if(datas.errMsg=="collection.aggregate:ok"){
    return {
      wordset: datas.list
    }
  }
  else{
    return {
      wordset: undefined
    }
  }
}