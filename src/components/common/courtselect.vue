<!-- 法院列表 -->
<template>
    <el-select  
    @change="getlistchange"
    v-model="value" 
    :placeholder="name"
    class="courtlist"
    size='mini'
    clearable
    >
        <el-option
        v-for="item in options"
        :key="item.fydm"
        :label="item.name"
        :value="item.fydm">
        </el-option>
    </el-select>
</template>

<script>
import Vue from "vue";
import {getcourtlist} from '@/api/express'
import {Select,Option} from 'element-ui';
Vue.use(Select)
Vue.use(Option)
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
      this.$emit('getfydm', val)
    }
  }
};
</script>
<style>
.courtlist{
    width: 100%;
}
</style>

