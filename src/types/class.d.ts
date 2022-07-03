import { number } from 'prop-types';

/**
 * @interface IClassResList
 * @description 클래스 목록 Response
 */
interface IClassResList {
	[x: string]: any;
	page: number;
	pageScale: number;
	totalCount?: number;
	searchOption?: Array<{
		code: string;
		codeName: string;
		grpEtc1: string;
		grpEtc2: string;
		grpEtc3: string;
		parentCode: string;
	}>;
	items?: Array<IClassListItem>;
}

/**
 * @interface IClassSearchParams
 * @description 클래스 목록 받아오기 Params
 */
interface IClassSearchParams {
	curPage?: number;
	pageScale?: number;
	plazaFg?: string;
	gradePoint?: number | null;
	onlineYn?: string;
	startPeriod?: string;
	endPeriod?: string;
	searchOption?: string;
	keyword?: string;
	isApply?: string;
	sortType?: string;
	ispc?: string;
	preRegisterYn?: string;
	preRegCloseYn?: string;
}

/**
 * @function IClassListItem
 * @description 클래스 목록 아이템
 */

interface IClassListItem {
	bid: number;
	nCnt: number;
	title: string;
	plazaFg: string;
	eventFromDt: string;
	eventFromHh: string;
	eventFromMm: string;
	eventFromDay: string;
	eventToDt: string;
	eventToHh: string;
	eventToMm: string;
	eventToDay: number;
	eventAddrSido: string;
	eventAddr1: string;
	hostName: string;
	preRegCloseDt: string;
	classState: string;
	homepage: string;
	adViewYn: AdViewYn;
	gradePoint: number;
	onLineYn: OnLineYn;
	gradeYn: GradeYn;
	adminYn: string;
	closeState: string;
	preRegisterYn: PreRegisterYn;
	speakerName1: string;
	speakerName2: string;
	speakerName3: string;
	speakerBelong1: string;
	speakerBelong2: string;
	speakerBelong3: string;
	insertDt: string;
	uploadfile1: string;
	uploadfile2: string;
	uploadfile1Stored: string;
	uploadfile2Stored: string;
	fileIdx1: string;
	fileIdx2: string;
	eventConnectType: EventConnectType;
	preRegClosed: boolean;
}

interface IClassDetailResView {
	bid: SVGAnimatedNumberList;
	title: string;
	plazaFg: string;
	eventFromDt: string;
	eventFromHh: string;
	eventFromMm: string;
	eventFromDay: number;
	eventToDt: string;
	eventToHh: string;
	eventToMm: string;
	eventToDay: number;
	eventAddrSido: string;
	eventAddr1: string;
	hostName: string;
	preRegCloseDt: string;
	classState: string;
	homepage: string;
	adViewYn: 'Y' | 'N';
	gradePoint: number;
	onLineYn: 'Y' | 'N' | 'B';
	gradeYn: 'Y' | 'N';
	adminYn: 'Y' | 'N';
	preRegisterYn: 'Y' | 'N' | 'U';
	speakerName1: string;
	speakerName2: string;
	speakerName3: string;
	speakerBelong1: string;
	speakerBelong2: string;
	speakerBelong3: string;
	insertDt: string;
	uploadfile1: string;
	uploadfile2: string;
	uploadfile1Stored: string;
	uploadfile2Stored: string;
	fileIdx1: number;
	fileIdx2: number;
	preRegClosed: boolean;
	content: string;
	regPrice1: number;
	eventZip: string;
	eventInfo: string;
	preThirdInfo: string;
	preUseInfo: string;
	contactZip: string;
	contactAddr1: string;
	contactAddr2: string;
	tel1: string;
	tel2: string;
	tel3: string;
	mobile1: string;
	mobile2: string;
	mobile3: string;
	email1: string;
	email2: string;
	scrapYn: 'Y' | 'N';
	uploadfile3: string;
	uploadfile3Stored: string;
	fileIdx3: number;
	speakerIdx1: number;
	speakerIdx2: number;
	speakerIdx3: number;
	speakerProfile1: string;
	speakerProfile2: string;
	speakerProfile3: string;
	speakerImageFile1: string;
	speakerImageFile2: string;
	speakerImageFile3: string;
	speakerImagePath1: string;
	speakerImagePath2: string;
	speakerImagePath3: string;
	isApply: 'selfApply' | 'duplicateApply' | 'canApply';
	fileList: Array<{
		grpCode:
			| 'CLASS_ONLINE'
			| 'SCHOOL'
			| 'CLASS'
			| 'NEWS'
			| 'SURVEY'
			| 'INVITATIONS'
			| 'LEASE'
			| 'JUNGGO'
			| 'SEARCH_OPTION_PRE_REG';
		bid: number;
		leafletFileName: string;
		leafletFileUrl: string;
		uploadfileSize: number;
		insertId: string;
		insertDt: string;
	}>;

	ncnt: number;
}

enum AdViewYn {
	Yes = 'Y',
	No = 'N',
}

enum OnLineYn {
	Y = 'Y',
	N = 'N',
	B = 'B',
}

enum GradeYn {
	Yes = 'Y',
	No = 'N',
}

enum adminYn {
	Yes = 'Y',
	No = 'N',
}

enum PreRegisterYn {
	Y = 'Y',
	N = 'N',
	U = 'U',
}

enum EventConnectType {
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
}

/**
 * @enum ListDesignType
 * @description 리스트 컴포넌트 타입
 */
enum ListDesignType {
	THUMB = 'thumb',
	LIST = 'list',
}

interface IClassMake {
	ispc?: 'P' | 'M';
	title?: string;
	content?: string;
	adType?: 'PREMIUM' | 'GENERAL';
	adFromDt?: string;
	plazaFg?: string;
	hostGrpCode?: string;
	hostName?: string;
	eventFromDt?: string;
	eventToDt?: string;
	eventFromHh?: string;
	eventToHh?: string;
	eventFromMm?: string;
	eventToMm?: string;
	eventAddrSido?: string;
	eventInfo?: string;
	eventZip?: string;
	eventAddr1?: string;
	eventAddr2?: string;
	preRegCloseDt?: string;
	gradeYn?: 'Y' | 'N';
	gradePoint?: number;
	regPrice1?: number;
	accHolderNm?: 'string';
	accBankId?: number;
	accId?: string;
	uploadfile1Index?: number;
	leafletFileIndex?: number;
	onLineYn?: 'Y' | 'N' | 'B';
	uploadfile2Index?: number;
	contactZip?: string;
	contactAddr1?: string;
	contactAddr2?: string;
	tel1?: string;
	tel2?: string;
	tel3?: string;
	mobile1?: string;
	mobile2?: string;
	mobile3?: string;
	email1?: string;
	email2?: string;
	homepage?: string;
	preRegisterYn?: 'Y' | 'N' | 'U';
	preRegisterUrl?: string;
	preRegisterList?: Array<string>;
	preThirdInfo?: string;
	preUseInfo?: string;
}

/**
 * @function IImageUpload
 * @description 이미지 업로드
 */
interface IImageUpload {
	resultCode: string;
	resultMsg: string;
	result: Array<IImageItem>;
}

interface IImageItem {
	inputTagName: string;
	order: number;
	isUpload: boolean;
	originalFileName: string;
	fileSize: number;
	idx: number;
	urlPath: string;
}
export {
	IClassResList,
	IClassSearchParams,
	IClassListItem,
	ListDesignType,
	IClassDetailResView,
	IClassMake,
	IImageUpload,
};
