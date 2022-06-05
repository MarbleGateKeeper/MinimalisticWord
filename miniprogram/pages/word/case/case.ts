import { IAppOption } from "../../../../typings";
import { ShuffledWordData, WordDataSet } from "../../../utils/wordUtils";

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
      console.log('initializing')
      this.setData({
        // 单词集数据
        wordset: data.data,
        // 当前所背单词在单词集中的顺序
        serial: 0,
        // 带有错误答案的词组
        shuffled: new WordDataSet(data.data).roll(0, app.globalData.wordSetting.distractorSize),
        // 选项记录
        selectionCase: new SelectionCase(data.data.length),
        // 记录当前点选选项
        currentlySelected: -1,
        // 提示词，直接扔到 data 里好了
        hint: '请选择正确的含义'
      });
      console.log('initializing2')
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

  selectAnwser: function (e: WechatMiniprogram.BaseEvent) {
    const selected: number = e.currentTarget.dataset.buttomSerial;
    const currentData = this.data as AnyObject;
    // 只有第一次选择才会造成变化
    if(currentData.currentlySelected==-1){
      function isCorrect(a: number): boolean{
        return a == (currentData.shuffled as ShuffledWordData).correctAnswerPosition;
      };
      let newHint = "答案正确";
      if(!isCorrect(selected)){
        newHint = "回答错误！该单词的意思是\n" + (currentData.shuffled as ShuffledWordData).anwserCollection[(currentData.shuffled as ShuffledWordData).correctAnswerPosition]
      }
      this.setData({
        wordset: currentData.wordset,
        serial: currentData.serial,
        shuffled: currentData.shuffled,
        selectionCase: (currentData.selectionCase as SelectionCase).set(currentData.serial,isCorrect(selected)),
        // 记录当前点选选项
        currentlySelected: selected,
        hint: newHint
      });
    }
  },

  nextWord: function (_e: WechatMiniprogram.BaseEvent) {
    // 非最后一词
    if ((this.data as AnyObject).serial != (this.data as AnyObject).wordset.length - 1) {
      const app: IAppOption = getApp();
      const currentData = this.data as AnyObject;
      this.setData({
        // 原地 tp 单词集数据
        wordset: currentData.wordset,
        // 序号指向下一词
        serial: currentData.serial + 1,
        // 重新 Roll 一个带有固定数量的随机错误解释的单词数据
        shuffled: new WordDataSet(currentData.wordset).roll(currentData.serial + 1, app.globalData.wordSetting.distractorSize),
        // 更新选项记录
        selectionCase: currentData.selectionCase,
        // 重置当前点选选项
        currentlySelected: -1,
        // 重置提示词
        hint: '请选择正确的含义'
      });
    }
    //最后一词
    else {
      wx.navigateBack();
    }
  }
})


interface Selection {
  serial: number,
  correctness?: boolean
}

// 保存已选择的选项
class SelectionCase {
  public data: Selection[];
  constructor(size: number) {
    this.data = []
    let a = 0;
    while (a < size) {
      this.data.push({
        serial: a
      });
      a++;
    }
  }

  set(serial: number, correct: boolean): SelectionCase {
    this.data[serial].correctness = correct;
    return this;
  }
}