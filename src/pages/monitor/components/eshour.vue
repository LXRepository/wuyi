{C}<!--  -->
<template>
<div class="eshour_son" id="eshour">
  <div v-if="data.length == 0" class="nodata"> 暂无数据</div>
</div>
</template>
<script>
import {
  getTwentyFourHourCount
} from "@/api/bsmonitor";
import G2 from '@antv/g2'
import $ from 'jquery'
export default {
  components: {
  },
  data () {
    return {
        tmp:'',
        data:[]
    }
  },
  watch: { 
  },
  created(){
  },
  mounted () { 
    getTwentyFourHourCount().then((response) => {
        this.data = response.data
        this.data = response.data
        let that = this
        var data = this.data
        var chart = new G2.Chart({
            container: 'eshour', 
            forceFit: true,
            height: 500,
            padding: [180, 30, 40, 40] // 上右下左
        });
        chart.source(data);
        chart.scale('value', {
            min: 0,
          alias: '数量'
        });
        // chart.guide().text({
        //     position: [24,  0], 
        //     content: '/时', 
        //     style: {
        //     fill: '#4E91C1',
        //     textAlign: 'center',
        //     fontSize: 12
        //     }
        // });
        chart.scale('time', {
            range: [0, 1] 
        });
        chart.tooltip({
            crosshairs: {
            type: 'line'
            }
        });
        chart.line().position('time*value').color('#A9DFEC').size(6);
        chart.point().position('time*value').color('#A9DFEC').size(6).shape('circle').style({
            stroke: '#fff',
            lineWidth: 1
        });
        chart.render();
        this.tmp = setInterval(function(){
            data = that.getData()
            chart.changeData(data);
      },50000); 
    })
  },
  methods: {
      getData(){
        getTwentyFourHourCount().then((response) => {
            this.data = response.data
        })
        return this.data
      }
  },
  beforeDestroy() {
    if (this.tmp) {
      clearInterval(this.tmp)// 在Vue实例销毁前，清除定时器
    }
  },
  destroyed(){
  }
}

</script>
<style lang='scss' scoped>
.eshour_son{
    width:100%;
    height: 100%;
    background: #fff;
    .nodata{
      line-height: 500px;
      text-align: center;
      color: #bbb;
    }
}
</style>
<style>
</style>

