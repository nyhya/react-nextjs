import react from 'react';
import styled from 'styled-components';
import { IClassListItem } from 'types/\bclass';
import { preRegDate } from 'utils';

const Container = styled.li<{
	preRegActive: boolean;
	gradePoint: boolean;
}>`
	position: relative;
	width: 530px;
	display: inline-block;
	border-radius: 10px;
	border: solid 1px ${props => props.theme.borderColor};
	padding: 20px;
	margin-bottom: 20px;
	.mark {
		position: absolute;
		right: 20px;
		top: 0;
		width: 52px;
		height: 52px;
		display: ${props => (props.preRegActive ? 'inline-block' : 'none')};
		background: url('/pages/class/list/mark-bg.png') no-repeat left top/100%
			auto;
		text-align: center;
		color: #fff;
		padding-top: 4px;
		z-index: 1;

		.tit {
			line-height: 1.5;
			font-size: 12px;
			font-weight: 500;
			letter-spacing: -0.24px;
			color: #fff;
		}
		.d-day {
			font-size: 14px;
			font-weight: bold;
			letter-spacing: -0.28px;
			color: #fff;
		}
	}
	.tit {
		line-height: 26px;
		font-size: 18px;
		font-weight: bold;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		letter-spacing: -0.36px;
		color: ${props => props.theme.dpblack};
		margin-bottom: 5px;
	}
	.desc {
		font-size: 16px;
		height: 24px;
		line-height: 24px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		letter-spacing: -0.32px;
		color: ${props => props.theme.dpblack};
		margin-bottom: 5px;
	}
	.date {
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		letter-spacing: -0.28px;
		color: ${props => props.theme.dpblack};
	}

	.bottom-contain {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-top: 10px;

		.grade-average {
			position: relative;
			height: 26px;
			visibility: ${props => (props.gradePoint ? 'inline-block' : 'hidden')};
			border-radius: 14px;
			border: solid 1px ${props => props.theme.dpOrange};
			background-color: #fff;
			padding: 0px 10px 0px 31px;
			span {
				display: inline-block;
				line-height: 24px;
			}
			&::before {
				position: absolute;
				left: -1px;
				top: -1px;
				width: 26px;
				height: 26px;
				content: '';
				border-radius: 50%;
				background: url('/ico/mark-point.png') no-repeat center center/18px 18px,
					${props => props.theme.dpOrange};
			}
		}
		&::after {
			position: absolute;
			right: 0px;
			bottom: 0px;
			width: 28px;
			height: 28px;
			content: '';
			background: url('/ico/ico-cash.png') no-repeat left center/100% auto;
		}
	}
`;

interface IProps {
	item: IClassListItem;
}
export default function ListItem(props: IProps): JSX.Element {
	const { item } = props;
	return (
		<Container
			preRegActive={
				item.preRegisterYn !== 'N' && preRegDate(item.preRegCloseDt) > 0
			}
			gradePoint={item.gradePoint !== null && item.gradePoint > 0}
		>
			<div className="mark">
				<p className="tit">사전등록</p>
				<p className="d-day">
					D-
					{item.preRegCloseDt && preRegDate(item.preRegCloseDt) > 0
						? preRegDate(item.preRegCloseDt)
						: 'null 확인요청중'}
				</p>
			</div>
			<p className="tit">{item && item.title ? item && item.title : 'null'}</p>
			<p className="desc">
				{item && item.hostName ? item && item.hostName : 'null'}
			</p>
			<p className="date">
				{item && item.eventFromDt ? item && item.eventFromDt : 'null'} -
				{item && item.eventToDt ? item && item.eventToDt : 'null'}
			</p>
			<div className="bottom-contain">
				<p className="grade-average">
					<span>평점:</span>
					<span>{item.gradePoint ? item.gradePoint : 'null'}점</span>
				</p>
			</div>
		</Container>
	);
}
