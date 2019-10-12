{C}<!--  -->
<template>
<div class="pie" id="nodepie"></div>
</template>
<script>

import {
  getpie
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
           echarts.init(document.getElementById('nodepie')).resize()
        }
        let _this  =  this
        this.interval = setInterval(function() {
            _this.changeData()
        }, 500000)
  },
  methods: {
    drawLine(){
      getpie().then(response => {
        let mypie = echarts.init(document.getElementById('nodepie'))
        let option = {
            backgroundColor: '#fff',

            // title: {
            //     text: 'Customized Pie',
            //     left: 'center',
            //     top: 20,
            //     textStyle: {
            //         color: '#ccc'
            //     }
            // },

            tooltip : {
                trigger: 'item',
                formatter: "{a}({d}%) <br/>{b} : {c}GB "
            },
            legend: {
                type:"scroll",
                orient: 'vertical',
                left:'70%',
                align:'left',
                top:'bottom',
                textStyle: {
                    color:'#8C8C8C'
                },
                height:250 
            },
            series : [
                {
                    name:'节点监控',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    color: ['#60778F','#A9DFEC', ], 
                    data:response.data.data.sort(function (a, b) { return a.value - b.value; }),
                    label: {
                    },
                    labelLine: {
                        normal: {
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 50,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        mypie.setOption(option)
      })
    },
    changeData(){
        getpie().then((response) => {
            let mypie = echarts.init(document.getElementById('nodepie'))
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
.pie{
    width: 100%;
    height: 100%;
    background: #fff;
}
</style>
