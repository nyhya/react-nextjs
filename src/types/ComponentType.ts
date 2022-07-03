export enum ButtonType {
	RESET = 'Reset',
	SEARCH = 'Search',
	CHECK = 'check',
	LINE = 'line',
	NORMAL = 'normal',
	BACK = 'back',
	NORMALGRAY = 'normalgray',
	FILE = 'file',
}

export enum ButtonIconType {
	THUMBNAIL = 'Thumbnail',
	LIST = 'List',
	SCRAP = 'faverite',
	SHARE = 'share',
}

export interface ISelectType {
	value: number | string;
	label: string;
}

export enum EventTypeDesign {
	NORMAL = 'normal',
	LIGHTBLUE = 'lightBlue',
}

/**
 * @description 모달 타입
 */
export enum AlertModalType {
	NORMAL = 'normal',
	HEADERTYPE = 'headerType',
}

/**
 * @description 셀렉트 박스 디자인 타입
 */
export enum SelectBoxDesignType {
	SORT = 'sort',
	SCRAP = 'scrap',
	NORMAL = 'normal',
}

/**
 * @description INPUT HOOK 타입
 */
export enum InputHookType {
	TEXT = 'input',
	RADIO = 'Radio',
}
