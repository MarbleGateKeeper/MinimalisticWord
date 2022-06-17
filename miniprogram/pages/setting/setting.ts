import { IAppOption } from "../../../typings";
import { ColorScheme, nightColorScheme, standardColorScheme, WordSetting } from "../../utils/settingUtils";

// pages/setting/setting.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let app: IAppOption = getApp();
    this.setData({
      common: app.globalData.wordSetting,
      color: app.globalData.colorScheme,
      nightmode: app.globalData.colorScheme == nightColorScheme
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  colorSchemeChange: function(e: WechatMiniprogram.SwitchChange){
    const app: IAppOption = getApp();
    const currentData = this.data as AnyObject;
    const nv = e.detail.value;
    let newColorScheme: ColorScheme;
    if(nv) newColorScheme = nightColorScheme;
    else newColorScheme = standardColorScheme;
    this.setData({
      common: currentData.common,
      color: newColorScheme, 
      nightmode: nv
    })
    app.globalData.colorScheme = newColorScheme;
  },

  distractorSizeChange: function(e: WechatMiniprogram.SliderChange){
    const app: IAppOption = getApp();
    const setting = app.globalData.wordSetting;
    const currentData = this.data as AnyObject;
    const newSetting: WordSetting = {
      wordSetSize: setting.wordSetSize,
      distractorSize: e.detail.value
    };
    this.setData({
      common: newSetting,
      color: currentData.color, 
      nightmode: currentData.nightmode
    })
    app.globalData.wordSetting = newSetting;
  },

  wordSetSizeChange: function(e: WechatMiniprogram.SliderChange){
    const app: IAppOption = getApp();
    const setting = app.globalData.wordSetting;
    const currentData = this.data as AnyObject;
    const newSetting: WordSetting = {
      wordSetSize: e.detail.value,
      distractorSize: setting.distractorSize
    };
    this.setData({
      common: newSetting,
      color: currentData.color,
      nightmode: currentData.nightmode
    })
    app.globalData.wordSetting = newSetting;
  }
})