import { forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import { IClassListItem } from 'types/\bclass';
import { EventTypeDesign } from 'types/ComponentType';
import { preRegDate } from 'utils';
import EventType from '../AtomicComponents/EventType';

const Container = styled.div<{ currentPage: boolean }>`
	width: 100%;
	border-bottom: 1px solid ${props => props.theme.dpGrayLight};
	padding: 20px;
	background-color: ${props =>
		props.currentPage ? props.theme.dpLightBlue : 'none'};
	.tit {
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: -0.32px;
		color: ${props => props.theme.dpBlack};
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.desc {
		font-size: 14px;
		line-height: 20px;
		letter-spacing: -0.28px;
		color: ${props => props.theme.dpBlack};
		margin-top: 5px;
	}

	.date-info {
		margin-top: 5px;
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
			line-height: 20px;
			letter-spacing: -0.28px;
			color: ${props => props.theme.dpBlack};
		}
	}

	.grade-point {
		font-size: 14px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		line-height: 20px;
		letter-spacing: -0.28px;
		text-align: left;
		color: ${props => props.theme.dpBlack};
		padding-left: 21px;
		background: url('/ico/ico-grade-point.png') no-repeat left center/18px 18px;
		margin-top: 10px;
	}

	.eventConnect-type {
		margin-top: 5px;
		> * {
			display: inline-block;
			line-height: 20px;
			border-radius: 2px;
			border: solid 1px ${props => props.theme.borderColor};
			background-color: #f5f5f5;
			padding: 4px 5px 4px 28px;
			font-size: 14px;
			font-weight: bold;
			letter-spacing: -0.28px;
			color: ${props => props.theme.dpGrayDeep};
		}
		.on {
			background: url('/ico/ico-training-course.png') no-repeat 5px center/18px
				18px #f5f5f5;
			margin-right: 5px;
		}

		.off {
			background: url('/ico/ico-training-course.png') no-repeat 5px center/18px
				18px #f5f5f5;
		}
	}
`;

interface IProps {
	item: IClassListItem;
	classId: string;
}
export default function ClassSideListItem(props: IProps): JSX.Element {
	const { item, classId } = props;
	useEffect(() => {
		// console.log(item);
	}, []);
	return (
		<Container currentPage={parseInt(classId, 10) === item.bid}>
			<p className="tit">{item.title ? item.title : 'null'}</p>
			<p className="desc">{item.hostName ? item.hostName : 'null'}</p>
			<div className="date-info">
				<p className="day"> 등록 D-{preRegDate(item.eventToDt)} </p>
				<p className="date">
					{item.eventFromDt ? item.eventFromDt : 'null'}-
					{item.eventFromDt ? item.eventToDt : 'null'}
				</p>
			</div>
			<div className="grade-point">
				연수평점 : {item.gradePoint ? item.gradePoint : 'null'}점
			</div>
			<EventType type={EventTypeDesign.NORMAL} />
		</Container>
	);
}
