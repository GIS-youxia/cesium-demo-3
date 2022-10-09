/**
 * 在文档中添加样式
 * @param {*} url
 */
export function addCSS(cssUrl) {
  const head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
  const style = document.createElement('link');

  style.setAttribute('rel', 'stylesheet');
  style.setAttribute('href', cssUrl);
  head.appendChild(style);
};

export function setTile(tile) {
  document.title = tile
}
