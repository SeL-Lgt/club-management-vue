import { axiosPostJson } from '@/utils/request';

/**
 * 查询社团任务
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function queryTask(params) {
  return axiosPostJson('/task/queryTask', params);
}

/**
 * 查询我的任务
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function queryMyTask(params) {
  return axiosPostJson('/task/queryMyTask', params);
}

/**
 * 更新任务
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function updateTask(params) {
  return axiosPostJson('/task/updateTask', params);
}

/**
 * 删除任务
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function deleteTask(params) {
  return axiosPostJson('/task/deleteTask', params);
}

/**
 * 创建任务
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function createTask(params) {
  return axiosPostJson('/task/createTask', params);
}
