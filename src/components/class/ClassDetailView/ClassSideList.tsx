/* eslint-disable no-unused-expressions */
import { fatchClassDetailView, fatchClassList } from 'api/class';
import Button from 'components/ui/Button';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import styled from 'styled-components';
import {
	IClassDetailResView,
	IClassListItem,
	IClassSearchParams,
} from 'types/\bclass';
import { ButtonType } from 'types/ComponentType';
import { preRegDate } from 'utils';
import ClassSideListItem from './ClassSideListItem';

const Container = styled.div`
	position: relative;
	width: 280px;
	border-right: 1px solid ${props => props.theme.dpGrayLight};

	.sort-btns {
		display: flex;
		align-items: center;
		padding: 11px 0px;
	}
	.currentDetailView {
		position: relative;
		width: 100%;
		display: inline-block;
		background-color: ${props => props.theme.dpLightBlue};
		border-bottom: 1px solid ${props => props.theme.dpGrayLight};
		padding: 20px 20px 40px 20px;
		img {
			width: 100%;
			height: 130px;
		}

		.title {
			font-size: 16px;
			font-weight: 500;
			line-height: 24px;
			letter-spacing: -0.32px;
			text-align: left;
			color: ${props => props.theme.dpBlack};
			margin-top: 15px;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.desc {
			font-size: 14px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			line-height: 20px;
			letter-spacing: -0.28px;
			color: ${props => props.theme.dpBlack};
			margin-top: 5px;
		}

		.date-info {
			position: relative;
			.day {
				display: inline-block;
				font-size: 14px;
				font-weight: bold;
				line-height: 20px;
				letter-spacing: -0.28px;
				color: ${props => props.theme.dpBlue};
				margin-right: 5px;
			}

			.date {
				display: inline-block;
				font-size: 14px;
				font-weight: 500;
				line-height: 1.43;
				letter-spacing: -0.28px;
				color: ${props => props.theme.dpBlack};
				margin-top: 5px;
			}
		}

		.grade-point {
			position: absolute;
			left: 20px;
			bottom: 20px;
			height: 20px;
			padding-left: 21px;
			background: url('/ico/ico-grade-point.png') no-repeat left center/18px
				18px;
			font-size: 14px;
			font-weight: 500;
			line-height: 20px;
			letter-spacing: -0.28px;
			color: ${props => props.theme.dpBlack};
		}
	}
`;

interface IProps {
	classId: string;
}
function ClassSideList(props: IProps): JSX.Element {
	const { classId } = props;
	const [item, setItem] = useState<IClassDetailResView>();
	const [currentSortType, setCurrentSortType] = useState('insert');
	const [sortBtnActive, setSortBtnActive] = useState<{
		insertActive?: boolean;
		viewActive?: boolean;
		closeActive?: boolean;
	}>({ insertActive: true });

	const router = useRouter();
	const { data, fetchNextPage } = useInfiniteQuery(
		'infinitePersons',
		({ pageParam = 1 }) =>
			fatchClassList({
				curPage: pageParam,
				pageScale: 10,
				sortType: currentSortType,
			}),
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage && lastPage.data.page + 1;
				// return undefined;
			},
			enabled: !!currentSortType,
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			refetchOnReconnect: true,
			retry: 1,
		},
	);

	const targetRef = useRef(null);

	const onIntersect = async (
		entry: IntersectionObserverEntry[],
		observer: IntersectionObserver,
	) => {
		entry.forEach(entry => {
			if (entry.isIntersecting) {
				observer.unobserve(entry.target);
				fetchNextPage();
				// observer.observe(entry.target);
			}
		});
	};

	useEffect(() => {
		let observer: IntersectionObserver;
		if (targetRef.current) {
			observer = new IntersectionObserver(onIntersect);
			observer.observe(targetRef.current);
		}

		return () => observer && observer.disconnect();
	}, [data]);

	useEffect(() => {
		const item = fatchClassDetailView(classId as string);
		item.then(result => {
			setItem(result?.data);
			console.log('result', result?.data);
		});
	}, [classId]);

	const onClickHandler = useCallback(() => {
		console.log('click');
	}, []);

	const onClickBackHandler = useCallback(() => {
		router.back();
	}, []);

	const onClickInsertHandler = useCallback(() => {
		setCurrentSortType('insert');
		setSortBtnActive({
			insertActive: true,
			viewActive: false,
			closeActive: false,
		});
	}, []);

	const onClickCloseHandler = useCallback(() => {
		setCurrentSortType('close');
		setSortBtnActive({
			insertActive: false,
			viewActive: false,
			closeActive: true,
		});
	}, []);

	const onClickViewHandler = useCallback(() => {
		setCurrentSortType('view');
		setSortBtnActive({
			insertActive: false,
			viewActive: true,
			closeActive: false,
		});
	}, []);

	return (
		<Container>
			<Button
				type={ButtonType.BACK}
				text="목록으로"
				click={onClickBackHandler}
			/>
			<div className="sort-btns">
				<Button
					click={onClickInsertHandler}
					type={ButtonType.CHECK}
					text="최신순"
					active={sortBtnActive.insertActive}
				/>
				<Button
					click={onClickViewHandler}
					type={ButtonType.CHECK}
					text="인기순"
					active={sortBtnActive.viewActive}
				/>
				<Button
					click={onClickCloseHandler}
					type={ButtonType.CHECK}
					text="마감일순"
					active={sortBtnActive.closeActive}
				/>
			</div>

			<div className="currentDetailView">
				<img src={item?.uploadfile1Stored} alt="" />
				<p className="title">{item?.title ? item?.title : 'null'}</p>
				<p className="desc">{item?.hostName ? item.hostName : 'null'}</p>
				<div className="date-info">
					<p className="day">등록 D-{preRegDate(item?.eventToDt as string)}</p>
					<p className="date">
						{item?.eventFromDt ? item?.eventFromDt : 'null'} -{' '}
						{item?.eventToDt ? item?.eventToDt : 'null'}
					</p>
				</div>
				<div className="grade-point">
					{item?.gradePoint ? item?.gradePoint : 'null'}
				</div>
			</div>
			<div style={{ height: '780px', overflow: 'scroll' }}>
				{data?.pages &&
					data?.pages.map((page, pageIndex) => {
						const list: Array<IClassListItem> | undefined = page?.data.items;
						return (
							list &&
							list.map((listItem, idx) => {
								return (
									<Link href={`/class/detailView/${listItem.bid}`} key={idx}>
										<a
											style={{
												pointerEvents:
													classId === listItem.bid.toString()
														? 'none'
														: 'visible',
											}}
										>
											<ClassSideListItem
												key={idx}
												item={listItem}
												classId={classId}
											/>
										</a>
									</Link>
								);
							})
						);
					})}
				<div style={{ width: '100%', height: '100px' }} ref={targetRef} />
			</div>
		</Container>
	);
}

export default React.memo(ClassSideList);
