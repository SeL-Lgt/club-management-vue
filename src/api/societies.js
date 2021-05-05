import { axiosGetJson, axiosPostJson } from '@/utils/request';

/**
 * 查询社团类型
 * @returns {Promise | Promise<unknown>}
 */
export function querySocietiesType() {
  return axiosGetJson('/societies/getSocietiesType');
}

/**
 * 查询职位类型
 * @returns {Promise | Promise<unknown>}
 */
export function querySocietiesJobs() {
  return axiosGetJson('/societies/getSocietiesJobs');
}

/**
 * 创建社团
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function createSocieties(params) {
  return axiosPostJson('/societies/createSocieties', params);
}

/**
 * 查询所有社团
 * @returns {Promise | Promise<unknown>}
 */
export function querySocietiesByAll() {
  return axiosGetJson('/societies/getSocietiesByAll');
}

/**
 * 查询单一社团信息
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function querySocietiesByCondition(params) {
  return axiosGetJson('/societies/querySocietiesByCondition', params);
}

/**
 * 添加社团成员
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function addSocietiesPersonnel(params) {
  return axiosPostJson('/societiesPersonnel/addSocietiesPersonnel', params);
}

/**
 * 查询社团成员
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function querySocietiesPersonnelByOne(params) {
  return axiosPostJson('/societiesPersonnel/querySocietiesPersonnelByOne', params);
}

/**
 * 模糊搜索社团成员
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function querySocietiesPersonnelByExample(params) {
  return axiosPostJson('/societiesPersonnel/querySocietiesPersonnelByExample', params);
}

/**
 * 退出社团
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function deleteSocietiesPersonnel(params) {
  return axiosPostJson('/societiesPersonnel/deleteSocietiesPersonnel', params);
}

/**
 * 修改社团信息
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function updateSocietiesInfo(params) {
  return axiosPostJson('/societies/updateSocietiesInfo', params);
}

/**
 * 查询社团所有成员
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function querySocietiesPersonnelAll(params) {
  return axiosPostJson('/societiesPersonnel/querySocietiesPersonnelAll', params);
}

/**
 * 获取社长信息
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function getPresident(params) {
  return axiosPostJson('/societiesPersonnel/getPresident', params);
}
