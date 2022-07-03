import styled from 'styled-components';
import PcWrapper from 'components/common/PcWrapper';
import ClassDropDown from 'components/ui/DropDownMenu';
import Button from 'components/ui/Button';
import {
	ButtonType,
	ISelectType,
	ButtonIconType,
	SelectBoxDesignType,
} from 'types/ComponentType';
import SelectBox from 'components/ui/SelectBox';
import IconTypeButton from 'components/ui/IconTypeButton';
import { useQuery } from 'react-query';
import { fatchClassList } from 'api/class';
import { IClassListItem, IClassSearchParams } from 'types/\bclass';
import { useCallback, useEffect, useState } from 'react';
import Pagelable from 'components/ui/Pagelable';
import ClassDatePicker from './ClassDatepicker';
import ClassSearchInput from './ClassSearchInput';
import ClassList from './ClassList';

const categoryOptions = [
	{ value: 0, label: '전체' },
	{ value: 1, label: '학술대회' },
	{ value: 2, label: '세미나' },
	{ value: 6, label: '심포지엄' },
	{ value: 8, label: '연수강좌' },
	{ value: 11, label: '기타' },
];

const onOffOptions = [
	{ value: 'B', label: '온/오프라인' },
	{ value: 'Y', label: '온라인' },
	{ value: 'N', label: '오프라인' },
];

const rateOptions = [
	{ value: 0, label: '전체' },
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
	{ value: 5, label: '5' },
	{ value: 6, label: '6' },
];

const scaleOption = [
	{ value: 'insert', label: '최신순' },
	{ value: 'view', label: '인기순' },
	{ value: 'close', label: '마감일순' },
];

const listCount = [
	{ value: 10, label: '10개 보기' },
	{ value: 30, label: '30개 보기' },
	{ value: 50, label: '50개 보기' },
];

const Container = styled.div`
	position: relative;
	width: 100%;
	.form-box {
		position: relative;
		width: 100%;
		height: 90px;
		display: flex;
		justify-content: space-around;
		/* align-items: center; */
		padding: 20px 30px;
		border-radius: 5px;
		box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
		background-color: #fff;
		transform: translateY(-45px);
		z-index: 99999;
	}
	z-index: 99999;
`;

const ListContainer = styled.div`
	border-bottom: 1px solid ${props => props.theme.dpGrayDeep};
	z-index: 99999;
	.list-sort-option-contain {
		width: 100%;
		.list-total-count {
			height: 35px;
			font-size: 24px;
			font-weight: 500;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.33;
			letter-spacing: -0.48px;
			text-align: left;
			color: ${props => props.theme.dpblack};
			margin-bottom: 20px;

			.active {
				color: ${props => props.theme.dpblue};
			}
		}

		.list-sort-option {
			display: flex;
			justify-content: space-between;
			padding-bottom: 20px;
			.select-box-contain {
				display: flex;
				flex-direction: row;
				& > * {
					margin-right: 10px;
				}
			}

			.list-view-type {
				position: relative;
				display: flex;
				flex-direction: row;
				align-items: center;
			}
		}
	}
`;

interface IProps {
	list?: Array<IClassListItem>;
}

