import {HTTP} from '../utils/http.js'


class CaseModel extends HTTP{
    login(){
        wx.login({
            timeout:5000,
            success: (result)=>{
                console.log(result);
                this.request({
                    url: '/v1/client/register',
                    method: 'POST',
                    data: {"code": result.code, "type": 200},
                    success:(res)=>{
                        console.log(res)
                        wx.setStorage({
                            key:"login_data",
                            data: res
                          })
                    }
                })
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    }
}

export {CaseModel}