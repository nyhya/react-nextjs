import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ISelectType } from 'types/ComponentType';

const Container = styled.div<{ width: string; tabIndex: number }>`
	position: relative;
	width: ${props => (props.width ? props.width : '100%')};
	margin-right: 10px;
	label {
		display: block;
		line-height: 20px;
		font-size: 14px;
		letter-spacing: -0.28px;
		color: ${props => props.theme.dpblack};
		margin-bottom: 5px;
	}
`;

const Button = styled.div<{ width: string }>`
	width: ${props => (props.width ? props.width : '100%')};
	height: 24px;
	line-height: 24px;
	font-size: 16px;
	font-weight: 500;
	letter-spacing: -0.32px;
	text-align: left;
	color: ${props => props.theme.dpblack};
	background: url('/ico/ico-dropdown.png') no-repeat right center/10px 10px;
	cursor: pointer;
`;

const DropDownList = styled.ul<{ width: string }>`
	position: relative;
	width: ${props => (props.width ? props.width : '100%')};
	min-width: 135px;
	border-radius: 5px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
	background-color: #fff;
	padding: 20px;
	transform: translate(-31px, 25px);

	li {
		font-size: 14px;
		line-height: 20px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		letter-spacing: -0.28px;
		text-align: left;
		color: ${props => props.theme.dpblack};
		cursor: pointer;
		margin-bottom: 10px;

		&:hover {
			color: ${props => props.theme.dpblue};
		}

		&:last-child {
			margin-bottom: 0;
		}
	}
`;

const DropDownListItem = styled.li`
	font-size: 14px;
	line-height: 20px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	letter-spacing: -0.28px;
	text-align: left;
	color: ${props => props.theme.dpblack};
	cursor: pointer;
	margin-bottom: 10px;

	&:hover {
		color: ${props => props.theme.dpblue};
	}

	&:last-child {
		margin-bottom: 0;
	}
`;

const ButtonClose = styled.button`
	position: absolute;
	right: 10px;
	top: 10px;
	width: 24px;
	height: 24px;
	border: 0;
	background: url('/ico/btn-close.png') no-repeat right center/24px auto,
		transparent;
	cursor: pointer;
`;

interface IProps {
	option: Array<ISelectType>;
	label: string;
	width: string;
	reset: boolean;
	onReset: () => void;
	onSelect: (selectOption: ISelectType) => void;
}

export default React.memo(function DropDownMenu(props: IProps): JSX.Element {
	const { option, label, width, reset, onReset, onSelect } = props;
	const [open, setOpen] = useState<boolean>(false);
	const [select, setSelect] = useState<string>(option[0].label);

	const changeSelected = (selectOption: ISelectType) => {
		setOpen(!open);
		setSelect(selectOption.label);
		if (onSelect) {
			onSelect(selectOption);
		}
	};

	useEffect(() => {
		if (reset) {
			setSelect(option[0].label);
			onReset();
		}
	}, [reset]);

	const onBlurHandler = () => {
		setOpen(false);
	};

	return (
		<Container width={width} onBlur={onBlurHandler} tabIndex={0}>
			<label>{label}</label>
			<Button width={width} className="category" onClick={() => setOpen(!open)}>
				{select}
			</Button>
			{open && (
				<DropDownList width={width}>
					<ButtonClose onClick={() => setOpen(!open)} />
					{option &&
						option.map((option, idx) => (
							<DropDownListItem
								key={idx}
								value={option.label}
								onClick={e => {
									changeSelected(option);
								}}
							>
								{option.label}
							</DropDownListItem>
						))}
				</DropDownList>
			)}
		</Container>
	);
});

// https://ko.reactjs.org/docs/typechecking-with-proptypes.html
// ClassDropDown.propTypes = {
// 	option: PropTypes.Array<{ value: number; label: string }>
//   };

// ClassDropDown.defaultProps = {
// 	option: 'Stranger',
// 	lagel: 'Stranger',
// };
