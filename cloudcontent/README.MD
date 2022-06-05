# 该目录下所有内容都将托管到微信云开发
## 数据库
所有文件均在 `./database` 下，且以文件名为 collection 名上传

## 云函数
### `getWordSet`
用于获取指定大小的随机单词集，要求参数为
```
{
  "type":string,
  "size":number
}
```
可选 `type` 类型包括："cet4":四级单词,"cet6":六级单词,"tem4": 专四单词,"tem8": 专八单词, "npee":考研单词,"tofel":托福单词,"oelts":雅思单词,"sat":SAT单词,"gre":GRE单词,"gmat":GMAT单词  

返回内容示例：
```
{
  wordset:[
    {
      "content": string,
      "meaning": string
      }
  ]
}

// 当参数不符合要求时
{
  wordset:undefined
}
```