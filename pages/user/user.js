// pages/user.js

import {
  HTTP
} from '../../utils/http.js'

const app = getApp()
let http = new HTTP()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: true
  },

  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },

  getUserInfo: function (e) {
    e.detail.session_key = wx.getStorageSync('login_data').session_key
    http.request({
      url: '/v1/user/submit/info',
      method: 'POST',
      data: e.detail,
      success: (res) => {
        console.log(res)
      }
    })
    app.globalData.userInfo = e.detail.userInfo

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },

  clickTabBarSubmit: function () {
    wx.navigateTo({
      url: '../recording/recording'
    })
  },
  clickTabBarCase: function () {
    wx.redirectTo({
      url: '../case/case'
    })
  },

  clickLore: function () {
    wx.showToast({
      title: "正在努力开发中...",
      icon: 'none',
      image: '',
      duration: 2000,
      mask: false,
      success: (result) => {}
    });
  },

  clickJoin: function () {
    wx.navigateTo({
      url: 'join/join'
    })
  },

  clickAbout: function() {
    wx.navigateTo({
      url: 'about/about'
    })
  },

  clickUserInfo: function() {
    wx.navigateTo({
      url: 'user_info/user_info'
    })
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
    this.setData({
      show: true
    })
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
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

  },


})