// pages/menu/select.ts

import { IAppOption } from "../../../typings";
import { createWordDataSet, wordBookMap } from "../../utils/wordUtils";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // Load word collection.
    this.loadWordCollection();
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

  loadWordCollection: function () {
    this.setData({
      loading: false,
      collection: wordBookMap
    });
  },

  selectWordCollection: function (e: WechatMiniprogram.BaseEvent) {
    const selected: string = e.currentTarget.dataset.wordBookName;
    // 创建单词集
    const app: IAppOption = getApp();
    createWordDataSet(selected, app.globalData.wordSetting.wordSetSize).then(dataRes => {
      // 跳转到背单词页面
      wx.navigateTo({
        url: "./case/case",
        // 发送数据到背单词页面
        success: function(navRes){
          navRes.eventChannel.emit('acceptDataFromOpenerPage', dataRes)
        }
      })
    });
  }
})