import { IAppOption } from "../typings"

// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

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