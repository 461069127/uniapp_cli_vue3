import request from '@/utils/request';

/** 获取地区地址选择 */
export function getAddressApi(data) {
	return request({
		url: '/api/v1/sys/region/list',
		method: 'POST',
		data
	});
}

/** 分页查询-学校下拉列表 */
export function schoolListApi(data) {
	return request({
		url: '/api/v1/sys/school/list',
		method: 'POST',
		data
	});
}

/** 分页查询-班级下拉列表 */
export function schoolClassListApi(data) {
	return request({
		url: '/api/v1/sys/school/class/list',
		method: 'POST',
		data
	});
}
