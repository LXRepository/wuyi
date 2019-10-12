export function parseTime(time) {
  if (time) {
    var date = new Date(time)
    var year = date.getFullYear()
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    // 拼接
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  } else {
    return ''
  }
}

export function parseDate(date) {
  if (date) {
    var date = new Date(date)
    var year = date.getFullYear()
    var month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    // 拼接
    return year + '-' + month + '-' + day
  } else {
    return ''
  }
}

export function parseDay(date) {
  if (date) {
    var date = new Date(date)
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    // 拼接
    return hours + ':' + minutes
  } else {
    return ''
  }
}

export function dellength (_this, value, name) {
  let namearr = name.split('.')
  if (namearr.length >1) {
    if (value.length >= 20) {
      _this[namearr[0]][namearr[1]] = value.substring(0, 19)
    } else {
      _this[name] = value
    }    
  } else {
    if (value.length >= 20) {
      _this[name] = value.substring(0, 19)
    } else {
      _this[name] = value
    }
  }
}
