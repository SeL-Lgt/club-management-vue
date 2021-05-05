import { axiosPostJson } from '@/utils/request';
import axios from 'axios';
import qs from 'qs';

const url = 'http://localhost:9090';

/**
 * 上传照片
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function saveImage(params) {
  // return axiosPostJson('/photo/saveImage', params);
  return axios({
    url: `${url}/photo/saveImage`,
    method: 'post',
    data: qs.stringify(params),
  })
    .then((res) => res.data);
}

/**
 * 查询社团照片
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function queryPhotoByAll(params) {
  return axiosPostJson('/photo/queryPhotoByAll', params);
}

/**
 * 模糊查询社团照片
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function queryPhotoByExample(params) {
  return axiosPostJson('/photo/queryPhotoByExample', params);
}

/**
 * 更新照片信息
 * @param params
 * @returns {Promise<unknown>}
 */
export function updatePhoto(params) {
  return axiosPostJson('/photo/updatePhoto', params);
}

export function deletePhoto(params) {
  return axiosPostJson('/photo/deletePhoto', params);
}
