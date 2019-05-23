export function getRedirectTo({ type, avatar }) {
  // 判断type，跳往/genius或者/boss 
  // 如果没有头像，则跳往到完善信息页面 /geniusinfo 或者 /bossinfo
  let url = (type === 'genius') ? '/genius' : '/boss';
  if (!avatar) {
    url += 'info';
  }
  return url;
}
