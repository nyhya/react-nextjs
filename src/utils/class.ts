const trainingCourse = (category: string) => {
	let selectedCategory = '';
	switch (category) {
		case '1':
			selectedCategory = '학술대회';
			break;
		case '2':
			selectedCategory = '세미나';
			break;
		case '3':
		case '4':
		case '5':
		case '7':
		case '9':
		case '10':
			selectedCategory = '기타';
			break;
		case '6':
			selectedCategory = '심포지엄';
			break;
		case '8':
			selectedCategory = '연수강좌';
			break;
		default:
			break;
	}
	return selectedCategory;
};

const eventConnectType = (type: string) => {
	let eventType = '';
	switch (type) {
		case 'B':
			eventType = '온/오프라인';
			break;
		case 'Y':
			eventType = '온라인';
			break;
		case 'N':
			eventType = '오프라인';
			break;
		default:
			break;
	}

	return eventType;
};

export { trainingCourse, eventConnectType };
