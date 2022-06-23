import { IAppOption } from "../../../../typings";

// pages/word/learn/learn.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    // 监听 acceptDataFromOpenerPage 事件，获取上一页面通过 eventChannel 传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      const app: IAppOption = getApp();
      this.setData({
        // 配色表
        color: app.globalData.colorScheme,
        // 单词集数据
        wordset: data,
        // 当前所背单词在单词集中的顺序
        serial: 0,
      });
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

  nextWord: function (_e: WechatMiniprogram.BaseEvent) {
    // 非最后一词逻辑
    if ((this.data as AnyObject).serial != (this.data as AnyObject).wordset.length - 1) {
      const currentData = this.data as AnyObject;
      this.setData({
        // 原地 tp 配色表
        color: currentData.color,
        // 原地 tp 单词集数据
        wordset: currentData.wordset,
        // 序号指向下一词
        serial: currentData.serial + 1,
      });
    }
    // 最后一词逻辑
    else {
      // 判断页面层数，因为有两个路径可以进入该页面
      const pageNum = getCurrentPages().length;
      wx.navigateBack({
        delta: (1-pageNum) * -1
      });
    }
  }
})