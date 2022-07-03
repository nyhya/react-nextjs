import SelectBox from 'components/ui/SelectBox';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { SelectBoxDesignType } from 'types/ComponentType';

const Container = styled.div<{
	topLine: boolean;
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
			display: inline-block;
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
		padding-left: 20px;
		.box {
			display: flex;
			flex-direction: row;
			align-items: center;

			input {
				border-radius: 4px;
				border: solid 1px ${props => props.theme.borderColor};
				background-color: #fff;
			}

			.account-number {
				width: 210px;
				height: 34px;
				margin-left: 5px;
			}

			.account-name {
				font-size: 14px;
				line-height: 20px;
				letter-spacing: -0.28px;
				text-align: left;
				color: ${props => props.theme.dpBlack};
				margin-left: 30px;
			}

			.account-holder {
				width: 160px;
				height: 34px;
				margin-left: 10px;
			}
		}
	}
`;

interface IAProps {
	title: string;
	option: Array<{ value: string; label: string }>;
	topLine?: boolean;
	placeholder?: string;
}

function InputAccount(props: IAProps): JSX.Element {
	const { title, topLine, placeholder, option } = props;
	const methods = useFormContext();

	const onSelectHandler = (selected: string | number) => {
		console.log(selected);
	};

	return (
		<Container topLine={topLine || false}>
			<div className="title">
				{title}
				<span className="require">&nbsp;*</span>
			</div>
			<div className="input-text">
				<div className="box">
					<SelectBox
						type={SelectBoxDesignType.NORMAL}
						label="대회"
						options={option}
						selectHandler={onSelectHandler}
					/>
					<input
						className="account-number"
						type="text"
						{...methods.register(`accountNumber`)}
					/>
					<span className="account-name">예금주</span>
					<input
						className="account-holder"
						type="text"
						{...methods.register(`accountHolder`)}
					/>
				</div>
			</div>
		</Container>
	);
}

export default React.memo(InputAccount);

InputAccount.defaultProps = {
	topLine: false,
	placeholder: '내용을 입력해 주세요',
};
