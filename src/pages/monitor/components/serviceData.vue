{C}<!--  -->
<template>
<div class="serverdata" id="servers"></div>
</template>
<script>

import {
  getServiceDataCount
} from "@/api/bsmonitor";
import $ from 'jquery'
import echarts from 'echarts'
export default {
  components: {
  },
  data () {
    return {
    }
  },
  watch: {
  },
  created () {
  },
  mounted(){
        this.drawLine()
        window.onresize = function(){
           echarts.init(document.getElementById('servers')).resize()
        }
        let _this  =  this
        this.interval = setInterval(function() {
            _this.changeData()
        }, 500000)
  },
  methods: {
    drawLine(){
      getServiceDataCount().then(response => {
        let data = response.data
        let mypie = echarts.init(document.getElementById('servers'))

        var category = data.name
        var dottedBase = [];
        var barData =  data.value
        var rateData = [];               
        32808
        // option
        let option = {
            backgroundColor: '#fff',
            tooltip: {
                trigger: 'axis',
                //backgroundColor:'rgba(255,255,255,0.1)',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true,
                        //backgroundColor: '#7B7DDC'
                    }
                }
            },
            grid:{
                x:'12%',
                width:'82%',
                y:'26%',
                bottom:'8%'
            },
            xAxis: {
                data: category,
                axisLine: {
                    lineStyle: {
                        color: '#BABABA'
                    }
                },
                axisLabel:{
                     color: '#111'
                },
                axisTick:{
                    show:false,
                },
            },
            yAxis: [
                {

                splitLine: {
                    lineStyle:{
                      type:'dashed',
                      color:'#E8E8E8'
                    }
                },
                axisLine: {
                    show:false
                },
                axisTick: {
                    show:false
                },
                axisLabel:{
                    formatter:'{value} ',
                }
            }],
            
            series: [
            
            {
                name: '文件数',
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#A9DFEC'},
                                {offset: 1, color: '#3EACE5'}
                            ]
                        )
                    }
                },
                data: barData
            } 
        ]
        };
        mypie.setOption(option)
      })
    },
    changeData(){
        getServiceDataCount().then((response) => {
            let mypie = echarts.init(document.getElementById('servers'))
            var option = mypie.getOption()
            option.series[0].data =response.data.data
            mypie.setOption(option)
        })
    }
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)// 在Vue实例销毁前，清除定时器
    }
  },
}

</script>
<style lang='scss' scoped>
.serverdata{
    width: 100%;
    height: 100%;
    background: #fff;
}
</style>
