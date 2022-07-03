import React from 'react';
import styled, { css } from 'styled-components';
import { EventTypeDesign } from 'types/ComponentType';

const EventTypeOnOff = styled.div<{ type: EventTypeDesign }>`
	display: inline-block;
	margin-top: 5px;
	${props => {
		switch (props.type) {
			case EventTypeDesign.NORMAL:
				return css`
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
						background: url('/ico/ico-training-course.png') no-repeat 5px
							center/18px 18px #f5f5f5;
						margin-right: 5px;
					}

					.off {
						background: url('/ico/ico-training-course.png') no-repeat 5px
							center/18px 18px #f5f5f5;
					}
				`;
			case EventTypeDesign.LIGHTBLUE:
				return css`
					> * {
						display: inline-block;
						line-height: 20px;
						border-radius: 2px;
						background-color: #e5f5fd;
						padding: 4px 5px 4px 28px;
						font-size: 14px;
						font-weight: bold;
						line-height: 20px;
						letter-spacing: -0.28px;
						color: ${props => props.theme.dpBlue};
					}

					.on {
						background: url('/ico/ico-blue-training-course.png') no-repeat 5px
							center/18px 18px #e5f5fd;
						margin-right: 5px;
					}

					.off {
						background: url('/ico/ico-blue-training-course.png') no-repeat 5px
							center/18px 18px #e5f5fd;
					}
				`;
			default:
				return css``;
		}
	}}
`;

interface IProps {
	type: EventTypeDesign;
}

function EventType(props: IProps): JSX.Element {
	const { type } = props;

	return (
		<EventTypeOnOff type={type}>
			<div className="on">온라인</div>
			<div className="off">오프라인</div>
		</EventTypeOnOff>
	);
}

export default React.memo(EventType);
