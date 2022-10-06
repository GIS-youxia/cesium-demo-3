export class DOM {
  constructor(container) {
    this.container = container;
  }

  createInfo(info) {
    const dom = `
    <div class="info">
      <div class="title">
        ${info.name}
        <div class="close"></div>
      </div>

      <div class="phone">
        <div class="item-key">空气质量:</div>
        <div class="item-value">${info.aqi}</div>
      </div>

      <div class="phone">
        <div class="item-key">级别:</div>
        <div class="item-value">${info.level}</div>
      </div>
    </div>
    `
    this.container.innerHTML = dom;

    document.querySelector(".close").addEventListener("click", () => {
      info.closeCallback && info.closeCallback();
      this.container.innerHTML = ""
    })
  }
}
