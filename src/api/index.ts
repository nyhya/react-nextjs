import axios, {
	AxiosInstance,
	AxiosInterceptorManager,
	AxiosRequestConfig,
	AxiosResponse,
} from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
	const instance = axios.create({
		headers: {
			withCredentials: true,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Content-Type': 'application/json',
		},
	});

	return setInterceptors(instance);
}

type CustomResponseFormat<T = any> = {
	response: T;
	refreshedToken?: string;
};
interface CustomInstance extends AxiosInstance {
	interceptors: {
		request: AxiosInterceptorManager<AxiosRequestConfig>;
		response: AxiosInterceptorManager<AxiosResponse<CustomResponseFormat>>;
	};
	getUri(config?: AxiosRequestConfig): string;
	request<T>(config: AxiosRequestConfig): Promise<T>;
	get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
	delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
	head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
	options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
	post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
	put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
	patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

const instance: AxiosInstance = createInstance();
export { instance };
