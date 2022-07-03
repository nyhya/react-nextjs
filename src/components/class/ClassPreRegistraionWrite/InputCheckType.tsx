import CheckBoxGroup from 'components/ui/CheckBoxGroup';
import RadioGroup from 'components/ui/RadioGroup';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div<{ topLine: boolean; require: boolean }>`
	width: 100%;
	display: table;
	border-top: ${props => (props.topLine ? '1px solid #000' : 'none')};

	.col1 {
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
		padding-left: 20px;
		box-shadow: inset 0px -1px 0px 0px ${props => props.theme.borderColor};
	}

	.col2 {
		height: 60px;
		vertical-align: middle;
		display: table-cell;
		padding-left: 20px;
		box-shadow: inset 0px -1px 0px 0px ${props => props.theme.borderColor};

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

interface IInputRadioProps {
	id: string;
	name: string;
	title: string;
	require?: boolean;
	registerName: string;
	topLine?: boolean;
	option: Array<{ value: string; label: string }>;
}

/**
 * @function InnerRadio
 * @description INPUT RADIO TYPE
 */
function InputCheckType(props: IInputRadioProps) {
	const { id, name, title, require, registerName, topLine, option } = props;
	const methods = useFormContext();
	return (
		<Container topLine={topLine || false} require={require || false}>
			<div className="col1">
				{title}
				<span>&nbsp;*</span>
			</div>
			<div className="col2">
				<CheckBoxGroup
					id={id}
					name={name}
					registerName={registerName}
					option={option}
				/>
				<p className="warning-massage">{title}를 선택해주세요.</p>
			</div>
		</Container>
	);
}

export default React.memo(InputCheckType);

InputCheckType.defaultProps = {
	topLine: false,
	require: false,
};
