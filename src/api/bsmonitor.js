import request from '@/api/servers/request'

// 获取文件总数
export let getFilesCount = function (fydm) {
    return request({
        url: 'DataService/getAllCount',
        method: 'get',
    })
}
//24小时数据统计
export let getTwentyFourHourCount = function (fydm) {
    return request({
        url: 'DataService/getTwentyFourHourCount',
        method: 'get',
    })
}
//top10
export let getDataTopTen = function (fydm) {
    return request({
        url: 'DataService/getDataTopTen',
        method: 'get',
    })
}
//各系统数据
export let getServiceDataCount = function (fydm) {
    return request({
        url: 'DataService/getServiceDataCount',
        method: 'get',
    })
}
//饼图
export let getpie = function () {
    return request({
        url: 'DataService/getDiskDetails',
        method: 'get',
    })
}
//地图
export let getCourtCount = function (fydm) {
    return request({
        url: 'DataService/getCourtCount',
        method: 'get',
    })
}
