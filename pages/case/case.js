// pages/case/case.js
import {
    CaseModel
} from '../../model/case_model.js'
import {
    HTTP
} from '../../utils/http.js'


let http = new HTTP()

let case_model = new CaseModel


Page({

    /**
     * 页面的初始数据
     */
    data: {
        current_page: 1,
        record_data: [{
            "none": 1,
        }],
        refresh: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        case_model.login()
        http.request({
            url: '/v1/record',
            method: 'GET',
            data: {
                "current_page": 1,
            },
            success: (res) => {
                if (res.length > 0){
                    this.setData({
                        record_data: res
                    })
                }
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
        this.getTabBar().init(); /** 导航栏 */
        let that = this
        if (that.data.refresh == 1){
            http.request({
                url: '/v1/record',
                method: 'GET',
                data: {
                    "current_page": 1,
                },
                success: (res) => {
                    if (res.length > 0){
                        this.setData({
                            record_data: res
                        })
                    }
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.setData({
            refresh: 1
        })
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
        console.log('用户下拉')
        http.request({
            url: '/v1/record',
            method: 'GET',
            data: {
                "current_page": 1,
            },
            success: (res) => {
                if (res.length){
                    this.setData({
                        record_data: res
                    })
                }
                wx.stopPullDownRefresh()
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        wx.showLoading({
            title: '努力加载中...',
        })
        var that = this
        http.request({
            url: '/v1/record',
            method: 'GET',
            data: {
                "current_page": that.data.current_page + 1,
            },
            success: (res) => {
                if (res.length > 0) {
                    this.setData({
                        current_page: that.data.current_page + 1,
                        record_data: that.data.record_data.concat(res)
                    })
                } 
                wx.hideLoading();
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})