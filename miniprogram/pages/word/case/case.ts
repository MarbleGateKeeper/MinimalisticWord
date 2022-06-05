import { IAppOption } from "../../../../typings";
import { WordDataSet } from "../../../utils/wordUtils";

// pages/word/case/case.ts
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
        // 单词集数据
        wordset: data.data,
        // 当前所背单词在单词集中的顺序
        serial: 0,
        // 带有错误答案的词组
        shuffled: new WordDataSet(data.data).roll(0,app.globalData.wordSetting.distractorSize)
      });
    })
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

  selectAnwser: function (e: WechatMiniprogram.BaseEvent) {
    // 按是否正确给按钮改变形态
    // TODO
  },

  nextWord: function (_e: WechatMiniprogram.BaseEvent) {
    // 非最后一词
    if((this.data as AnyObject).serial != (this.data as AnyObject).wordset.length - 1){
      const app: IAppOption = getApp();
      this.setData({
        // 单词集数据
        wordset: (this.data as AnyObject).wordset,
        // 当前所背单词在单词集中的顺序
        serial: (this.data as AnyObject).serial + 1,
        // 带有错误答案的词组
        shuffled: new WordDataSet((this.data as AnyObject).wordset).roll((this.data as AnyObject).serial + 1,app.globalData.wordSetting.distractorSize)
      });
    } 
    //最后一词
    else {
      // TODO
    }
    
      

  }
})