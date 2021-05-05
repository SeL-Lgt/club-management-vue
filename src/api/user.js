import { axiosPostJson, axiosGetJson } from '@/utils/request';

/**
 * 登录
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function login(params) {
  return axiosPostJson('/user/login', params);
}

/**
 * 注册
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function registered(params) {
  return axiosPostJson('/user/registered', params);
}

/**
 * 更新用户信息
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function updateUser(params) {
  return axiosPostJson('/user/updateUser', params);
}

/**
 * 查询用户信息
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function queryUserByNumber(params) {
  return axiosPostJson('/user/queryUserByNumber', params);
}

/**
 * 查询指导老师
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function getTeacher() {
  return axiosGetJson('/user/getTeacher');
}
