<template>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
      :page-size="size"
      :current-page="currentPage"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</template>

<script>
import Vue from "vue";
import {Pagination} from 'element-ui';
Vue.use(Pagination)
export default {
  props: {
    size: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      
    }
  },
  methods:{
    handleSizeChange(val) {
      this.$emit('page',  val)
    },
    handleCurrentChange(val) {
      this.$emit('page',  val)
    }
  }
};
</script>
