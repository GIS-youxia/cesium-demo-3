export class DataManager {
  constructor() {
    // 已经添加的集合
    this.addedCollection = new Map();
  }

  isInclude(id) {
    return this.addedCollection.has(id)
  }

  remove(id) {
    this.addedCollection.delete(id);
  }

  add(id) {
    if (this.isInclude(id)) {
      console.error("error add");
    }
    this.addedCollection.set(id,id)
  }
}
