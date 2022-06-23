import { IAppOption } from "../typings"
import { standardColorScheme } from "./utils/settingUtils"

// app.ts
App<IAppOption>({
  globalData: {
    wordSetting: {
      wordSetSize: 10,
      distractorSize: 3
    },
    colorScheme: standardColorScheme,
    learnMode: true
  },
  
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 初始化云服务
    wx.cloud.init()

    // 登录
    wx.login({ 
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })

    // 加载字体
    wx.loadFontFace({
      family:'zpix',
      source:'https://github.com/SolidZORO/zpix-pixel-font/releases/download/v3.1.6/zpix.ttf'
    }).then(res=>console.log(res.status))
  },
})