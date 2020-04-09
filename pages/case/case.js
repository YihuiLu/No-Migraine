// pages/case/case.js
import {
    CaseModel
} from '../../model/case_model.js'
import {
    HTTP
} from '../../utils/http.js'


let http = new HTTP();
const app = getApp();
let case_model = new CaseModel;
let now_time = new Date()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        current_page: 1,
        record_data: [{
            "none": 0,
        }],
        refresh: 0,
        loadProgress: 0,

        CustomBar: app.globalData.CustomBar,

        loging: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this

        http.request({
            url: '/v1/record',
            method: 'GET',
            data: {
                "current_page": 1,
            },
            loadProgress() {
                /** 条形进度条 */
                that.setData({
                    loadProgress: this.data.loadProgress + 3
                })
                if (that.data.loadProgress < 100) {
                    setTimeout(() => {
                        this.loadProgress();
                    }, 100)
                } else {
                    that.setData({
                        loadProgress: 0
                    })
                }
            },
            success: (res) => {
                if (res.length > 0) {
                    that.setData({
                        record_data: res
                    })
                } else {
                    that.setData({
                        record_data: [{
                            none: 1
                        }]
                    })
                }
                that.setData({
                    loadProgress: 100,
                    loging: false
                })
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.setData({
            loadProgress: 20
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this;
        if (wx.canIUse('hideHomeButton')) {
            wx.hideHomeButton()
        }
        if (wx.getStorageSync('login_data'  && that.refresh === 1)){
            console.log('监听到页面显示， 刷新数据')
            http.request({
                url: '/v1/record',
                method: 'GET',
                data: {
                    "current_page": 1,
                },
                success: (res) => {
                    if (res.length > 0) {
                        that.setData({
                            record_data: res,
                            loadProgress: 100,
                            loging: false
                        })
                    }
                }
            })
        }

},


clickTabBarSubmit: function () {
    wx.navigateTo({
        url: '../recording/recording'
    })
},
clickTabBarUser: function () {
    wx.redirectTo({
        url: '../user/user'
    })
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
onPullDownRefresh: function (option) {
    http.request({
        url: '/v1/record',
        method: 'GET',
        data: {
            "current_page": 1,
        },
        success: (res) => {
            this.setData({
                record_data: res
            })
            console.log('用户下拉' + res);
            wx.stopPullDownRefresh(option)
        }
    })
},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function (option) {
    wx.showLoading({
        title: '努力加载中...',
    });
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
            wx.hideLoading(option);
        }
    })
},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function () {

}
})