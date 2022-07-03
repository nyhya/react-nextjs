import React, { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ISelectType } from 'types/ComponentType';

const Container = styled.div`
	display: inline-block;
`;

const CheckItem = styled.div`
	display: inline-block;
	margin-right: 10px;
	input[type='checkbox'] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		outline: 0;
		box-shadow: none;
		border: none;
	}

	label {
		display: inline-block;
		position: relative;
		padding-left: 26px;
		cursor: pointer;
	}

	label input[type='checkbox']:before {
		position: absolute;
		content: '';
		left: 0;
		top: 0px;
		width: 20px;
		height: 20px;
		background: url('/ico/ico-check-box.png') no-repeat center center/12px 12px,
			${props => props.theme.borderColor};
		border-radius: 50%;
	}

	label input[type='checkbox']:checked:after {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 20px;
		height: 20px;
		content: '';
		background: url('/ico/ico-check-box.png') no-repeat center center/12px 12px,
			${props => props.theme.dpBlue};
		border-radius: 50%;
		cursor: pointer;
	}

	span {
		font-size: 14px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		line-height: 18px;
		letter-spacing: -0.28px;
		text-align: left;
		color: ${props => props.theme.dpBlack};
	}
`;

interface IProps {
	option: Array<ISelectType>;
	id: string;
	name: string;
	disable?: boolean;
	registerName?: string;
}

function CheckBoxGroup(props: IProps): JSX.Element {
	const { id, name, option, disable, registerName } = props;
	const methods = useFormContext();

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e);
	};
	return (
		<Container>
			{option.map((item, idx) => (
				<CheckItem key={idx}>
					<label htmlFor="">
						<input
							{...methods.register(`${registerName}`)}
							type="checkbox"
							id={id}
							name={name}
							disabled={disable}
							onChange={onChangeHandler}
						/>
						<span>{item.label}</span>
					</label>
				</CheckItem>
			))}
		</Container>
	);
}

export default React.memo(CheckBoxGroup);

CheckBoxGroup.defaultProps = {
	disable: false,
	registerName: 'undifined',
};
