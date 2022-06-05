// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  const type = event.type
  const size = event.size

  const requestSize = function(a){
    if(a>20) return 20
    else return a
  }

  let ret = []

  while(ret.length<size){
    let datas = await db.collection(type)
    .aggregate()
    .sample({
      size: requestSize(size)
    })
    .end()

    if(datas.errMsg!="collection.aggregate:ok"){
      return {
        wordset: undefined
      }
    }

    for(var i of datas.list){
      if(ret.indexOf(i)==-1){
        ret.push(i)
      }
      if(ret.length==size){
        break
      }
    }
  }

  for(var i of ret){
    i.content = i._id
    delete i._id
  }

  return {
    wordset: ret
  }
}