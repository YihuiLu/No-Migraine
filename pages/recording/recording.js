// pages/recording/recording.js
import {
  HTTP
} from '../../utils/http.js'


var now_time = new Date()
var t_s = now_time.getTime()
let http = new HTTP()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 评分 */
    pain_grade: 1,

    list: ['我在头痛后服用了药物', '我在头痛后得到了良好休息或去了医院'],
    selection_rs: [],

    /** 头痛时间选择 */
    start_time: '12:00',
    start_date: '2020-1-1',

    end_time: '12:00',
    end_date: '2020-1-1',
    /** 头痛时间选择 */

    guess: '',
    remarks: ''
  },


  /** 多选 */
  selectChange(event) {
    this.setData({
      selection_rs: event.detail
    });
  },

  rateChange(event) {
    this.setData({
      pain_grade: event.detail
    });
  },

  toggle(event) {
    const {
      index
    } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  noop() {},

  guessInput(e) {
    /** 推测诱因文本框 */
    this.setData({
      guess: e.detail.value
    })
  },

  remarksInput(e) {
    /** 补充说明文本框 */
    this.setData({
      remarks: e.detail.value
    })
  },
  /** 时间选择事件函数 */
  startTimeChange(e) {
    this.setData({
      start_time: e.detail.value,
      end_time: e.detail.value
    })
  },

  startDateChange(e) {
    this.setData({
      start_date: e.detail.value,
      end_date: e.detail.value
    })
  },

  endTimeChange(e) {
    this.setData({
      end_time: e.detail.value
    })
  },

  endDateChange(e) {
    this.setData({
      end_date: e.detail.value
    })
  },

  /** 时间选择事件函数 */


  submit(e) {
    let that = this;
    console.log(that.data)
    if (that.data.selection_rs.includes('我在头痛后服用了药物')) {
      var taking_medicine = 1
    } else {
      var taking_medicine = 0
    }
    if (that.data.selection_rs.includes('我在头痛后得到了良好休息或去了医院')) {
      var rest = 1
    } else {
      var rest = 0
    }
    wx.showLoading({title: '提交中…'})
    http.request({
      url: '/v1/record',
      method: 'POST',
      data: {
        "start_time": that.data.start_date + ' ' + that.data.start_time,
        "end_time": that.data.end_date + ' ' + that.data.end_time,
        "cause": that.data.guess,
        "remarks": that.data.remarks,
        "pain_grade": that.data.pain_grade,
        "taking_medicine": taking_medicine,
        "rest": rest
      },
      success: (res) => {
        that.setData({/** 恢复默认数据（学艺不精，只能用蠢方法） */
          selection_rs: [],
        })
        wx.hideLoading()
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success(){
            wx.switchTab({
              url: '../case/case'
            })
          }
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '提交失败了...检查网络再试一次吧～',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})