{C}<!--  -->
<template>
  <el-container class="dataDynamics"
  v-loading.fullscreen.lock="fullscreenLoading" 
  element-loading-text="wait..."
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.5)">
  <el-header>
    <div class="tool">
        <input 
        @keyup.enter='searchbyname'
        type="search" placeholder="输入表中文名搜索" v-model="form.cTabName ">
        <input 
        @keyup.enter='searchbyname'
        type="search" placeholder="输入表英文名搜索" v-model="form.eTabName ">
        <el-date-picker
          style="float:left;margin-right:5px;width:17% !important;
      box-sizing: border-box;"
          @change='searchbyname' 
          :editable='false'
          v-model="form.timevalue.start"
          :picker-options="startDatePicker" 
          size='mini'
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          style="float:left;margin-right:5px;width:17% !important;
      box-sizing: border-box;"
          @change='searchbyname' 
          :editable='false'
          v-model="form.timevalue.end"
          :picker-options="endDatePicker"
          size='mini'
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择结束日期">
        </el-date-picker>
        <button class="search" @click="searchbyname"><i class="el-icon-search"></i>搜索</button>
    </div>
  </el-header>
  <el-main  class="main_table">
    <el-table
      align="center"
      class="table"
      :data="tableData"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="cFname"
        width="150"
        label="法院名称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="cCtabName"
        label="表中文名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="cEtabName"
        label="表英文名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="cColName"
        label="字段中文名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="cEolName"
        label="字段英文名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="cColType"
        label="字段类型"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="nColLength"
        width="80"
        label="字段长度"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="cNotNull"
        width="80"
        label="是否为空">
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="cPucol"
        width="95"
        label="是否为主键">
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="cOaType"
        label="操作类型">
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="dUpd"
        label="近期操作时间"
        width="130"
        sortable>
      </el-table-column>
    </el-table>
  </el-main>
  <el-footer  class="footer_fy">
      <el-pagination
        style="text-align:center;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20,30,40,50,60,70,80,90,100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        >
      </el-pagination>
  </el-footer>
  </el-container>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import {getChangeRecord} from '@/api/getdata'
import {Loading,RadioGroup,RadioButton,Message,Table,TableColumn,pagination,Form,FormItem,Input,Button,Select,Option,DatePicker,TimePicker,Col,} from 'element-ui'
import Router from 'vue-router'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Col)
Vue.use(Select)
Vue.use(RadioGroup)
Vue.use(RadioButton)
export default {
  data () {
    return {
      tableData:[],//表数据
      currentPage: 1, // 当前页数
      pagesize: 20, //每一页显示条数
      total: 1, //总条数
      form:{
        cTabName:'',
        eTabName:'',
        timevalue:{
          start:'',
          end:''
        },
      },
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      fullscreenLoading:false,//初始化loading
    };
  },
  watch: {
  },
  created () {
    this.getAlllist()
    
  },
  mounted() {
  },
  methods: {
    // 获取服务列表
    getAlllist(){
      this.fullscreenLoading = true
      getChangeRecord(this.currentPage, this.pagesize,this.form).then((response) => {
        this.tableData = response.data.rows
         this.fullscreenLoading = false
         this.total = response.data.total
      })
        .catch((response) => {
          this.fullscreenLoading = false
          Message.error('服务异常')
        })
        .then(() => {
        })
    },
    //搜索 
    searchbyname(){
        this.currentPage = 1
        this.getAlllist()
    },
    //开始时间限制
    beginDate(){
        const self = this
        return {
            disabledDate(time){
                if (self.form.timevalue.end) {  //如果结束时间不为空，则 小于 结束时间
                    return new Date(self.form.timevalue.end).getTime() < time.getTime()
                } else {
                    return time.getTime() > Date.now()//结束时间不选时，开始时间 小于 等于当天
                }
            }
        }
    },
    //结束时间限制
    processDate() {
        const  self = this
        return {
            disabledDate(time) {
                if (self.form.timevalue.start) {  //如果开始时间不为空，则结束时间大于开始时间
                    return new Date(self.form.timevalue.start).getTime()- 8.64e7 > time.getTime() || time.getTime() > Date.now()
                } else {
                    return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
                }
            }
        }
    },
    //改变每一页显示多少条
    handleSizeChange(val) {
        this.pagesize = val
        this.getAlllist()
    },
    //改变当前页数
    handleCurrentChange(val) {
        this.currentPage = val
        this.getAlllist()
    }
  }
}

</script>
<style lang='scss' scoped>
.dataDynamics{
  width: 100%;
  height: 100% ;
  overflow: hidden;
  padding: 0 20px 0 0;
  box-sizing: border-box;
  .el-header {
    color: #333;
    height: 40px !important;
    padding: 0px;
    overflow: hidden;
  }
  .main_table{
    overflow: auto !important;
    background-color: #fff;
    color: #333;
    padding: 0px !important;
  }
  .footer_fy{
    line-height: 40px;
    height: 40px !important;
    background-color: #fff;
    color: #333;
    padding: 0px !important;
    text-align: center;
  }
  .tool{
    width: 100%;overflow: hidden;
    input {
      padding: 0 10px;
      font-size: 12px;
      color: #606266;
      width: 17%;
      box-sizing: border-box;
      float: left;
      height: 28px;
      outline: none;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
      margin-right: 5px;
    }
    button {
      width: 70px;
      box-sizing: border-box;
      height: 28px;
      float: left;
      margin-right: 10px;
      border-radius: 4px;
      border: 1px solid #afafb4;
      outline: none;
      color: #fff;
      i {
        padding-right: 5px;
      }
    }
    .search {
      background: #87d78e;
      cursor: pointer;
      &:hover {
        background: #66de72;
      }
    }
  }
}
</style>
<style>
.dataDynamics .el-pagination .el-select .el-input .el-input__inner{
    border: 0px solid #fff;
    background: #fff9f900;
}
.dataDynamics .el-pagination button:disabled{
  border: 0px solid #fff;
  background: #fff9f900;
}
.dataDynamics .el-pagination .btn-next, .el-pagination .btn-prev{
  border: 0px solid #fff;
  background: #fff9f900;
}
.dataDynamics .el-pager {
  border: 0px solid #fff;
}
.dataDynamics .el-pager li{
  background: #fff9f900;
  height: 26px;
  line-height: 26px;
}
.dataDynamics .el-pagination .el-input__inner{
  border: 0px solid #fff;
  background: #fff9f900;
}
.el-table td{
    padding: 4px 0 !important;
}
/* .dataDynamics .el-table td, .el-table th{
  padding: 0px 0 !important;
} */
.dataDynamics .el-table{
    font-size: 12px;
}

::-webkit-input-placeholder { /* WebKit browsers */
    color:    #afafb4;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #afafb4;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #afafb4;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #afafb4;
}
</style>
