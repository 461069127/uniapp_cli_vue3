/**
 * 命名=》aaaBbbCcc
 */

import request from '@/utils/request';
export function apiDemoPost(data) {
	return request({
		url: '/mock/user',
		method: 'POST',
		data
	});
}
export function apiDemoGet(data) {
	return request({
		url: '/posts',
		method: 'GET',
		data
	});
}
