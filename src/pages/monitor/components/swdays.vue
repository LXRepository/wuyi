{C}<!--  -->
<template>
<div class="swdays_son" id="swdays">
  <div v-if="data.length == 0" class="nodata"> 暂无数据</div>
</div>
</template>
<script>
import {
  getfifteenDayCount
} from "@/api/bsmonitor";
import G2 from '@antv/g2'
import $ from 'jquery'
export default {
  components: {
  },
  data () {
    return {
        tmp:'',
        data:[],
    }
  },
  watch: { 
  },
  created(){
  },
  mounted () {
    getfifteenDayCount().then((response) => {
        this.data = response.data
        let that = this
        var data = this.data
        var chart = new G2.Chart({
            container: 'swdays',
            forceFit: true,
            height: 500,
            padding: [120, 30, 40, 40] // 上右下左
        });
        chart.source(data);
        chart.scale('value', {
            tickInterval: 200,
          alias: '数量'
        });
        chart.interval().position('time*value').color('#A5D6F8');
        chart.render();
        this.tmp = setInterval(function(){
            data = that.getData()
            chart.changeData(data);
      },50000);
    })
  },
  methods: {
      getData(){
        getfifteenDayCount().then((response) => {
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
.swdays_son{
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

