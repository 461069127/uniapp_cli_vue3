import * as assress from './modules/address.js';
import * as business from './modules/business.js';

const apis = {
	assress,
	business
};

console.log(apis);

export const useRequest = () => apis;
