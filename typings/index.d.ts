/// <reference path="./types/index.d.ts" />

import { WordDataSet } from "../miniprogram/utils/datautils";

interface IAppOption {
  // 我是实在没想到 typescript 我还得手动改这玩意儿...
  // See 客服回复 https://developers.weixin.qq.com/community/develop/doc/00066e9d234f806e791aeeea456c00
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    wordDataSet?: WordDataSet
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}