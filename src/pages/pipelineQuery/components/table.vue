<!-- :row-class-name="tableRowClassName" 
 :header-cell-style="{background:'#F3F6FB',color:'#858A9E'}"  -->
<template>
<el-table class="perTable" :data="tableData">
    <el-table-column
      fixed
      label="序号"
      type="index"
      >
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="qsfymc" label="起始法院">
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="fqxtmc" label="发起系统">
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="jsfymc" label="接收法院">
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="jsxtmc" label="接收系统">
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="wjmc" label="文件名称">
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="wjdx" label="文件大小">
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="fssj" width="100"  label="发送日期" sortable>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="ddsj" width="100"  label="到达日期" sortable>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="jssj" width="100"  label="接收日期" sortable>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="jhbx" width="100"  label="交换编号" sortable>
    </el-table-column>
    <el-table-column width="80" show-overflow-tooltip prop="zt" label="状态" align="center">
         <!-- <template slot-scope="scope">
            {{
            scope.row.zt == 0 ? '待签收':
            scope.row.zt == 1 ? '待送达':
            scope.row.zt == 2 ? '已揽收':
            scope.row.zt == 3 ? '错误':'无'}}</template> -->
    </el-table-column>
</el-table>
</template>

<script>
import Vue from 'vue'
import {
    Message,
    Table,
    TableColumn,
    Popover,
    Button
} from 'element-ui'
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
        tableRowClassName({
            row,
            rowIndex
        }) {
            if (rowIndex % 2 === 0) {
                return '';
            }
            return 'warning-row';
        },
    }
};
</script>

<style lang="scss">
.el-table {
    font-size: 12px;
}

.perTable .el-table td,
.el-table th {
    padding: 0px 0 !important;
}

.el-table td {
    padding: 4px 0 !important;
}

.el-table .warning-row {
    background: #f2f6fb;
}

.user .el-button--mini,
.el-button--mini.is-round {
    padding: 0px !important;
}

.el-table .warning-row {
    background: #F3F6FB;
}
</style>
<style lang="scss" scoped>
span {
    cursor: pointer;
    height: auto;
    display: inline-block;
}

.update {
    color: #88A0E9;
}

.none {
    cursor: not-allowed;
    color: #e3e3e5;
}

.nonedelete {
    cursor: not-allowed;
    color: #e3e3e5 !important;
    border: 0px !important;
    background: rgba(0, 0, 0, 0) !important;
}

.updatepass {
    color: #99ce9e;
    border: 0px !important;
    background: rgba(0, 0, 0, 0) !important;
}

.delete {
    color: #EF753B !important;
    border: 0px !important;
    background: rgba(0, 0, 0, 0) !important;
}

.bt {
    width: 65px !important;
}

.enabled {
    width: 50px;
    height: 23px;
    text-align: center;
    line-height: 23px;
    border-radius: 4px;
    cursor: auto;
}
</style>
