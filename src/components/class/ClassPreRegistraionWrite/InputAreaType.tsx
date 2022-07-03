import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div<{ topLine: boolean; require: boolean }>`
	width: 100%;
	display: table;
	border-top: ${props => (props.topLine ? '1px solid #000' : 'none')};

	.title {
		display: table-cell;
		width: 150px;
		height: 59px;
		vertical-align: middle;
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		letter-spacing: -0.28px;
		text-align: left;
		color: ${props => props.theme.dpBlack};
		background-color: ${props => props.theme.white};
		box-shadow: inset 0px -1px 0px 0px ${props => props.theme.borderColor};
		padding-left: 20px;

		.require {
			height: 14px;
			display: ${props => (props.require ? 'inline-block' : 'none')};
			padding-left: 1px;
			vertical-align: sub;
			color: #fd7b57;
		}
	}

	.input-text {
		height: 60px;
		vertical-align: middle;
		display: table-cell;
		box-shadow: inset 0px -1px 0px 0px ${props => props.theme.borderColor};
		padding-top: 12px;
		padding-left: 20px;

		.letter-num {
			font-size: 14px;
			line-height: 20px;
			letter-spacing: -0.28px;
			color: #b7b7b7;
			margin: 12px 0px;
			text-align: right;

			.current {
				color: ${props => props.theme.dpBlack};
			}
		}

		textarea {
			width: 100%;
			height: 385px;
			font-size: 14px;
			line-height: 20px;
			letter-spacing: -0.28px;
			color: ${props => props.theme.dpBlack};
			border-radius: 4px;
			border: solid 1px ${props => props.theme.borderColor};
			resize: none;
			padding: 10px;
			outline: none;

			::placeholder {
				font-size: 14px;
				line-height: 20px;
				letter-spacing: -0.28px;
				font-weight: 300;
				color: #b7b7b7;
			}
		}
	}
`;

interface IInputAreaProps {
	title: string;
	require?: boolean;
	registerName: string;
	topLine?: boolean;
}

function InputAreaType(props: IInputAreaProps): JSX.Element {
	const { title, require, registerName, topLine } = props;
	const methods = useFormContext();

	return (
		<Container topLine={topLine || false} require={require || false}>
			<div className="title">
				{title}
				<span className="require">&nbsp;*</span>
			</div>
			<div className="input-text">
				<textarea
					id="eventInfo"
					placeholder="행사 정보는 최대 2000자까지 등록 가능합니다."
					{...methods.register(`${registerName}`)}
				/>
				<div className="letter-num">
					<span className="current">0</span> / 2000
				</div>
			</div>
		</Container>
	);
}

export default React.memo(InputAreaType);

InputAreaType.defaultProps = {
	topLine: false,
	require: false,
};
