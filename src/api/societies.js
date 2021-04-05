import { axiosGetJson, axiosPostJson } from '@/utils/request';

/**
 * 查询社团类型
 * @returns {Promise | Promise<unknown>}
 */
export function querySocietiesType() {
  return axiosGetJson('/societies/getSocietiesType');
}

/**
 * 创建社团
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function createSocieties(params) {
  return axiosPostJson('/societies/createSocieties', params);
}
