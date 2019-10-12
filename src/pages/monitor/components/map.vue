{C}<!--  -->
<template>
<div class="mapsc" id="mapChart"></div>
</template>
<script>

import {
  getCourtCount
} from "@/api/bsmonitor";
import $ from 'jquery'
import echarts from 'echarts'
import sc from 'echarts/map/json/province/sichuan'
export default {
  components: {
  },
  data () {
    return {
        min:0,
        max:200,
        interval:'',
        chinaDatas:[]
    }
  },
  watch: {
  },
  created () {
  },
  mounted(){
        this.drawLine()
        window.onresize = function(){
           echarts.init(document.getElementById('mapChart')).resize()
        }
        let _this  =  this
        this.interval = setInterval(function() {
            _this.changeData()
        }, 500000)
  },
  methods: {
    drawLine() {
        // 注册可用的地图
     getCourtCount().then((response) => {
        let myCharts = echarts.init(document.getElementById('mapChart'))
        echarts.registerMap('sichuan', sc)
        var chinaGeoCoordMap = {
            '四川省高级人民法院': [103.61,30.48,],
            '甘孜州': [100.959,30.18,],
            '阿坝': [102.21,31.905,],
            '凉山': [102.26,27.874,],
            '绵阳': [104.71,31.481,],
            '达州': [107.46,31.212,],
            '广元': [105.87,32.423,],
            '雅安': [103.01,29.987,],
            '宜宾': [104.64,28.756,],
            '乐山': [103.76,29.580,],
            '南充': [106.07,30.790,],
            '巴中': [106.94,31.963,],
            '泸州': [105.40,28.883,],
            '成都': [104.03,30.679,],
            '资阳': [104.61,30.122,],
            '攀枝花': [101.81,26.678,],
            '眉山': [103.85,30.075,],
            '广安': [106.64,30.456,],
            '德阳': [104.41,31.126,],
            '内江': [105.05,29.579,],
            '遂宁': [105.60,30.523,],
            '自贡': [104.78,29.332,]
	    };
        var chinaDatasold  = [
                [{name: '四川省高级人民法院'}, {name: "甘孜州",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "阿坝",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "凉山",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "绵阳",value:'1'}], 
                [{name: '四川省高级人民法院'}, {name: "达州",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "广元",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "雅安",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "宜宾",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "乐山",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "南充",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "巴中",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "泸州",value:'1'}], 
                [{name: '四川省高级人民法院'}, {name: "成都",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "资阳",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "攀枝花",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "眉山",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "广安",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "德阳",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "内江",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "遂宁",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "自贡",value:'1'}],
                [{name: '四川省高级人民法院'}, {name: "四川省高级人民法院",value:'1'}],
        ];
        var chinaDatas = chinaDatasold.concat(response.data.Linedata)
        for (let index = 0; index < chinaDatas.length; index++) {
            var dataItem = chinaDatas[index]
            if (dataItem) {
              chinaGeoCoordMap[dataItem[1].name] = chinaGeoCoordMap[dataItem[1].name].concat(response.data.Statusdata[dataItem[1].name])  
            }
        }
        var getScatter  = function(data) {//  获取目的地和 出发地 的 名称 和 经纬度，用来 作为点 的数据
            let _self = this
            let scatter = []
            scatter = data.map(function(dataItem) {
                if (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: chinaGeoCoordMap[dataItem[1].name],//.concat([dataItem[1].value]),
                        dqs:chinaGeoCoordMap[dataItem[1].name][3],
                        yls:chinaGeoCoordMap[dataItem[1].name][4],
                    }
                }
            })
            scatter.push({
                name: data[0][0].name,
                value: chinaGeoCoordMap[data[0][0].name],
                dqs:chinaGeoCoordMap[data[0][0].name][3],
                yls:chinaGeoCoordMap[data[0][0].name][4],
            })
            return scatter
        };
        var convertData = function(data) {
            var res = []; 
            for(var i = 0; i < data.length; i++) {
                var dataItem = data[i]
                if (dataItem) {
                    var fromCoord = chinaGeoCoordMap[dataItem[1].name]
                    var toCoord = chinaGeoCoordMap[dataItem[0].name]
                    if(fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[0].name,
                            toName: dataItem[1].name,
                            coords: [fromCoord, toCoord],
                            show:dataItem[1].value,
                        })
                    }
                }
            }
            return res
        };
        var series = [];
        [['四川省高级人民法院', chinaDatas]].forEach(function(item, i) {
            series.push(
                {
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 1.5,
                        trailLength: 0.7,
                        symbolSize:3,
                    },
                    lineStyle: {
                        normal: {
                            width: 0.1, //尾迹线条宽度
                            opacity: 0.5, //尾迹线条透明度
                            curveness: .3, //尾迹线条曲直度
                            color: function(val){
                               if (val.data.show == 0) {
                                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0, color: '#58B3CC'
                                    }, {
                                        offset: 1, color: '#F58158'
                                    }], false)
                               } else {
                                   return '#fff0'
                               }
                            }
                        }
                    },
                    data: convertData(item[1])
                },
                {
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none'],
                    symbolSize: 10,
                    effect: {
                        show: false
                    },
                    lineStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0, color: '#7EE8C6'//'#58B3CC'
                            }, {
                                offset: 1, color: '#7EE8C6'//'#F58158'
                            }], false),
                            width: 0,
                            opacity: 0.6,
                            curveness: 0.2
                        }
                    },
                    data: convertData(item[1])
                },
                {
                    type: 'effectScatter',    
                    zlevel: 2,
                    coordinateSystem: 'geo',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'right', //显示位置
                            offset: [-20, -10], //偏移设置
                            formatter: function(params){//圆环显示文字
                                return params.name
                            },
                            fontSize: 13
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    symbol: 'circle',
                    symbolSize: function(val) {//圆环大小
                    if (val == undefined) {
                        return 5
                    } else {
                        if (val[2]=== null) {
                            return 5
                        } else if (val[2]=== 'danger') {
                            return 15
                        } else if (val[2]=== 'normal') {
                            return 8
                        }else if (val[2]=== 'warn') {
                            return 10
                        }
                    }
                    },
                    itemStyle: {
                        normal: {
                            show: false,
                            color: function(val){
                                if (val.name) {
                                    var status = chinaGeoCoordMap[val.name][2]
                                    var color = ''
                                    if (status === 'danger') {
                                        return '#F58158'
                                    } else if (status === 'warn') {
                                        return '#ffc751 '
                                    } else if (status === 'normal') {
                                        return  '#58B3CC'
                                    } else {
                                        return '#fff'
                                    }
                                }
                            }
                        }
                    },
                    data: getScatter(item[1])
                },
                //被攻击点
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        period: 4,
                        brushType: 'stroke',
                        scale: 4
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'right',
                            offset:[5, 0],
                            color: '#0f0',
                            formatter: '{b}',
                            textStyle: {
                                color: "#0f0"
                            }
                        },
                        emphasis: {
                            show: false,
                            color: "#f60"
                        }
                    },
                    symbol: 'pin',
                    symbolSize: 50,
                    data: [{
                        name: item[0],
                        value: chinaGeoCoordMap[item[0]],
                    }],
                }
            );
        });

        var option = {
            tooltip: {
                trigger: 'item',
                backgroundColor: '#394561',
                borderColor: '#FFFFCC',
                showDelay: 0,
                hideDelay: 0,
                enterable: true,
                transitionDuration: 0,
                extraCssText: 'z-index:100',
                formatter:function (params) {
                    if (params.data.dqs  == undefined ) {
                        return params.data.name
                    } else {
                        return params.data.name +'<br/>待签收 ：'+ params.data.dqs+
                        "<br />已揽收 ："+params.data.yls;
                    }
                }
            },
            backgroundColor:"#60778F",
            geo: {
                map: 'sichuan',
                zoom: 1.3,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                scaleLimit:{
                    min:1,
                    max:2
                },
                center:[102.81,30.48,],
                roam: true, //是否允许缩放
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        // shadowColor: 'rgba(255, 255, 255, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                    emphasis: {
                        areaColor: '#389BB7',
                        borderWidth: 0
                    }
                },
            },
            series: series
        };
        myCharts.setOption(option)
      })
    },
    changeData(){
        getCourtCount().then((response) => {
            let myChart = echarts.init(document.getElementById('mapChart'))
            var option = myChart.getOption()
            var chinaGeoCoordMap = {
                '四川省高级人民法院': [103.81,30.48,],
                '甘孜州': [100.959,30.18,],
                '阿坝': [102.21,31.905,],
                '凉山': [102.26,27.874,],
                '绵阳': [104.71,31.481,],
                '达州': [107.46,31.212,],
                '广元': [105.87,32.423,],
                '雅安': [103.01,29.987,],
                '宜宾': [104.64,28.756,],
                '乐山': [103.76,29.580,],
                '南充': [106.07,30.790,],
                '巴中': [106.94,31.963,],
                '泸州': [105.40,28.883,],
                '成都': [104.03,30.679,],
                '资阳': [104.61,30.122,],
                '攀枝花': [101.81,26.678,],
                '眉山': [103.85,30.075,],
                '广安': [106.64,30.456,],
                '德阳': [104.41,31.126,],
                '内江': [105.05,29.579,],
                '遂宁': [105.60,30.523,],
                '自贡': [104.78,29.332,]
            };
            var chinaDatasold  = [
                    [{name: '四川省高级人民法院'}, {name: "甘孜州",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "阿坝",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "凉山",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "绵阳",value:'1'}], 
                    [{name: '四川省高级人民法院'}, {name: "达州",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "广元",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "雅安",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "宜宾",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "乐山",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "南充",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "巴中",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "泸州",value:'1'}], 
                    [{name: '四川省高级人民法院'}, {name: "成都",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "资阳",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "攀枝花",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "眉山",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "广安",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "德阳",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "内江",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "遂宁",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "自贡",value:'1'}],
                    [{name: '四川省高级人民法院'}, {name: "四川省高级人民法院",value:'1'}],
            ];
            var chinaDatas = chinaDatasold.concat(response.data.Linedata)
            for (let index = 0; index < chinaDatas.length; index++) {
                var dataItem = chinaDatas[index]
                if (dataItem) {
                chinaGeoCoordMap[dataItem[1].name] = chinaGeoCoordMap[dataItem[1].name].concat(response.data.Statusdata[dataItem[1].name])  
                }
            }
            var convertData = function(data) {
                var res = []; 
                for(var i = 0; i < data.length; i++) {
                    var dataItem = data[i]
                    if (dataItem) {
                        var fromCoord = chinaGeoCoordMap[dataItem[1].name]
                        var toCoord = chinaGeoCoordMap[dataItem[0].name]
                        if(fromCoord && toCoord) {
                            res.push({
                                fromName: dataItem[0].name,
                                toName: dataItem[1].name,
                                coords: [fromCoord, toCoord],
                                show:dataItem[1].value,
                            })
                        }
                    }
                }
                return res
            };
            var getScatter  = function(data) {//  获取目的地和 出发地 的 名称 和 经纬度，用来 作为点 的数据
                let _self = this
                let scatter = []
                scatter = data.map(function(dataItem) {
                    if (dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: chinaGeoCoordMap[dataItem[1].name],//.concat([dataItem[1].value]),
                            dqs:chinaGeoCoordMap[dataItem[1].name][3],
                            yls:chinaGeoCoordMap[dataItem[1].name][4],
                        }
                    }
                })
                scatter.push({
                    name: data[0][0].name,
                    value: chinaGeoCoordMap[data[0][0].name],
                    dqs:chinaGeoCoordMap[data[0][0].name][3],
                    yls:chinaGeoCoordMap[data[0][0].name][4],
                })
                return scatter
            };
            option.series[0].data =convertData(chinaDatas)
            option.series[1].data =getScatter(chinaDatas)
            // option.series[2].data =getScatter(chinaDatas)
            myChart.setOption(option)
            })
    }
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)// 在Vue实例销毁前，清除定时器
    }
  },
  destroyed(){
        if(window.onresize) { 
            window.onresize = function(){
                return
            }
        }
    }
}

</script>
<style lang='scss' scoped>
.mapsc{
    width: 100%;
    height: 100%;
}
</style>
