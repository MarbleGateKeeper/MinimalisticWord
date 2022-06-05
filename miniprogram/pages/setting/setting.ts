import { IAppOption } from "../../../typings";
import { WordSetting } from "../../utils/settingUtils";

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
    let setting = app.globalData.wordSetting;
    this.setData(setting);
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

  distractorSizeChange: function(e: WechatMiniprogram.SliderChange){
    const app: IAppOption = getApp();
    const setting = app.globalData.wordSetting;
    const newSetting: WordSetting = {
      "wordSetSize": setting.wordSetSize,
      "distractorSize": e.detail.value
    };
    this.setData(newSetting)
    app.globalData.wordSetting = newSetting;
  },

  wordSetSizeChange: function(e: WechatMiniprogram.SliderChange){
    const app: IAppOption = getApp();
    const setting = app.globalData.wordSetting;
    const newSetting: WordSetting = {
      "wordSetSize": e.detail.value,
      "distractorSize": setting.distractorSize
    };
    this.setData(newSetting)
    app.globalData.wordSetting = newSetting;
  }
})