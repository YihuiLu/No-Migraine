let now_time = new Date()

class T_Time {
  minutes(res) {
    if (now_time.getMinutes() < 10) {
      var now_minutes = '0' + now_time.getMinutes().toString()
    } else {
      var now_minutes = now_time.getMinutes().toString()
    }
    return now_minutes
  }
}

export {
  T_Time
}