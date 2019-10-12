<!--   <p class="message" :title="item.CNAME">申请服务:  {{item.CNAME}}</p>
              <p class="message" :title="item.CENDDATE">申请时间:  {{item.CENDDATE}}</p>
              <p class="message" :title="item.CDEPT">申请部门: {{item.CDEPT}}</p>
              <p class="message" :title="item.CSYSNAME">接入系统: {{item.CSYSNAME}}</p>
              <p class="message" :title="item.CSCOPE">使用范围:  {{item.CSCOPE}}</p>
              <p class="message" :title="item.CSPECTACLE">使用场景:  {{item.CSPECTACLE}}</p>
              <p class="message" :title="item.CLEADNAME">负责人: {{item.CLEADNAME}}</p>
              <p class="message" :title="item.CTELNUM">联系电话: {{item.CTELNUM}}</p> -->
<template>
      <el-table
        class="customauditTable"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;">
        <el-table-column
        show-overflow-tooltip
          prop="CNAME"
          label="服务名称"
          >
        </el-table-column>
        <el-table-column
        show-overflow-tooltip
          prop="CDEPT"
          label="申请部门"
          >
        </el-table-column>
        <el-table-column
        show-overflow-tooltip
          prop="CSYSNAME"
          label="接入系统"
          >
        </el-table-column>
        <el-table-column
        show-overflow-tooltip
          prop="CSCOPE"
          label="使用范围"
          >
        </el-table-column>
        <el-table-column
        show-overflow-tooltip
          prop="CSPECTACLE"
          label="使用场景"
          >
        </el-table-column>
        <el-table-column
        show-overflow-tooltip
          prop="CLEADNAME"
          label="负责人"
          >
        </el-table-column>
        <el-table-column
        show-overflow-tooltip
          prop="CTELNUM"
          label="联系电话"
          >
        </el-table-column>
        <el-table-column
        show-overflow-tooltip 
        prop="CENDDATE" 
        label="使用截止日期"
        sortable>
        </el-table-column>
      </el-table>
</template>

<script>
import Vue from 'vue'
import {Message,Table,TableColumn,Popover,Button} from 'element-ui'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(Button)
export default {
  props: {
    tableData: {
      type: Array,
      required: true,

    },
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 0) {
          return '';
        } 
        return 'warning-row';
      },
  }
};
</script>
<style lang='scss'>
.el-table{
    font-size: 12px;
}
.customauditTable .el-table td, .el-table th{
    padding: 0px 0 !important;
}
.el-table td{
    padding: 4px 0 !important;
}
.el-table .warning-row {
background: #f2f6fb;
}
.user .el-button--mini, .el-button--mini.is-round{
    padding: 0px !important;
}
.el-table .warning-row {
  background: #F3F6FB;
} 
</style>
<style lang="scss" scoped>
span{
    cursor: pointer;
    height: auto;
    display: inline-block;
    margin:0 4px 0 0;
}
.update{
    color:#88A0E9;
}
.delete{
    color:#EF753B !important;
    border:0px !important;
    background: rgba(0,0,0,0) !important;
    padding:0px !important;
}
.shenhe{
    color:#379A9A !important;
    border:0px !important;
    background: rgba(0,0,0,0) !important;
    padding:0px !important;
}
.bt{
    width:65px !important;
}
.enabled{
  width: 50px;
  height: 23px;
  text-align: center;
  line-height: 23px;
  border-radius: 4px;
}
</style>