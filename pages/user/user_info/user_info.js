// pages/user/user_info/user_info.js

import {
  HTTP
} from '../../../utils/http.js'


let http = new HTTP();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hometown: ['北京市', '北京市', '东城区'],
    picker: ['汉族', '仫佬族', '黎族', '土家族', '蒙古族', '羌族', '僳僳族', '哈尼族', '回族', '布朗族', '佤族', '哈萨克族', '藏族', '撒拉族', '畲族', '傣族', '维吾尔族', '毛南族', '高山族', '德昂族', '苗族', '仡佬族', '拉祜族',
      '保安族', '彝族', '锡伯族', '水族', '裕固族', '壮族', '阿昌族', '东乡族', '京族', '布依族', '普米族', '纳西族', '独龙族', '朝鲜族', '塔吉克族', '景颇族', '鄂伦春族', '满族', '怒族', '柯尔克孜族', '赫哲族', '侗族',
      '乌孜别克族', '土族', '门巴族', '瑶族', '俄罗斯族', '达斡尔族', '珞巴族', '白族', '鄂温克族', '塔塔尔族', '基诺族'
    ],
    user_info: {}
  },


  FrequencyChange(e) {
    let that = this
    that.data.user_info.user_info.frequency = e.detail
    http.request({
      url: '/v1/user/info',
      method: 'PUT',
      data: {frequency: e.detail},
      success: (res) => {
        this.setData({
          user_info: that.data.user_info
        })
      }
    })
  },

  BirthdayChange(e) {
    let that = this
    that.data.user_info.user_info.birthday = e.detail.value
    http.request({
      url: '/v1/user/info',
      method: 'PUT',
      data: {birthday: e.detail.value},
      success: (res) => {
        this.setData({
          user_info: that.data.user_info
        })
      }
    })
  },

  firstAppearanceChange(e) {
    let that = this
    that.data.user_info.user_info.first_appearance = e.detail.value
    http.request({
      url: '/v1/user/info',
      method: 'PUT',
      data: {first_appearance: e.detail.value},
      success: (res) => {
        this.setData({
          user_info: that.data.user_info
        })
      }
    })
  },

  RegionChange(e) {
    let that = this
    that.data.user_info.user_info.hometown = ('' + e.detail.value).split(",")
    http.request({
      url: '/v1/user/info',
      method: 'PUT',
      data: {hometown: '[' + e.detail.value + ']'},
      success: (res) => {
        this.setData({
          user_info: that.data.user_info
        })
      }
    })
  },

  ethnicChange(e) {
    let that = this
    let value = that.data.picker[e.detail.value[0]]
    that.data.user_info.user_info.ethnic = value
    http.request({
      url: '/v1/user/info',
      method: 'PUT',
      data: {ethnic: value},
      success: (res) => {
        this.setData({
          user_info: that.data.user_info
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.request({
      url: '/v1/user/info',
      method: 'GET',
      data: {},
      success: (res) => {
        this.setData({
          user_info: res
        })
      }
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