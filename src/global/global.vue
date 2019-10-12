<script>
function getDate () {
  var time = ''
  var y, m
  y = new Date().getFullYear()
  m = new Date().getMonth()

  if (m < 10) {
    m = '0' + m
  } else {
    m = m.toString()
  }
  time = y + m
  return time
}
const org = {
  orgId: sessionStorage.getItem('orgId'),
  orgType: sessionStorage.getItem('orgType'),
  querDate: sessionStorage.getItem('querDate') ? sessionStorage.getItem('querDate') : getDate(),
  orgLevel: sessionStorage.getItem('orgLevel')
}
const OrgName = {
  orgName: '选择机构'
}
const path = {
  path: ''
}
const menuData = []
export default {
  org, OrgName, path
}
</script>
