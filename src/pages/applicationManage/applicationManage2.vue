<!--  -->
<template>
<div class='customaudit'>
    <el-tabs type="border-card" @tab-click='tabclick'>
        <el-tab-pane v-for="item in tabsoption" :label="item.label" :key="item.status">
          <el-container>
            <el-header>
                <div class="totls">
                  <input 
                  @keyup.enter='searchbyname'
                  type="search" placeholder="输入服务名称搜索服务" v-model="form.cName">
                  <input  
                  @keyup.enter='searchbyname'
                  type="search" placeholder="输入申请部门搜索服务" v-model="form.cDept">
                  <input  
                  @keyup.enter='searchbyname'
                  type="search" placeholder="输入负责人搜索服务" v-model="form.cLeadName">
                  <button class="search" @click="searchbyname"><i class="el-icon-search"></i>搜索</button>
              </div>
            </el-header>
            <el-main>
              <customauditTable :tableData='tableData'/>
            </el-main>
            <el-footer>
              <el-pagination
                  style="text-align:center;"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10,20,30,40,50]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  >
              </el-pagination>
            </el-footer>
          </el-container>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import Vue from 'vue' 
import customauditTable from './table' 
import {getSelfCatalogList,getSelfCatalogListByStatus} from '@/api/getdata'
import {Tabs,TabPane,Pagination,Message} from 'element-ui'
Vue.use(Tabs)
Vue.use(TabPane) 
Vue.use(Pagination)
export default {
  components: {
      customauditTable
  },
  data() {
    return {
        searchtype:'all',
        tableData:[],
        tabsoption: [{//用户状态列表
            status:0,
            label: '全部'
            }, {
            status:1,
            label: '已提交未审核'
            },{
            status:2,
            label: '已提交未发布'
            },{
            status:3,
            label: '已发布'
            },{
            status:4,
            label: '已拒绝'
        }],
        form:{
          cName:'',
          cDept:'',
          cLeadName:''
        },
        currentPage: 1, // 当前页数
        pagesize: 10, //每一页显示条数
        total: 1, //总条数
        radio:0,//状态
        fullscreenLoading:true,//初始化loading
        fullscreenLoadingSQ:false,//申请loading
        url:'',//下载文件地址
    };
  },
  created() {
      this.getList()
  },
  mounted() {},
  methods: {
    tabclick(val){
        this.status = this.tabsoption[val.index].status
        this.changeStatus(this.status)
    },
    //获取列表
    getList(){
     this.fullscreenLoading = true
     this.searchtype = 'all'
      getSelfCatalogList(this.currentPage, this.pagesize,this.form).then((response) => {
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
        this.page = 1
        this.getList()
    },
    //改变状态
    changeStatus(label){
      this.searchtype = 'change'
      this.fullscreenLoading = true
      if (label == 0) {
        this.getList()
      } else {
        getSelfCatalogListByStatus(this.currentPage, this.pagesize,label).then((response) => {
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
      }
      
    },
    //改变每一页显示多少条
    handleSizeChange(val) {
        this.pagesize = val
        if (this.searchtype == 'all') {
          this.getList()
        } else {
          this.changeStatus(this.status)
        }
    },
    //改变当前页数
    handleCurrentChange(val) {
        this.currentPage = val
        if (this.searchtype == 'all') {
          this.getList()
        } else {
          this.changeStatus(this.status)
        }
    },
    //下载说明
    handleClick() {
      this.url =  downloadfile(this.serviceid)
    },
  }
};
</script>
<style lang='scss' scoped>
.customaudit{
  width: 100%;
  height: 100%;
  overflow:hidden;
  padding: 0 20px 0 0;
  box-sizing: border-box;
    .el-header {
    color: #333;
    height: 40px !important;
    padding: 0px;
    overflow: hidden;
  }
  .el-main{
    overflow: auto !important;
    background-color: #fff;
    color: #333;
    padding: 0px !important;
  }
  .el-footer{
    line-height: 40px;
    height: 40px !important;
    background-color: #fff;
    color: #333;
    padding: 0px !important;
    text-align: center;
  }
    .totls {
    width: 100%;
    float: left;
    margin-bottom: 10px;
    input {
      padding: 0 10px;
      font-size: 12px;
      color: #9198a8;
      width: 20%;
      float: left;
      height: 28px;
      outline: none;
      border-radius: 4px;
      border: 1px solid #afafb4;
      margin-right: 5px;
    }
    button {
      width: 70px;
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
.customaudit .el-range-editor.el-input__inner{
    float: left;
    margin-right: 10px;
    border: 1px solid #afafb4 !important;
}
.customaudit .el-input.is-disabled .el-input__inner {
    background-color: #ffffff !important;
    color: #606266 !important;
    border-color: #fff !important;
}
.customaudit a{
    text-decoration: underline !important;
    color: #5085ff !important;
}
.customaudit .downloadbutton{
    background: #fff !important;
    border: 0px !important;
}
.customaudit .el-textarea.is-disabled .el-textarea__inner{
    background-color: #ffffff !important;
    color: #606266 !important;
    border-color: #fff !important;
}
.customaudit .el-tabs--border-card{
  height: 100% !important;
}
.customaudit .el-tabs__content .el-tab-pane{
  height: 100%;
}
.customaudit .el-tabs__content {
    height: 94%;
    box-sizing: border-box;
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
