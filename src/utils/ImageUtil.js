// eslint-disable-next-line import/prefer-default-export
export function getBase64(file) {
  return new Promise(((resolve, reject) => {
    const reader = new FileReader();
    let imgResult = '';
    reader.readAsDataURL(file);
    reader.onload = function () {
      imgResult = reader.result;
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.onloadend = function () {
      resolve(imgResult);
    };
  }));
}
