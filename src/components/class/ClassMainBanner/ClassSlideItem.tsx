import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';
import { IClassListItem } from 'types/\bclass';
import { trainingCourse } from 'utils/class';

const Container = styled.div<{ imgPath: string }>`
	box-sizing: border-box;
	position: relative;
	width: 100%;
	height: 367px;
	border-radius: 10px;
	background-color: #fff;
	padding: 20px;

	.image-area {
		position: relative;
		width: 100%;
		height: 163px;
		background: url(${props => props.imgPath}) no-repeat left top/100% auto,
			#000;
		.icon {
			position: absolute;
			right: 0;
			top: 0;
			width: 68px;
			height: 30px;
			background: url('/ico/ico-star.png') no-repeat 10px center/16px 16px,
				linear-gradient(to right, #18a0ec, #0ad697);
			border-bottom-left-radius: 5px;
			span {
				line-height: 28px;
				font-size: 16px;
				font-weight: bold;
				letter-spacing: -0.32px;
				color: #fff;
				margin-left: 29px;
			}
		}

		.text-box {
			position: absolute;
			right: 0;
			bottom: 0;
			padding: 0px 5px 10px 0px;
			.txt {
				line-height: 24px;
				display: inline-block;
				opacity: 0.7;
				border-radius: 2px;
				background-color: #000;
				padding: 0px 5px;
				font-size: 14px;
				font-weight: 500;
				letter-spacing: -0.28px;
				color: #fff;
				margin-left: 5px;
			}
		}
	}

	.title-box {
		position: relative;
		width: 100%;
		border-bottom: 1px solid ${props => props.theme.borderColor};
		padding: 20px 0px;
		.title-text {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			font-size: 20px;
			font-weight: bold;
			letter-spacing: -0.4px;
			line-height: 29px;
			color: ${props => props.theme.dpblack};
		}

		.desc-text {
			line-height: 24px;
			font-size: 16px;
			letter-spacing: -0.32px;
			color: ${props => props.theme.dpblack};
			margin-top: 5px;
		}
	}

	.desc-box {
		position: absolute;
		left: 20px;
		bottom: 20px;
		width: 100%;

		.d-day-text {
			font-size: 14px;
			font-weight: bold;
			letter-spacing: -0.28px;
			color: ${props => props.theme.dpblue};
			margin-bottom: 5px;
		}
		.desc-text {
			.date-period-text {
				line-height: 20px;
				font-size: 14px;
				font-weight: 500;
				letter-spacing: -0.28px;
				text-align: left;
				color: ${props => props.theme.dpblack};
			}

			.average-score-point {
				height: 20px;
				background: url('/ico/ico-award.png') no-repeat left 2px/18px auto;
				padding-left: 21px;
				font-size: 14px;
				font-weight: 500;
				letter-spacing: -0.28px;
				color: ${props => props.theme.dpblack};
				margin-left: 10px;
			}
		}
	}

	.ico-cash {
		position: absolute;
		right: 20px;
		bottom: 20px;
		width: 30px;
		height: 30px;
		background: url('/ico/ico-cash.png') no-repeat right bottom/100% auto;
	}
`;

interface IProps {
	item: IClassListItem;
}

export default function ClassSlideItem(props: IProps): JSX.Element {
	const { item } = props;

	return (
		<Container imgPath={item.uploadfile1Stored}>
			<div className="image-area">
				<div className="icon">
					<span>인기</span>
				</div>
				<div className="text-box">
					<span className="txt">
						{item.eventConnectType ? item.eventConnectType : 'null'}
					</span>
					<span className="txt">
						{item.plazaFg ? trainingCourse(item.plazaFg) : 'null'}
					</span>
				</div>
			</div>
			<div className="title-box">
				<div className="title-text">{item.title ? item.title : 'null'}</div>
				<div className="desc-text">
					{item.hostName ? item.hostName : 'null'}
				</div>
			</div>
			<div className="desc-box">
				<div className="d-day-text">사전등록 D-13</div>
				<div className="desc-text">
					<span className="date-period-text">
						{item.eventFromDt
							? dayjs(item.eventFromDt).format('YY.MM.DD')
							: 'null'}
						-
						{item.eventToDt ? dayjs(item.eventToDt).format('YY.MM.DD') : 'null'}
					</span>
					<span className="average-score-point">
						연수평점 : {item.gradePoint ? item.gradePoint : 'null'}점
					</span>
				</div>
			</div>
			<div className="ico-cash" />
		</Container>
	);
}
