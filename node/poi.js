let fs = require("fs");
let Tool = require('./CoordTransform.js')

async function getCount(url) {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      resolve(+data.count);
    }
  })
}

async function getPageData(url) {
  let result = ""
  let count = 0;
  return new Promise(async (resolve, reject) => {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const { pois } = data;
      pois.forEach(item => {
        const { location, name, address } = item;
        const lng = location.split(",")[0];
        const lat = location.split(",")[1];

        const wgs84 = Tool.CoordTransform.GCJ02ToWGS84(lng, lat);
        result += `${name},${wgs84[0]},${wgs84[1]},${address}`;
        result += "\r\n"
        count += 1;

      });
      resolve({ result, count });
    }
  })
}

function writeFile(path, content) {
  fs.writeFile(path, content, function (err) {
    if (err) {
      return console.log('文件写入失败' + err.message)
    } else {
      console.log('文件写入成功!')
    }
  })
}

async function test() {
  const key = '0ee24126ea61ec60a670675fd8cd29b1'
  const city = "北京"
  const keywords = '肯德基'
  let page = 1;
  const offset = 20;
  const base = `https://restapi.amap.com/v3/place/text?`

  let url = `${base}keywords=${keywords}&city=${city}&page=${page}&key=${key}&offset=${offset}`;
  const count = await getCount(url);
  console.error(count);
  console.error(url);


  let resultAll = "";
  resultAll += `name,lng,lat,address`
  resultAll += "\r\n"

  let countWrite = 0;
  for (let i = 0; i < Math.ceil(count / offset); i++) {
    url = `${base}keywords=${keywords}&city=${city}&page=${page}&key=${key}&offset=${offset}`;
    const { result, count:pageCount } = await getPageData(url)
    resultAll += result;
    countWrite += pageCount;
    if (pageCount == 0) {
      break;
    }
    page += 1;
  }

  console.error("数据数量:", countWrite);

  writeFile(`./data/${keywords}.csv`, resultAll)
}

test()

