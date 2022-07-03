import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div<{
	topLine: boolean;
	require: boolean;
	width: string;
	extraText: boolean;
}>`
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
		padding: 12px 12px 12px 20px;

		input {
			width: ${props => (props.width ? props.width : '100%')};
			height: 34px;
			font-size: 14px;
			line-height: 20px;
			letter-spacing: -0.28px;
			color: var(--very-light-pink);
			border-radius: 4px;
			border: solid 1px ${props => props.theme.borderColor};
			padding: 10px;
			outline: none;

			::placeholder {
				font-size: 14px;
				line-height: 20px;
				letter-spacing: -0.28px;
				color: ${props => props.theme.borderColor};
			}
		}

		.extra-text {
			display: ${props => (props.extraText ? 'inline' : 'none')};
			font-size: 14px;
			line-height: 20px;
			letter-spacing: -0.28px;
			color: ${props => props.theme.dpBlack};
		}

		.warning-massage {
			display: ${props => (props.require ? 'inline-block' : 'none')};
			font-size: 13px;
			line-height: 19px;
			letter-spacing: -0.26px;
			color: #f00;
			margin-top: 5px;
		}
	}
`;

interface IInputProps {
	title: string;
	registerName: string;
	require?: boolean;
	topLine?: boolean;
	placeholder?: string;
	width?: string;
	extraText?: string;
}

/**
 * @function InnerInput
 * @description INPUT TEXT TYPE
 */
function InputTextType(props: IInputProps) {
	const {
		title,
		require,
		registerName,
		topLine,
		placeholder,
		width,
		extraText,
	} = props;
	const methods = useFormContext();

	return (
		<Container
			require={require || false}
			topLine={topLine || false}
			width={width || '100%'}
			extraText={extraText === undefined}
		>
			<div className="title">
				{title}
				<span className="require">&nbsp;*</span>
			</div>
			<div className="input-text">
				<input
					type="text"
					{...methods.register(`${registerName}`)}
					placeholder={placeholder}
				/>
				<p className="warning-massage">{title}명을 입력해주세요.</p>
				<span className="extra-text">&nbsp;&nbsp;{extraText}</span>
			</div>
		</Container>
	);
}

export default React.memo(InputTextType);

InputTextType.defaultProps = {
	topLine: false,
	require: false,
	placeholder: '내용을 입력해 주세요',
	width: '100%',
	extraText: '',
};
