{C}<!--  -->
<template>
    <ul class="l_tree">
        <li class="l_tree_branch" v-for="item in model" :key="item.id">
            <div class="l_tree_click">
                <button type="button" class="l_tree_children_btn" v-if="item.children"  @click="toggle(item)">{{ !item.show ? '-' : '+' }}</button>
                <span class="l_folder">{{ item.name }}</span>
            </div>
            <ew-tree v-show="!item.show" v-if="item.children" :model="item.children"></ew-tree>
        </li>
    </ul>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'ewTree',
  components: {
  },
  props: {
    model: {},
  },
  data () {
    return {
    }
  },
  methods: {
    toggle(item) {
        var idx = this.model.indexOf(item)
        Vue.set(this.model[idx], 'show', !item.show)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>