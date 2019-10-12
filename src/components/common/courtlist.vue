<!-- 法院列表 -->
<template>
    <el-cascader
    @change="getlistchange"
    v-model="value"
    :placeholder="name"
    class="courtlist"
    size='mini'
    :options="options"
    :show-all-levels="false"
    :props="{ checkStrictly: true ,expandTrigger: 'hover', value:'fydm',label:'name'}"
    clearable>
    </el-cascader>
</template>

<script>
import Vue from "vue";
import {getcourtlist} from '@/api/express'
import {Cascader} from 'element-ui';
Vue.use(Cascader)
export default {
  props: {
    name: {
      type: String,
      default: '法院列表'
    },
  },
  data() {
    return {
        options:[],
        value:[]
    }
  },
  created() {
      this.getlist()
  },
  mounted() {},
  methods:{
    getlist(){
        getcourtlist().then(response => {
            this.options.push(response.data)
        })
            .catch(error => {
               this.options = [];
            });
    },
    getlistchange(val){
      this.$emit('getfydm', val[(val.length)-1])
    }
  }
};
</script>
<style>
.courtlist{
    width: 100%;
}
</style>

