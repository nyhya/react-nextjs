import React from 'react';
import styled from 'styled-components';

const GradeAverge = styled.div<{
	show: boolean;
	fontSize: string;
	lineHeight: number | string;
	padding: string;
	iconWidth: string;
}>`
	position: relative;
	display: ${props => (props.show ? 'inline-block' : 'none')};
	border-radius: 14px;
	border: solid 1px ${props => props.theme.dpOrange};
	background-color: #fff;
	padding: ${props => props.padding};
	margin-right: 10px;
	span {
		font-size: ${props => props.fontSize};
		display: inline-block;
		line-height: ${props => props.lineHeight};
	}
	b {
		font-size: ${props => props.fontSize};
		font-size: ${props => props.theme.fontSize};
		margin-left: 5px;
	}
	&::before {
		position: absolute;
		left: -1px;
		top: 0px;
		width: ${props => props.iconWidth};
		height: ${props => props.iconWidth};
		content: '';
		border-radius: 50%;
		background: url('/ico/ico-grade-white-point.png') no-repeat center
				center/18px 18px,
			${props => props.theme.dpOrange};
	}
`;

interface IProps {
	show: boolean;
	fontSize: string;
	lineHeight: number | string;
	padding: string;
	gradePoint: number | undefined;
	iconWidth: string;
}

function GradePoint(props: IProps): JSX.Element {
	const { show, gradePoint, fontSize, lineHeight, padding, iconWidth } = props;
	return (
		<GradeAverge
			show={show || false}
			fontSize={fontSize}
			lineHeight={lineHeight}
			padding={padding}
			iconWidth={iconWidth}
		>
			<span>평균 점수</span>
			<b>{gradePoint || 'null'}점</b>
		</GradeAverge>
	);
}

export default React.memo(GradePoint);
