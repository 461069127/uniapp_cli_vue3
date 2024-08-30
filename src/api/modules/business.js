import request from '@/utils/request.js';

// 获取商户信息 	showLoading:false
export function getMerchantByUserIdApi(data) {
	return request({
		url: '/api/v1/merchant/getMerchantByUserId',
		method: 'POST',
		data
	});
}

// 保存商家信息
export function saveMerchantApi(data) {
	return request({
		url: '/api/v1/merchant/saveMerchant',
		method: 'POST',
		data
	});
}

// 保存扫码信息
export function saveDeclarationScanQRCodesRecordApi(data) {
	return request({
		url: '/api/v1/declaration/scanQRCodes/saveDeclarationScanQRCodesRecord',
		method: 'POST',
		data
	});
}
