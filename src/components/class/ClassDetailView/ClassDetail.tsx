import { instance } from 'api';
import { fatchClassDetailView } from 'api/class';
import Button from 'components/ui/Button';
import IconTypeButton from 'components/ui/IconTypeButton';
import useCopyClipBoard from 'hook/useCopyClipBoard';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import alertModal, { alertActions } from 'store/common/alertModal';
import scrapModal, { scrapActions } from 'store/common/scrapModal';
import styled from 'styled-components';
import { IClassDetailResView, IClassListItem } from 'types/\bclass';
import {
	AlertModalType,
	ButtonIconType,
	ButtonType,
	EventTypeDesign,
} from 'types/ComponentType';
import { preRegDate } from 'utils';

import EventType from '../AtomicComponents/EventType';
import GradePoint from '../AtomicComponents/GradePoint';

const Container = styled.div`
	width: 800px;
	padding-left: 30px;

	.top {
		display: flex;
		justify-content: space-between;
		padding: 20px 0px 30px 0px;
		.left {
			display: flex;
			> * {
				margin-right: 10px;
			}
		}

		.right {
			display: flex;
			> * {
				margin-left: 10px;
			}
		}
	}

	h1 {
		font-size: 30px;
		font-weight: 500;
		line-height: 44px;
		letter-spacing: -0.6px;
		color: ${props => props.theme.dpBlack};
	}

	.desc {
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: -0.32px;
		color: ${props => props.theme.dpBlack};
		margin-bottom: 15px;
	}
	.info-box {
		border-radius: 5px;
		border: solid 1px rgba(183, 183, 183, 0.34);
		background-color: ${props => props.theme.dpWhite};
		padding: 20px;
		margin-top: 30px;
		li {
			box-sizing: border-box;
			display: inline-block;

			.question {
				display: inline-block;
				font-size: 16px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 35px;
				letter-spacing: -0.32px;
				text-align: left;
				color: ${props => props.theme.dpBlack};
				margin-right: 30px;
			}

			.answer {
				display: inline-block;
				opacity: 0.85;
				font-size: 16px;
				line-height: 35px;
				letter-spacing: -0.32px;
				color: ${props => props.theme.dpBlack};

				em {
					color: ${props => props.theme.dpBlue};
					font-size: 16px;
					font-weight: 500;
					letter-spacing: -0.32px;
				}
			}
			:nth-child(1n) {
				width: 60%;
			}
			:nth-child(2n) {
				width: 40%;
			}
			:last-child {
				width: 100%;
			}
		}
	}

	.contents {
		overflow: hidden;
		padding: 30px 0px 30px 0px;

		.tit {
			position: relative;
			font-size: 20px;
			font-weight: 500;
			font-stretch: normal;
			font-style: normal;
			line-height: normal;
			letter-spacing: -0.4px;
			text-align: left;
			color: ${props => props.theme.dpBlack};
			margin-bottom: 32px;

			::after {
				position: absolute;
				left: 0;
				bottom: -10px;
				width: 20px;
				height: 2px;
				content: '';
				background-color: ${props => props.theme.dpBlue};
			}
		}

		.txt {
			font-size: 16px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.5;
			letter-spacing: -0.32px;
			text-align: left;
			color: ${props => props.theme.dpBlack};
			::after {
				content: none;
			}
		}
	}
	.contact {
		border-top: 1px solid ${props => props.theme.dpBlack};
		padding-top: 20px;
		padding-bottom: 50px;
		.subject {
			font-size: 18px;
			font-weight: 500;
			line-height: 26px;
			letter-spacing: -0.36px;
			color: ${props => props.theme.dpBlack};
			margin-bottom: 20px;
		}
		.box {
			margin-bottom: 10px;

			.question {
				width: 70px;
				display: inline-block;
				font-size: 14px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 20px;
				letter-spacing: -0.28px;
				color: ${props => props.theme.dpGrayDeep};
				margin-right: 10px;
			}
			.answer {
				display: inline-block;
				font-size: 14px;
				font-weight: normal;
				font-stretch: normal;
				font-style: normal;
				line-height: 20px;
				letter-spacing: -0.28px;
				text-align: left;
				color: var(--dpblack);
			}
		}
	}
`;

interface IProps {
	classId: string;
}