export default function ClassSearch(props: IProps) {
	const { list } = props;
	const [listItemType, setListItemType] = useState('thumb');
	const [params, setParams] = useState<IClassSearchParams>({
		curPage: 1,
		pageScale: 10,
	});
	const [submitParams, setSubmitParams] = useState<IClassSearchParams>({
		curPage: 1,
		pageScale: 10,
	});
	const [reset, setReset] = useState(false);

	useEffect(() => {
		console.log('params', list, submitParams);
	}, [submitParams, list]);

	const { data } = useQuery(
		['classList', submitParams],
		() => fatchClassList(submitParams),
		{
			keepPreviousData: true,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);

	/**
	 * @function sortType
	 * @description 최신순,인기순,마감일순
	 */
	const sortType = useCallback(
		(selected: string | number) => {
			setSubmitParams({
				...submitParams,
				sortType: selected as string,
				curPage: 1,
			});
		},
		[submitParams],
	);

	/**
	 * @function pageScale
	 * @description 10개,30개50개
	 */
	const pageScale = useCallback(
		(selected: string | number) => {
			setSubmitParams({
				...submitParams,
				pageScale: selected as number,
				curPage: 1,
			});
		},
		[submitParams],
	);

	/**
	 * @function handleChangePage
	 * @description 페이지네이션
	 */
	const handleChangePage = useCallback(
		(selected: number) => {
			setSubmitParams({ ...submitParams, curPage: selected });
		},
		[submitParams],
	);

	/**
	 * @function changeDesignType
	 * @description 리스트 타입 변경
	 */
	const changeDesignType = useCallback(() => {
		if (listItemType === 'thumb') {
			setListItemType('normal');
		} else {
			setListItemType('thumb');
		}
	}, []);

	/**
	 * @function onSelectPlazaFg
	 * @description 클래스구분선택(1:학술대회,2:세미나,6:심포지엄,8:연수강좌,[3,4,5,7,9,10]:기타)
	 */
	const onSelectPlazaFg = useCallback(
		(selectOption: ISelectType) => {
			setParams({
				...params,
				plazaFg: selectOption.value as string,
				pageScale: submitParams.pageScale,
			});
		},
		[params, submitParams],
	);

	/**
	 * @function onSelectGradePoint
	 * @description 검색조건 - 평점 (Number 1~6)
	 */
	const onSelectGradePoint = useCallback(
		(selectOption: ISelectType) => {
			if (selectOption.value === 0) {
				setParams({ ...params, gradePoint: null });
			} else {
				setParams({
					...params,
					gradePoint: selectOption.value as number,
					pageScale: submitParams.pageScale,
				});
			}
		},
		[params, submitParams],
	);

	/**
	 * @function onSelectOnlineYn
	 * @description  온/오프라인 여부 (Y: 온라인, N: 오프라인, B: 온/오프라인)
	 */
	const onSelectOnlineYn = useCallback(
		(selectOption: ISelectType) => {
			setParams({
				...params,
				onlineYn: selectOption.value as string,
				pageScale: submitParams.pageScale,
			});
		},
		[params, submitParams],
	);

	/**
	 * @function onChangeInputValue
	 * @description  검색어 (String)
	 */
	const onChangeInputValue = useCallback(
		(inputValue: string) => {
			setParams({
				...params,
				keyword: inputValue,
				pageScale: submitParams.pageScale,
			});
		},
		[params, submitParams],
	);

	/**
	 * @function onClickReset
	 * @description  초기화버튼클릭
	 */
	const onClickReset = useCallback(() => {
		setParams({
			curPage: 1,
			pageScale: 10,
		});
		setReset(true);
	}, []);
	/**
	 * @function onResetHandler
	 * @description 리셋false
	 */

	const onResetHandler = useCallback(() => {
		setReset(false);
	}, []);

	/**
	 * @function onClickSearchList
	 * @description  검색버튼클릭
	 */
	const onClickSearchList = useCallback(() => {
		setSubmitParams({ ...params });
	}, [params]);

	/**
	 * @function onSelectDate
	 * @description 기간검색
	 */
	const onSelectDate = useCallback(
		(start: string, end: string) => {
			setParams({
				...params,
				startPeriod: start,
				endPeriod: end,
				pageScale: submitParams.pageScale,
			});
		},
		[params, submitParams],
	);

	return (
		<Container>
			<PcWrapper>
				<div className="form-box">
					<ClassDropDown
						reset={reset}
						onReset={onResetHandler}
						width="105px"
						option={categoryOptions}
						label="전체"
						onSelect={onSelectPlazaFg}
					/>
					<ClassDropDown
						reset={reset}
						onReset={onResetHandler}
						width="105px"
						option={onOffOptions}
						label="행사형태"
						onSelect={onSelectOnlineYn}
					/>
					<ClassDropDown
						reset={reset}
						onReset={onResetHandler}
						width="85px"
						option={rateOptions}
						label="연수평점"
						onSelect={onSelectGradePoint}
					/>
					<ClassDatePicker
						reset={reset}
						onReset={onResetHandler}
						onSelectDate={onSelectDate}
					/>
					<ClassSearchInput
						reset={reset}
						onReset={onResetHandler}
						label="검색"
						onChange={onChangeInputValue}
					/>
					<Button click={onClickReset} type={ButtonType.RESET} text="초기화" />
					<Button
						click={onClickSearchList}
						type={ButtonType.SEARCH}
						text="검색"
					/>
				</div>
				<ListContainer>
					<div className="list-sort-option-contain">
						<p className="list-total-count">
							총 <span className="active">{data?.data.totalCount}</span>건
						</p>
						<div className="list-sort-option">
							<div className="select-box-contain">
								<SelectBox
									type={SelectBoxDesignType.SORT}
									selectHandler={sortType}
									label="최신순"
									options={scaleOption}
								/>
								<SelectBox
									type={SelectBoxDesignType.SORT}
									selectHandler={pageScale}
									label="10개 보기"
									options={listCount}
								/>
							</div>
							<div className="list-view-type">
								<IconTypeButton
									active={listItemType === 'thumb'}
									after
									type={ButtonIconType.THUMBNAIL}
									onClick={changeDesignType}
								/>
								<IconTypeButton
									active={listItemType === 'normal'}
									onClick={changeDesignType}
									after={false}
									type={ButtonIconType.LIST}
								/>
							</div>
						</div>
					</div>
				</ListContainer>
				<ClassList type={listItemType} list={data?.data.items} />
				<Pagelable
					limit={10}
					selectPage={submitParams.curPage ? submitParams.curPage : 10}
					pageSclae={submitParams.pageScale ? submitParams.pageScale : 10}
					totalPage={data?.data.totalCount}
					onSelect={selected => handleChangePage(selected)}
				/>
			</PcWrapper>
		</Container>
	);
}

ClassSearch.defaultProps = {
	list: [
		{
			bid: 11397,
			nCnt: 22,
			title: 'John test',
			plazaFg: '1',
			eventFromDt: '2022-05-20',
			eventFromHh: '00',
			eventFromMm: '00',
			eventFromDay: 6,
			eventToDt: '2022-05-31',
			eventToHh: '00',
			eventToMm: '00',
			eventToDay: 3,
			eventAddrSido: null,
			eventAddr1: null,
			hostName: 'www.naver.com',
			preRegCloseDt: null,
			classState: null,
			homepage: null,
			adViewYn: 'Y',
			gradePoint: null,
			onLineYn: null,
			gradeYn: null,
			adminYn: null,
			closeState: null,
			preRegisterYn: 'Y',
			speakerName1: '',
			speakerName2: '',
			speakerName3: '',
			speakerBelong1: '',
			speakerBelong2: '',
			speakerBelong3: '',
			insertDt: '2022-05-18T09:41:36',
			uploadfile1: 'aws.png',
			uploadfile2: null,
			uploadfile1Stored:
				'http://10.200.16.114:8888/download/A004/42/202205/ebbe3ebc8e584dc19ae77ffacec06ea8.png',
			uploadfile2Stored: null,
			fileIdx1: null,
			fileIdx2: null,
			eventConnectType: null,
			preRegClosed: true,
		},
	],
};
