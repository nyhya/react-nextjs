/**
 * @function preRegDate
 * @param date
 * @returns d-day
 */
function preRegDate(date: string) {
	if (date !== null) {
		const today = new Date();
		const dday = new Date(date);
		const gap = dday.getTime() - today.getTime();
		const result = Math.ceil(gap / (1000 * 60 * 60 * 24));
		return result;
	}
	return -1;
}

function dataURItoBlob(dataURI: string) {
	const byteString = atob(dataURI.split(',')[1]);
	const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	const bb = new Blob([ab], { type: mimeString });
	return bb;
}

export { preRegDate, dataURItoBlob };
