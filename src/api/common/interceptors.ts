import { AxiosInstance } from 'axios';

export function setInterceptors(instance: AxiosInstance) {
	instance.interceptors.request.use(
		function (config) {
			// 요청을 보내기 전에 특정 코드
			if (config.headers) {
				config.headers.Authorization =
					'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJ0ZXN0ZG9jMSIsImV4cCI6MTY1NjY1MDYzMX0.0QF1IS4OlciRP6Zjwzql-oDR-YCUMlrJHBDYh4bQIe0';
			}

			return config;
		},
		function (error) {
			// 에러가 컨포넌트 단으로 오기전에 처리
			return Promise.reject(error);
		},
	);

	// Add a response interceptor
	instance.interceptors.response.use(
		function (response) {
			// 서버에 요청을 보내고 응답을 받기전에 처리
			return response;
		},
		function (error) {
			// 응답을 받을 때 응답이 에러인 경우 처리
			return Promise.reject(error);
		},
	);

	return instance;
}
