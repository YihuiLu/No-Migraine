import {config} from '../config.js'
import {Base64} from '../utils/base64.js'

class HTTP {
    request(params) {
        // URL, data, method,
        if (!params.method) {
            params.method = "GET"
        };
        if (params.loadProgress){
            params.loadProgress()  
        };
        wx.request({
            url: config.api_base_url + params.url,
            method: params.method,
            data: params.data,
            header: {
                "content-type": "application/json",
                "Authorization" : 'Basic ' + Base64.encode(wx.getStorageSync('login_data').token + ':')
            },
            
            success: (res) => {
                let code = res.statusCode.toString();
                let error_code = res.data.error_code
                if (error_code == 1002 || error_code == 1003) {/** 如果监测到登录状态失效则自动重新登录 */
                    console.log('监测到登录状态失效，自动重新登录')
                    wx.login({
                        timeout: 5000,
                        success: (result) => {
                            this.request({
                                url: '/v1/client/register',
                                method: 'POST',
                                data: {
                                    "code": result.code,
                                    "type": 200
                                },
                                success: (res) => {
                                    wx.setStorage({
                                        key: "login_data",
                                        data: res,
                                        success:(res) =>{
                                            this.request(params)
                                        }
                                    })

                                }
                            })
                        },
                        fail: () => {},
                        complete: () => {}
                    });

                };
                if (code.startsWith('2')) {
                    params.success(res.data)
                } else {
                    if (!res.data.msg) {
                        res.data.msg = '哎呀，出现了一点小状况～'
                    }
                    if(res.data.msg != 'token is invalid'){
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            image: '',
                            duration: 2000,
                            mask: false,
                            success: (result) => {
                            }
                        });
                    }
                }
            },
            fail: (err) => {
                if(params.fail){
                    params.fail()
                }
                wx.showToast({
                    title: '哎呀，网络不太好～',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {
                    }
                });
            }

        })

    }
}

export {
    HTTP
}