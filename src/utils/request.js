import axios from 'axios';

const url = 'http://localhost:8080';

function axiosRequest(api, method, data, form) {
  const head = `application/${form};charset=UTF-8`;
  const headers = {
    'Content-Type': head,
  };
  return new Promise((resolve, reject) => {
    axios({
      url: url + api,
      headers,
      method,
      params: data,
      data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => {
        reject(new Error('fail'));
      });
  });
}

// json 形式提交
export function axiosGetJson(api, data) {
  return axiosRequest(api, 'GET', data, 'json');
}

export function axiosPostJson(api, data) {
  return axiosRequest(api, 'POST', data, 'json');
}

export function axiosPutJson(api, data) {
  return axiosRequest(api, 'PUT', data, 'json');
}

// form表单提交
export function axiosGet(api, data) {
  return axiosRequest(api, 'GET', JSON.stringify(data), 'x-www-form-urlencoded');
}

export function axiosPost(api, data) {
  return axiosRequest(api, 'POST', JSON.stringify(data), 'x-www-form-urlencoded');
}

export function axiosPut(api, data) {
  return axiosRequest(api, 'PUT', JSON.stringify(data), 'x-www-form-urlencoded');
}
