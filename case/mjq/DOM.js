export class DOM {
  constructor(container) {
    this.container = container;
  }

  createInfo(info) {
    const dom = `
    <div class="info">
      <div class="title" style="background-color:${info.color}">
        ${info.title}
        <div class="close"></div>
      </div>
      <div class="person">
        <div class="item-key">姓名:</div>
        <div class="item-value">${info.person}</div>
      </div>
      <div class="phone">
        <div class="item-key">电&nbsp;&nbsp;&nbsp;话:</div>
        <div class="item-value">${info.phone}</div>
      <div>
    </div>
    `
    this.container.innerHTML = dom;

    document.querySelector(".close").addEventListener("click", () => {
      info.closeCallback && info.closeCallback();
      this.container.innerHTML = ""
    })
  }

  createCheck(info) {
    const dom = `
    <div class="info">
      <div class="title">
        <div>检测点-${info.id}</div>
        <div class="close"></div>
      </div>
      <div class="person">
        <div class="item-key">时间:</div>
        <div class="item-value">${info.time}</div>
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
