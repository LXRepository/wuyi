<!--  -->
<template>
    <el-container class="express">
        <el-header class="search_totle">
            <el-row :gutter="5" type="flex" class="row-bg" justify="space-between">
                <el-col :xs="4" :sm="6" :md="8" :lg="4" :xl="11">
                    <div class="grid-content">
                       <courtselect
                        @keyup.enter.native='search' 
                        class="input" :name='fromname' @getfydm='getfydmfrom'/>
                    </div>
                </el-col>
                <el-col  v-if="form.fydmfrom != ''" :xs="4" :sm="6" :md="8" :lg="4" :xl="11">
                    <div class="grid-content">
                        <el-select 
                        @keyup.enter.native='search' 
                        size='mini' clearable v-model="form.sysfrom" 
                        :title="form.fydmfrom == ''?'请先选择起始法院':'请选择起始系统'"
                        :placeholder="form.fydmfrom == ''?'请先选择起始法院':'请选择起始系统'">
                            <el-option
                            v-for="item in sysfromData"
                            :key="item.registerCode"
                            :label="item.appliedName"
                            :value="item.registerCode"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="4" :xl="11">
                    <div class="grid-content">
                       <courtselect
                        @keyup.enter.native='search' 
                        class="input" :name='toname' @getfydm='getfydmto'/>
                    </div>
                </el-col>
                <el-col v-if="form.fydmto != ''" :xs="4" :sm="6" :md="8" :lg="4" :xl="11">
                    <div class="grid-content">
                        <el-select 
                        @keyup.enter.native='search' 
                        size='mini' clearable v-model="form.systo" 
                        :title="form.fydmto == ''?'请先选择接收法院':'请选择接收系统'"
                        :placeholder="form.fydmto == ''?'请先选择接收法院':'请选择接收系统'">
                            <el-option
                            v-for="item in systoData"
                            :key="item.registerCode"
                            :label="item.appliedName"
                            :value="item.registerCode"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="4" :xl="11">
                    <div class="grid-content">
                        <el-date-picker
                        @keyup.enter.native='search' 
                        :editable='false'
                        v-model="form.timefrom"
                        :picker-options="startDatePicker" 
                        size='mini'
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择开始日期">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="4" :xl="11">
                    <div class="grid-content">
                        <el-date-picker
                        @keyup.enter.native='search' 
                        :editable='false'
                        v-model="form.timeto"
                        :picker-options="endDatePicker"
                        size='mini'
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择结束日期">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="4" :xl="11">
                    <div class="grid-content">
                        <el-select 
                        @keyup.enter.native='search' 
                        clearable size='mini' class="enabledSelect" v-model="form.status" placeholder="状态">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1">
                    <div class="grid-content">
                        <button class="search" 
                        @click="search"><i class="el-icon-search"></i></button>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main class="main_table">
            <expressTable :tableData='tableData' />
        </el-main>
         <el-footer class="footer_fy">
           <pagination :total='total' :size='size' @page='pageChange'/>
        </el-footer>
    </el-container>
</template>

<script>
import {
  getSystem,getexpress
} from "@/api/express";
import Vue from 'vue'
import expressTable from './components/table' 
import courtlist from '@/components/common/courtlist' 
import courtselect from '@/components/common/courtselect' 
import pagination from '@/components/common/paginationFG' 
import {Button,DatePicker,Message,Dialog,Select,Option,} from 'element-ui'
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
export default {
  components: {
      courtselect,
      courtlist,
      pagination,
      expressTable
  },
  data () {
    return {
        tableData: [],
        page: 1,
        size: 20,
        total: 1,
        startDatePicker: this.beginDate(),
        endDatePicker: this.processDate(),
        fromname:'请选择起始法院',
        toname:'请选择接收法院',
        form:{
            fydmfrom:'',
            fydmto:'',
            sysfrom:'',
            systo:'',
            timefrom:'',
            timeto:'',
            status:'',
        },
        options: [{ //状态列表
                value: 1,
                label: '待签收(目的法院已接收，第三方未提取)'
            }, {
                value: 2,
                label: '待送达(起始法院至目的法院文件传输中)'
            }, {
                value: 3,
                label: '已揽收(客户端已收到)'
            }, {
                value: 4,
                label: '已完成(第三方已接收)'
            }, {
                value: 5,
                label: '错误(文件错误状态)'
        }],
        sysfromData:[],//起始系统数据
        systoData:[],//接收系统数据
    };
  },
  created() {
      this.$emit('name', '快递流水查询')
      this.getlist()
  },
  methods: {
    //获取表数据
    getlist() {
        getexpress(this.page, this.size, this.form).then(response => {
                if (response.data.rows) {
                    this.tableData = response.data.rows
                    this.total = response.data.total
                } else {
                    this.tableData = []
                    this.total = 0
                }
            })
            .catch(error => {
                this.tableData = [];
            });
    },
    //获取联动系统
    getsystem(fydm,system){
        getSystem(fydm).then(response => {
                this[system] = response.data
            })
            .catch(error => {
                this[system] = [];
            });
    },
    //获取发送法院代码
    getfydmfrom(val){
        if (val !== undefined) {
            this.form.fydmfrom = val
            this.getsystem(this.form.fydmfrom,'sysfromData')
        } else {
            this.sysfromData = []
            this.form.fydmfrom = ''
        }
    },
    //获取接受法院代码
    getfydmto(val){
        if (val !== undefined) {
            this.form.fydmto = val
            this.getsystem(this.form.fydmto,'systoData')
        } else {
            this.systoData = []
            this.form.fydmto = ''
        }
    },
    //开始时间限制
    beginDate(){
        const self = this
        return {
            disabledDate(time){
                if (self.form.timeto) {  //如果结束时间不为空，则 小于 结束时间
                    return new Date(self.form.timeto).getTime() < time.getTime()
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
                if (self.form.timefrom) {  //如果开始时间不为空，则结束时间大于开始时间
                    return new Date(self.form.timefrom).getTime()- 8.64e7 > time.getTime() || time.getTime() > Date.now()
                } else {
                    return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
                }
            }
        }
    },
    //搜索
    search() {
        this.page = 1
        this.getlist()
    },
    //页数改变
    pageChange(val){
        this.page = val
        this.getlist()
    },
  }
}

</script>
<style lang='scss' scoped>
.express {
  width: 100%;
  height: 100% ;
  overflow: hidden;
  padding: 0 20px 0 0;
  box-sizing: border-box;
  .search_totle{
    color: #333;
    height: 40px !important;
    padding: 0px;
    overflow: hidden;
    .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .grid-content {
        min-height: 30px;
        .el-select{
            width:100%;
        }
        .el-date-picker{
            width: 100%;
        }
    }
    button {
        width: 100%;
        height: 28px;
        border-radius: 4px;
        border: 1px solid #afafb4;
        outline: none;
        color: #fff;
        text-align: center;
        cursor: pointer;
    }
    .search {
        background: #87d78e;
        &:hover {
            background: #66de72;
        }
    }
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
}
</style>
<style>
.express .el-date-editor.el-input, .express .el-date-editor.el-input__inner{
    width: 100% !important;
}
</style>
