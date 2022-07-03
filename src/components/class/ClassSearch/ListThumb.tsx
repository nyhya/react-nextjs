import { useEffect } from 'react';
import styled from 'styled-components';
import { IClassListItem } from 'types/\bclass';
import { preRegDate } from 'utils';
import { eventConnectType, trainingCourse } from 'utils/class';

const ListThumbItem = styled.li<{
	imgPath: string;
	preRegActive: boolean;
	gradePoint: boolean;
}>`
	position: relative;
	width: 200px;
	height: 270px;
	display: inline-block;
	border-radius: 5px;
	overflow: hidden;
	border: solid 1px ${props => props.theme.borderColor};
	margin-bottom: 25px;
	.mark {
		position: absolute;
		left: 10px;
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
		}
		.d-day {
			font-size: 14px;
			font-weight: bold;
			letter-spacing: -0.28px;
		}
	}
	.image-contain {
		position: relative;
		width: 100%;
		height: 108px;
		background: url(${props => props.imgPath}) no-repeat left top/100% 100%,
			#000;

		.txt {
			position: absolute;
			right: 5px;
			bottom: 5px;
			display: flex;
			flex-direction: row;
			span {
				display: flex;
				align-items: center;
				font-size: 13px;
				height: 23px;
				font-weight: bold;
				letter-spacing: -0.26px;
				color: #fff;
				border-radius: 2px;
				background-color: #000;
				padding: 2px 5px;

				& {
					margin-right: 3px;
				}

				&:last-child {
					margin: 0;
				}
			}
		}
	}
	.txt-contain {
		padding: 10px 10px 15px 10px;
		.tit {
			font-size: 16px;
			font-weight: bold;
			line-height: 1.38;
			letter-spacing: -0.32px;
			text-align: left;
			color: ${props => props.theme.dpblack};
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.desc {
			width: 100%;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			font-size: 14px;
			height: 20px;
			line-height: 20px;
			letter-spacing: -0.28px;
			text-align: left;
			color: ${props => props.theme.dpblack};
			margin-top: 5px;
		}

		.date {
			font-size: 14px;
			font-weight: 500;
			letter-spacing: -0.28px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			text-align: left;
			color: ${props => props.theme.dpblack};
			margin-top: 5px;
		}
	}

	.bottom-contain {
		position: absolute;
		right: 10px;
		bottom: 15px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.ico-cash {
			position: relative;
			width: 26px;
			height: 26px;
			background: url('/ico/ico-cash.png') no-repeat left center/100% auto;
			margin-right: 5px;
		}
		.grade-average {
			position: relative;
			height: 26px;
			display: ${props => (props.gradePoint ? 'inline-block' : 'none')};
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
	}
`;

interface IProps {
	item: IClassListItem;
}
export default function ListThumb(props: IProps): JSX.Element {
	const { item } = props;

	return (
		<ListThumbItem
			imgPath={item.uploadfile1Stored}
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
			<div className="image-contain">
				<div className="txt">
					<span>{eventConnectType(item.onLineYn)}</span>
					<span>
						{item && item.plazaFg ? trainingCourse(item.plazaFg) : 'null'}
					</span>
				</div>
			</div>
			<div className="txt-contain">
				<p className="tit">
					{item && item.title ? item && item.title : 'null'}
				</p>
				<p className="desc">
					{item && item.hostName ? item && item.hostName : 'null'}
				</p>
				<p className="date">
					{item && item.eventFromDt ? item && item.eventFromDt : 'null'} -
					{item && item.eventToDt ? item && item.eventToDt : 'null'}
				</p>
			</div>
			<div className="bottom-contain">
				<div className="ico-cash" />
				<p className="grade-average">
					<span>연수평점:</span>
					<span>{item.gradePoint ? item.gradePoint : 'null'}점</span>
				</p>
			</div>
		</ListThumbItem>
	);
}
