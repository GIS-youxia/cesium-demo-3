import JSZip from 'jszip'

/**
 * 加载压缩文件
 * @export
 * @param {*} { url,name,type="string"}
 * @return {*}
 * @see https://stuk.github.io/jszip/documentation/examples/get-binary-files-ajax.html
 */
export function loadZipFile({ url,name,type="string"}) {
  return new Promise((resolve, reject) => {
    // 1) fetch the url
    fetch(url)
      // 2) filter on 200 OK
      .then(function (response) {
        if (response.status === 200 || response.status === 0) {
          return Promise.resolve(response.blob());
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      })
      // 3) chain with the zip promise
      .then(JSZip.loadAsync)
      .then( zip=> {
        return zip.file(name).async(type)
      })
      // 5) display the result
      .then(data => {
        resolve(data);
      }, error=>{
        reject(error)
      });
  })
}
