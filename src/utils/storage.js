/*
使用localStorage存储数据,以便于刷新时，数据存在
 */
/* 存储数据 */
export const setItem = (key, data) => {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  window.sessionStorage.setItem(key, data)
}
/* 获取数据 */
export const getItem = key => {
  const data = window.sessionStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
/* 删除数据 */
export const delItem = key => {
  window.sessionStorage.removeItem(key)
}
