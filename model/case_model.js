import {HTTP} from '../utils/http.js'

let now_time = new Date()

class CaseModel extends HTTP{
    login(log_res){
        wx.login({
            timeout:5000,
            success: (result)=>{
                this.request({
                    url: '/v1/client/register',
                    method: 'POST',
                    data: {"code": result.code, "type": 200},
                    success:(res)=>{
                        res.time = now_time.getMonth() + '-' + now_time.getDate()
                        wx.setStorage({
                            key:"login_data",
                            data: res,
                            success(){
                                if (log_res.first_request){
                                    log_res.first_request()
                                }
                            }
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