export default function ClassDetail(props: IProps): JSX.Element {
	const { classId } = props;
	const [item, setItem] = useState<IClassDetailResView>();
	const [isCopy, setIsCopy, onClipBoardCopy] = useCopyClipBoard();

	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		const item = fatchClassDetailView(classId as string);
		item.then(result => {
			setItem(result?.data);
			// console.log('result', result?.data.preRegisterYn);
			// console.log(result?.data?.fileList.length);
		});
	}, [classId]);

	useEffect(() => {
		if (isCopy) {
			dispatch(
				alertActions.rdxModalOpen({
					alertTxt:
						'URL 링크가 복사되었습니다.</br>원하는 곳에 붙여넣기 해주세요. ',
					modalType: AlertModalType.NORMAL,
				}),
			);
			setIsCopy(false);
		}
	}, [isCopy]);

	const onClickScrapModalOpen = useCallback(() => {
		dispatch(scrapActions.rdxScrapModalOpen(true));
	}, []);

	const onClickShareModalAlert = useCallback(async () => {
		await onClipBoardCopy(process.env.REACT_APP_PUBLIC_URL + router.asPath);
	}, []);

	const onClickHandler = useCallback(() => {
		console.log('onClickHandler');
	}, []);
	return (
		<Container>
			{/* 상단 버튼 구역 : s */}
			<div className="top">
				<div className="left">
					<IconTypeButton
						type={ButtonIconType.SCRAP}
						onClick={onClickScrapModalOpen}
					/>
					<IconTypeButton
						type={ButtonIconType.SHARE}
						onClick={onClickShareModalAlert}
					/>
				</div>
				<div className="right">
					<a
						href={
							item && item.fileList.length > 0
								? item.fileList[0].leafletFileUrl
								: ''
						}
						download
					>
						<Button
							type={ButtonType.LINE}
							text="관련자료 다운로드"
							click={onClickHandler}
						/>
					</a>
					{item &&
						item.preRegisterYn === 'Y' &&
						preRegDate(item.preRegCloseDt) < 0 && (
							<Button
								type={ButtonType.NORMAL}
								text="기간만료"
								click={onClickHandler}
								disabled={preRegDate(item.eventToDt) < 0}
							/>
						)}
					{item &&
					item.preRegisterYn === 'Y' &&
					item.isApply === 'canApply' &&
					preRegDate(item.eventToDt) > 0 ? (
						<Button
							type={ButtonType.NORMAL}
							text={preRegDate(item.eventToDt) > 0 ? '등록' : '신청마감'}
							click={onClickHandler}
							disabled={preRegDate(item.preRegCloseDt) < 0}
						/>
					) : null}
					{item &&
						item.isApply === 'duplicateApply' &&
						preRegDate(item.eventToDt) > 0 && (
							<Button
								type={ButtonType.NORMAL}
								text="신청완료"
								click={onClickHandler}
								disabled
							/>
						)}
				</div>
			</div>
			{/* 상단 버튼 구역 : e */}
			<h1>{item?.title}</h1>
			<p className="desc">{item?.hostName}</p>
			<div>
				<GradePoint
					show={item?.gradePoint !== undefined}
					gradePoint={item?.gradePoint}
					fontSize="14px"
					lineHeight="20px"
					padding="4px 10px 4px 31px"
					iconWidth="28px"
				/>
				<EventType type={EventTypeDesign.LIGHTBLUE} />
			</div>
			<div className="info-box">
				<li>
					<p className="question q1">주제</p>
					<p className="answer">{item?.hostName}</p>
				</li>
				<li>
					<p className="question q2">수강료</p>
					<p className="answer">{item?.regPrice1}원</p>
				</li>
				<li>
					<p className="question q3">일시</p>
					<p className="answer">
						{item?.eventFromDt} - {item?.eventToDt}
					</p>
				</li>
				<li>
					<p className="question a4">마감일</p>
					<p className="answer">
						{item?.eventToDt}&nbsp;
						<em>사전 등록 D-{preRegDate(item?.eventToDt as string)}</em>
					</p>
				</li>
				<li>
					<p className="question q5">주소</p>
					<p className="answer">{item?.eventAddr1}</p>
				</li>
			</div>
			<div className="contents">
				<p className="tit">행사 소개</p>
				<div className="txt">
					<p dangerouslySetInnerHTML={{ __html: item?.content as string }} />
				</div>
			</div>
			{/* 하단 문의 처 : s  */}
			<div className="contact">
				<p className="subject">문의처</p>
				<div className="box">
					<p className="question">주소</p>
					<p className="answer">
						{item?.contactAddr1}&npsp;{item?.contactAddr2}
					</p>
				</div>
				<div className="box">
					<p className="question">전화번호</p>
					<p className="answer">
						{item?.tel1}-{item?.tel2}-{item?.tel3}
					</p>
				</div>
				<div className="box">
					<p className="question">휴대폰번호</p>
					<p className="answer">
						{item?.mobile1}-{item?.mobile2}-{item?.mobile3}
					</p>
				</div>
				<div className="box">
					<p className="question">이메일</p>
					<p className="answer">
						{item?.email1}@{item?.email2}
					</p>
				</div>
				<div className="box">
					<p className="question">홈페이지</p>
					<p className="answer">{item?.homepage}</p>
				</div>
			</div>
			{/* 하단 문의 처 : e  */}
			{/* 하단 버튼 : s  */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginBottom: '70px',
				}}
			>
				{item &&
					item.preRegisterYn === 'Y' &&
					preRegDate(item.preRegCloseDt) < 0 && (
						<Button
							type={ButtonType.NORMAL}
							text="기간만료"
							click={onClickHandler}
							disabled={preRegDate(item.eventToDt) < 0}
						/>
					)}
				{item &&
				item.preRegisterYn === 'Y' &&
				item.isApply === 'canApply' &&
				preRegDate(item.eventToDt) > 0 ? (
					<Button
						type={ButtonType.NORMAL}
						text={preRegDate(item.eventToDt) > 0 ? '사전등록' : '신청마감'}
						click={onClickHandler}
						disabled={preRegDate(item.preRegCloseDt) < 0}
					/>
				) : null}
				{item &&
					item.isApply === 'duplicateApply' &&
					preRegDate(item.eventToDt) > 0 && (
						<Button
							type={ButtonType.NORMAL}
							text="신청완료"
							click={onClickHandler}
							disabled
						/>
					)}
				{/* 하단 버튼 : e  */}
			</div>
		</Container>
	);
}

// const item = useQuery(
// 	'classDetail',
// 	() => fatchClassDetailView(classId as string),
// 	{
// 		keepPreviousData: true,
// 		refetchOnMount: false,
// 		refetchOnWindowFocus: false,
// 	},
// );
