// pages/case/case-detail/case-detail.js

import {HTTP} from "../../../utils/http";

let http = new HTTP();

Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        var case_id = options.id
        http.request({
            url: '/v1/record/details',
            method: 'POST',
            data: {
                "id": case_id,
            },
            success: (res) => {
                that.setData({
                    record_info: res,
                    id: case_id
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

    },

    update_record: function(e){
        var id = e.target.id
        wx.navigateTo({
          url: './case-detail-update/case-detail-update?id='+id,
        })
    },

    delete_record: function(e){
        var id = e.target.id
        wx.showModal({
            // title: "温馨提示", // 提示的标题
            content: "确定删除这条记录吗？", // 提示的内容
            showCancel: true, // 是否显示取消按钮，默认true
            cancelText: "取消", // 取消按钮的文字，最多4个字符
            cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
            confirmText: "确定", // 确认按钮的文字，最多4个字符
            confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
            success: function (res) {
                console.log("接口调用成功的回调函数");
                if (res.confirm) {
                    console.log('用户点击确定')
                    http.request({
                        url: '/v1/record',
                        method: 'DELETE',
                        data: {
                            "id": id,
                        },
                        success: (res) => {
                            wx.navigateBack({
                              delta: 1,
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            },
            fail: function () {
                wx.showToast({
                    title: '哎呀，删除失败了～',
                    duration: 1500,
                    mask: false,
                });
            },
        })
    }
})
