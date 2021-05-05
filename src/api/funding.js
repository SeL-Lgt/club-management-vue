import { axiosPostJson } from '@/utils/request';

/**
 * 创建社团
 * @returns {Promise | Promise<unknown>}
 */
export function createFunding(params) {
  return axiosPostJson('/funding/createFunding', params);
}

/**
 * 更新任务状态
 * @returns {Promise | Promise<unknown>}
 */
export function updateFunding(params) {
  return axiosPostJson('/funding/updateFunding', params);
}

/**
 * 查询所有任务(模糊查询)
 * @returns {Promise | Promise<unknown>}
 */
export function queryFundingByAll(params) {
  return axiosPostJson('/funding/queryFundingByAll', params);
}

/**
 * 查询我的任务
 * @returns {Promise | Promise<unknown>}
 */
export function queryFundingByMy(params) {
  return axiosPostJson('/funding/queryFundingByMy', params);
}
