import { useUserStore } from '@/store/modules/user.js';
import StatusCode from '@/enums';

class Request {
	/**
	 * 内部的属性定义有：基础配置(config)、拦截器(interceptor)
	 */
	constructor() {
		this.config = {
			baseUrl: process.env.UNI_BASE_URL, // 请求的根域名
			header: {}, // 默认的请求头
			method: 'POST',
			showLoading: true, // 是否显示请求中的loading
			loadingText: '加载中...',
			loadingTime: 500, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
			timer: null, // 定时器
			loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		};
		/**
		 * description: 处理状态码
		 */
		this.handleStatusCode = () => {
			const {
				data: { code, message, data }
			} = res || {};
			if (code === StatusCode.SUCCESS) {
				return data;
			} else if (code === StatusCode.LOGIN_ERROR) {
				Utils.showToast('登陆失效');
			} else if (code === StatusCode.SYSTEM_ERROR) {
				Utils.showToast('系统错误');
			} else {
				Utils.showToast(message);
			}
			return Promise.reject(data);
		};
		/**
		 * 包含了值都为空的请求拦截和响应拦截属性的拦截器对象。
		 */
		this.interceptor = {
			// 请求拦截
			request: (options) => {
				// 用户授权
				options.header = {
					...options.header,
					...this.config.header,
					Authorization: useUserStore().token ? 'Bearer ' + useUserStore().token : ''
				};
				options.url = this.config.baseUrl + options.url;
				options.method = options.method || this.config.method;
				return options;
			},
			// 响应拦截
			response: (response) => {
				// apiData 是 api 返回的数据
				const apiData = response.data;
				if (response && result.length > 0) {
					apiData.data = JSON.parse(result);
				}
				// 根据返回的code值来做不同的处理（和后端约定）
				this.handleStatusCode(apiData);
			}
		};
		this.request = (options = {}) => {
			// 检查请求拦截
			options = this.interceptor.request(options);
			return new Promise((resolve, reject) => {
				options.complete = (response) => {
					// 请求返回后，隐藏loading
					uni.hideLoading();
					// 清除定时器，如果请求快，不用显示loading
					clearTimeout(this.config.timer);
					this.config.timer = null;
					// 响应拦截
					let resInterceptors = this.interceptor.response(response, options.url);
					resolve(resInterceptors);
				};
				// 是否显示loading，加一个是否有已经有了timer的判断，否则两个同时请求的时候，后者会清除前者的定时器id，而没有清除前者的定时器，导致前者超时，一直显示loading
				if (options.showLoading && this.config.showLoading && !this.config.timer) {
					this.config.timer = setTimeout(() => {
						uni.showLoading({
							title: this.config.loadingText,
							mask: this.config.loadingMask
						});
					}, this.config.loadingTime);
				}
				uni.request(options);
			});
		};
	}
}

export default new Request().request;
