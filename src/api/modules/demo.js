/**
 * 命名=》aaaBbbCcc
 */

import request from '@/utils/request';
export function apiDemoPost(data) {
	return request({
		url: '/mock/useer',
		method: 'POST',
		data
	});
}
export function apiDemoGet(data) {
	return request({
		url: '/postss',
		method: 'GET',
		data
	});
}
