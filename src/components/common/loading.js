
import { Loading } from 'element-ui'
let loading
export let startLoading = function () {
    loading = Loading.service({
      lock: true,
      text: '加载中……',
      background: 'rgba(0, 0, 0, 0.7)'
    })
}
export let endLoading = function () {
  loading.close()
}

  