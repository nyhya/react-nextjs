import Button from 'components/ui/Button';
import React, {
	ChangeEvent,
	ChangeEventHandler,
	InputHTMLAttributes,
	MutableRefObject,
	useEffect,
	useRef,
	useState,
} from 'react';
import DaumPostcodeEmbed, { useDaumPostcodePopup } from 'react-daum-postcode';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ButtonType } from 'types/ComponentType';

const Container = styled.div<{ require: boolean }>`
	position: relative;
	width: 100%;
	display: table;
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
		padding: 12px 0px 12px 20px;

		.zip-code {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			input {
				width: 155px;
				height: 34px;
				font-size: 14px;
				line-height: 14px;
				letter-spacing: -0.28px;
				color: ${props => props.theme.dpBlack};
				border-radius: 4px;
				border: solid 1px ${props => props.theme.borderColor};
				background-color: #fff;
				padding: 10px;
				margin-right: 5px;
				outline: none;
			}
		}

		.address {
			padding-top: 5px;
			input {
				width: 100%;
				height: 34px;
				font-size: 14px;
				line-height: 14px;
				letter-spacing: -0.28px;
				color: ${props => props.theme.dpBlack};
				border-radius: 4px;
				border: solid 1px ${props => props.theme.borderColor};
				background-color: #fff;
				padding: 10px;
				outline: none;
			}
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
	require?: boolean;
	registerName1: string;
	registerName2: string;
	topLine?: boolean;
}

function InputAddressSearch(props: IInputProps): JSX.Element {
	const { title, require, registerName1, registerName2, topLine } = props;
	const methods = useFormContext();

	const CURRENT_URL =
		'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
	const open = useDaumPostcodePopup(CURRENT_URL);

	const onClickHandler = () => {
		open({ onComplete: handleComplete });
	};

	const handleComplete = (data: any) => {
		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress +=
					extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}

		methods.setValue(`${registerName1}`, data.zonecode);
		methods.setValue(`${registerName2}`, fullAddress);
	};

	return (
		<Container require={require || false}>
			<div className="title">
				{title}
				<span className="require">&nbsp;*</span>
			</div>
			<div className="input-text">
				<div className="zip-code">
					<input type="text" {...methods.register(`${registerName1}`)} />
					<Button
						text="우편번호"
						type={ButtonType.NORMALGRAY}
						click={onClickHandler}
					/>
				</div>
				<div className="address">
					<input type="text" {...methods.register(`${registerName2}`)} />
				</div>
				<p className="warning-massage">{title}명을 입력해주세요.</p>
			</div>
		</Container>
	);
}

export default React.memo(InputAddressSearch);

InputAddressSearch.defaultProps = {
	topLine: false,
	require: false,
};
