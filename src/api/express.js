import request from '@/api/servers/request'

// 获取联动系统
export let getSystem = function (fydm) {
    return request({
        url: 'DataService/getAllCourtlnAndServiceFormation',
        method: 'get',
        params: {
            fydm
        }
    })
}
//获取列表&&搜索
export let getexpress = function (page, rows, form) {
    return request({
        url: 'DataService/getFilesDowloadLog',
        method: 'get',
        params: {
            page, rows, 
            'startCourt':form.fydmfrom === undefined  || form.fydmfrom === null ? '':form.fydmfrom, 
            'sendService':form.sysfrom === undefined  || form.sysfrom === null ? '':form.sysfrom, 
            'receptionCourt':form.fydmto === undefined  || form.fydmto === null ? '':form.fydmto, 
            'receptionService':form.systo === undefined  || form.systo === null ? '':form.systo, 
            'startTime':form.timefrom === undefined  || form.timefrom === null ? '':form.timefrom, 
            'receptionTime':form.timeto === undefined  || form.timeto === null ? '':form.timeto, 
            'zt':form.status === undefined  || form.status === null ? '':form.status, 
        }
    })
}
// 法院类别列表
export let getcourtlist = function () {
    return request({
      url: 'DataService/getAllCourtlnAndServiceFormation',
      method: 'get',
      params:{
        'fydm' : ''
      }
    })
  }

// 刷新token
export let verification = function () {
    let formData = new FormData();
    formData.append("id", localStorage.getItem('USERID'));
    formData.append("refresh", store.state.refresh);
    return request({
      url:'auth/refreshToken',
      method: 'post',
      data: formData
    })
  }