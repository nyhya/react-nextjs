import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ISelectType, SelectBoxDesignType } from 'types/ComponentType';

const handleDesignType = (type: SelectBoxDesignType) => {
	switch (type) {
		case SelectBoxDesignType.SORT:
			return '120px';
		case SelectBoxDesignType.SCRAP:
			return '250px';
		case SelectBoxDesignType.NORMAL:
			return '160px';
		default:
			return '';
	}
};

const Container = styled.div<{ tabIndex: number; type: SelectBoxDesignType }>`
	position: relative;
	width: ${({ type }) => handleDesignType(type)};
`;

const SelectButton = styled.div<{ type: SelectBoxDesignType }>`
	${props => {
		switch (props.type) {
			case SelectBoxDesignType.SORT:
				return css`
					width: 100%;
					height: 34px;
					border-radius: 4px;
					border: solid 1px ${props => props.theme.borderColor};
					background-color: #fff;
					display: flex;
					align-items: center;
					padding-left: 10px;
					background: url('/ico/ico-select-option.png') no-repeat 95%
						center/10px 10px;
					cursor: pointer;
					font-size: 14px;
					letter-spacing: -0.28px;
					line-height: 34px;
					color: ${props => props.theme.dpGrayDeep};
				`;
			case SelectBoxDesignType.SCRAP:
				return css`
					width: 100%;
					height: 40px;
					border-radius: 4px;
					border: solid 1px ${props => props.theme.borderColor};
					background-color: #fff;
					display: flex;
					align-items: center;
					padding-left: 10px;
					background: url('/ico/btn-select-option.png') no-repeat 95%
						center/10px 10px;
					cursor: pointer;
					font-size: 14px;
					letter-spacing: -0.28px;
					line-height: 40px;
					color: ${props => props.theme.dpBlack};
				`;
			case SelectBoxDesignType.NORMAL:
				return css`
					width: 100%;
					height: 34px;
					border-radius: 4px;
					border: solid 1px ${props => props.theme.borderColor};
					background-color: #fff;
					display: flex;
					align-items: center;
					padding-left: 10px;
					background: url('/ico/ico-select-option.png') no-repeat 95%
						center/10px 10px;
					cursor: pointer;
					font-size: 14px;
					letter-spacing: -0.28px;
					line-height: 40px;
					color: ${props => props.theme.dpBlack};
				`;
			default:
				return css``;
		}
	}}
`;

const SelectListBox = styled.div<{ active: boolean }>`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	display: ${props => (props.active ? 'block' : 'none')};
	border-radius: 4px;
	border: solid 1px ${props => props.theme.dpblue};
	background-color: white;
	padding-left: 10px;
	z-index: 99999;
	ui {
		padding: 10px;
	}
`;

const OptionItem = styled.div<{ active: boolean }>`
	color: ${props => props.theme.dpblack};
	line-height: 34px;
	font-size: 14px;
	cursor: pointer;

	&:hover {
		color: ${props => props.theme.dpBlue};
	}

	${props =>
		props.active &&
		css`
			color: ${props => props.theme.dpGrayDeep};
			text-decoration: underline;
		`}
`;

interface IProps {
	type: SelectBoxDesignType;
	label: string;
	options: Array<ISelectType>;
	selectHandler: (selected: string | number) => void;
}

function SelectBox(props: IProps): JSX.Element {
	const { type, label, options, selectHandler } = props;
	const [selectOption, setSelectOption] = useState<string | number>(label);
	const [onToogle, setOnToggle] = useState(false);

	const onClickHandler = () => {
		setOnToggle(true);
	};

	const onClickSelectOption = (selected: {
		value: string | number;
		label: string;
	}) => {
		setSelectOption(selected.label);
		setOnToggle(false);
		if (selectHandler) {
			selectHandler(selected.value);
		}
	};

	const onBlurHandler = () => {
		setOnToggle(false);
	};

	return (
		<Container type={type} onBlur={onBlurHandler} tabIndex={0}>
			<SelectButton type={type} onClick={onClickHandler}>
				<span>{selectOption}</span>
			</SelectButton>
			<SelectListBox active={onToogle}>
				<ul>
					{options.map((option, key) => (
						<OptionItem
							active={selectOption === option.label}
							key={key}
							onClick={e => {
								onClickSelectOption(option);
							}}
						>
							{option.label}
						</OptionItem>
					))}
				</ul>
			</SelectListBox>
		</Container>
	);
}

export default React.memo(SelectBox);
