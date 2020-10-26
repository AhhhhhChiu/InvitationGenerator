const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getDeviceCustomBarHeight = (originSystemInfo) => {
  const targetSystem = originSystemInfo.toLowerCase();
  return [
    { system: "android", height: "48"},
    { system: "ios", height: "44"}
  ].find((systemItem) => targetSystem.includes(systemItem.system)) || { height: "44" };
}

module.exports = {
  formatTime: formatTime,
  getDeviceCustomBarHeight: getDeviceCustomBarHeight
}
