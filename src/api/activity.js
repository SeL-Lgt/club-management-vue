import { axiosGetJson, axiosPostJson } from '@/utils/request';

/**
 * 创建社团活动
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function createActivity(params) {
  return axiosPostJson('/activity/createActivity', params);
}

/**
 * 删除活动
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function deleteActivity(params) {
  return axiosPostJson('/activity/deleteActivity', params);
}

/**
 * 查询所有活动
 * @returns {Promise | Promise<unknown>}
 */
export function queryActivityByAll(params) {
  return axiosGetJson('/activity/queryActivityByAll', params);
}

/**
 * 查询相应社团所有活动
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function queryActivityByExample(params) {
  return axiosPostJson('/activity/queryActivityByExample', params);
}

/**
 * 查询我的活动
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function queryActivityByMy(params) {
  return axiosPostJson('/activity/queryActivityByMy', params);
}

/**
 * 查询所有活动类型
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function queryActivityTypeByAll() {
  return axiosGetJson('/activity/queryActivityTypeByAll');
}

/**
 * 更新活动信息
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function updateActivity(params) {
  return axiosPostJson('/activity/updateActivity', params);
}

/**
 * 添加活动成员
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function addActivityPeople(params) {
  return axiosPostJson('/activity/addActivityPeople', params);
}

/**
 * 退出活动
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function deleteActivityPeople(params) {
  return axiosPostJson('/activity/deleteActivityPeople', params);
}
