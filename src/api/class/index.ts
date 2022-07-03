import { instance } from 'api';
import {
	IClassDetailResView,
	IClassResList,
	IClassSearchParams,
	IImageUpload,
} from 'types/\bclass';

const fatchClassList = async (value: IClassSearchParams) => {
	try {
		const res = await instance.get<IClassResList>('/api/classes', {
			params: value,
		});

		if (res) {
			return res;
		}
	} catch (e) {
		console.log('ClassList Error');
	}
};

const fatchClassMainBanner = async () => {
	try {
		const res = await instance.get<IClassResList>('/api/classes/ads');
		if (res) {
			return res;
		}
	} catch (e) {
		console.log('Class MainBanner Error');
	}
};

const fatchClassDetailView = async (classId: string) => {
	try {
		const res = await instance.get<IClassDetailResView>(
			`/api/classes/${classId}`,
		);
		if (res) {
			return res;
		}
	} catch (e) {
		console.log('Class Detail View Error');
	}
};

const PostClassImageLoader = async (image: FormData) => {
	const config = {
		headers: {
			'content-type': 'multipart/form-data',
		},
	};
	try {
		const res = await instance.post<IImageUpload>(
			`/api/file/uploadMultipleFiles`,
			image,
			config,
		);
		if (res) {
			return res;
		}
	} catch (e) {
		console.log('class image loader');
	}
};

export {
	fatchClassList,
	fatchClassMainBanner,
	fatchClassDetailView,
	PostClassImageLoader,
};
