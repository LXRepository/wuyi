<!--  -->
<template>
  <el-container class="bsmonitor">
    <el-header>
      <div class="title">
        <span class="tag"></span>
        <h3>文件总数：{{Count.allCount?Count.allCount:'暂无'}} 件</h3>
        <h3>待签收数：{{Count.dqsCount?Count.dqsCount:'暂无'}} 件</h3>
        <h3>错误数：{{Count.exceCount?Count.exceCount:'暂无'}} 件</h3>
      </div>
    </el-header>
    <el-main class="main">
      <el-container>
        <el-aside class="con_aside" width="200px">
          <div class="asidepic node">
            <div class="title title_low titlt_posd">
              <span class="tag"></span>
              <h4>节点存储使用监控</h4>
            </div>
            <nodepie/>
          </div>
          <div class="asidepic topten">
            <div class="title title_low titlt_posd">
              <span class="tag"></span>
              <h4>本院当前月业务系统数据交换量TOP 10</h4>
            </div>
            <ul>  
              <li v-for="(item,index) in toptendata" :key="index">
                <span class="tenleft">
                  {{item.name}}
                </span>
                <span 
                class="mc" 
                v-if="index<3"
                :style="index == 0?'color:#D57266':index == 1?'color:#ECBB71':'color:#84C9E2'"
                >
                  top{{index+1}}
                </span>
                <span class="mc" v-else></span>
                <span class="tenright">
                  {{item.value}}
                </span>
              </li>
            </ul>
          </div>
        </el-aside>
        <el-main class="con_main">
          <div class="title title_low titlt_pos">
            <span class="tag"></span>
            <h4>节点监控及数据流转</h4>
          </div>
          <div class="map">
            <mapsc></mapsc>
          </div>
        </el-main>
      </el-container>
    </el-main>
    <el-footer>
      <div class="box eshour">
        <div class="title title_low titlt_posd">
          <span class="tag"></span>
          <h4>本院今日24小时所有业务系统数据交换量统计（单位：件）</h4>
        </div>
        <p class="aboutmess">{{eshourmess}}</p>
        <eshour/>
      </div>
      <div class="box swdays">
        <div class="title title_low titlt_posd">
          <span class="tag"></span>
          <h4>本院今日所有系统数据交换量统计（单位：件）</h4>
        </div>
        <p class="aboutmess">{{swdaysmess}}</p>
        <serviceData/>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import {
  getFilesCount,getTwentyFourHourCount,getpie,getDataTopTen,getServiceDataCount
} from "@/api/bsmonitor";
import eshour from "./components/eshour";
import mapsc from './components/map'
import nodepie from './components/nodepie'
import serviceData from './components/serviceData'
export default {
  data() {
    return {
      Count:{},//文件数
      toptendata:[],
      eshourmess:'今日24小时全省快递文件量统计概述了本省内文件传输的状态及数量。它显示了每小时时间段内文件传输量的不同趋势。同一文件在当前一小时时间内多次以相同方式传递，只会被计算一次。因此本模块数据因时间的变动而不同，当前展现的数据并非实时数据！若要当前时段的准确文件活动数据需在下一时间点返回才可得到。',
      swdaysmess:'近7日全省快递传输总量统计了本省内文件传输的7天数量。本模块数据每日做一次变动，若要当前时段的准确文件数据需在下一日才可得到。'
    };
  },
  created() {
    this.$emit("name", "业务汇总监控");
    this.getfiles()
    this.gettopten()
  },
  mounted() {
    let that = this
    this.tmp = setInterval(function(){
        that.$store.dispatch("LOADING_NEED",false) 
        that.getfiles()
        that.gettopten()
    },30000);
  },
  components: {
    mapsc,
    eshour,
    nodepie,
    serviceData
  },
  methods: {
    //文件总数
    getfiles(){
      getFilesCount().then(response => {
        this.Count = response.data
        })
        .catch(error => {
            this.Count = {};
        });
    },
    //top10
    gettopten(){
      getDataTopTen().then(response => {
        this.toptendata = response.data
        })
        .catch(error => {
            this.toptendata = [];
        });
    },
  },
  beforeDestroy() {
    if (this.tmp) {
      clearInterval(this.tmp)// 在Vue实例销毁前，清除定时器
      this.$store.dispatch("LOADING_NEED",true)
    }
  },
};
</script>
<style lang='scss' scoped>
.bsmonitor {
  width: 100%;
  height: 1253px ;
  overflow: auto;
  //background: red;
  padding: 0 20px 0 0;
  box-sizing: border-box;
  .title{
    float: left;
    width: 100%;
    height: 25px;
    overflow: hidden;
    .tag{
      float: left;
      height: 20px;
      background: #f56c6c;
      width:3px;
      position: relative;
      top: 2px;
    }
    h3{
      padding: 0 25px 0 10px;
      float: left;
      margin: 0px;
      line-height: 25px;
      font-weight: bold;
      color: #535d78;
    }
    h4{
      padding: 0 10px;
      float: left;
      margin: 0px;
      line-height: 25px;
      font-weight: bold;
      color: #535d78;
      font-size: 15px;
    }
  }
  .title_low{
    .tag{
      float: left;
      height: 16px;
      background: #f56c6c;
      width:3px;
      position: relative;
      top: 5px;
    }
  }
  .titlt_pos{
    position: absolute;
    top:0px;
    z-index: 9;
    width: 200px;
    h4{
      color: #e1e1e3;
    }
  }
  .titlt_posd{
    position: absolute;
    top:0px;
    z-index: 9;
    width: 100%;
    h4{
      color: #535d78;
    }
  }
  .el-header {
    color: #333;
    height: 25px !important;
    line-height: 25px;
    padding: 0px;
  }
  .main {
    overflow: hidden !important;
    //background-color: #E9EEF3;
    color: #333;
    height: 700px !important;
    padding: 15px 0 !important;
    box-sizing: border-box;
    .el-container {
      height: 100%;
    }
    .con_aside {
      width: 300px !important;
      color: #333;
      .asidepic{
        float: left;
        width: 100%;
        height: 50%;
        position: relative;
      }
      .node{
        padding-bottom: 15px;
        box-sizing: border-box;
      }
      .topten{
        background: #fff;
        ul{
          overflow: hidden;
          margin: 0px;
          padding: 32px 15px 10px ;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          li{
            float: left;
            width: 100%;
            list-style: none;
            padding: 6px 0;
            box-sizing: border-box;
            font-size: 12px;
            color: #535d78;
            font-weight: 500;
            border-bottom: 1px solid #eee;
            .tenleft{
              float: left;
            }
            .tenright{
              float: right;
              color: #358092;
              font-weight: 900;
            }
            .mc{
              float: right;
              font-weight: 900;
              width: 50px;
              height: 1px;
              text-align: right;
              color: red;
            }
          }
        }
      }
    }
    .con_main {
      position: relative;
      padding: 0 0 0 15px !important;
      box-sizing: border-box;
      color: #333;
      .map {
        background: #fff;
        width: 100%;
        height: 100%;
      }
    }
  }
  .el-footer {
    padding: 0px;
    color: #333;
    height: 500px !important;
    float: left;
    overflow: hidden;
    .box{
      float: left;
      height: 100%;
    }
    .eshour{
      width: 50%;
      padding-right: 7px;
      box-sizing: border-box;
      position: relative;
      .aboutmess{
        position: absolute;
        z-index: 9;
        font-size: 13px;
        top: 20px;
        box-sizing: border-box;
        padding: 0 46px 0 22px;
        text-indent: 24px;
        line-height: 29px;
        margin: 23px 0;
        color: #535d78;
        font-weight: 600;
        max-height: 116px;
        box-sizing: border-box;
        overflow: hidden;
        font-family: "Archivo", sans-serif;
      }
    }
    .swdays{
      width: 50%;
      padding-left: 7px;
      box-sizing: border-box;
      position: relative;
      .aboutmess{
        z-index: 9;
        position: absolute;
        font-size: 13px;
        top: 20px;
        box-sizing: border-box;
        padding: 0 46px 0 22px;
        text-indent: 24px;
        line-height: 29px;
        margin: 23px 0;
        color: #535d78;
        font-weight: 600;
        max-height: 58px;
        box-sizing: border-box;
        overflow: hidden;
        font-family: "Archivo", sans-serif;
      }
    }
  }
}
</style>
