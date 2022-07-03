import React, {
	MouseEvent,
	MouseEventHandler,
	useEffect,
	useState,
} from 'react';
import styled, { css } from 'styled-components';
import DownLoadIco from 'images/ico/ico-download.png';
import { ButtonType } from '../../types/ComponentType';

const Container = styled.div<{
	buttonType: ButtonType;
	active?: boolean;
	disabled?: boolean;
}>`
	display: flex;
	align-items: center;

	${props => {
		switch (props.buttonType) {
			case ButtonType.RESET:
				return css`
					button {
						position: relative;
						width: 108px;
						display: inline-block;
						font-family: 'NotoSansKR' !important;
						font-weight: 600;
						color: #b7b7b7;
						font-size: 14px;
						background-color: transparent;
						line-height: 20px;
						border: 0;
						outline: 0;
						padding: 0 0 0 23px;
						text-align: left;
						cursor: pointer;
						&::before {
							position: absolute;
							left: 0;
							top: -1px;
							width: 20px;
							height: 20px;
							content: '';
							background: url('/ico/ico-reset.png') no-repeat left center/20px
								20px;
						}
					}
				`;
			case ButtonType.SEARCH:
				return css`
					button {
						position: relative;
						width: 130px;
						height: 50px;
						font-size: 16px;
						font-weight: bold;
						font-stretch: normal;
						font-style: normal;
						line-height: 1.63;
						letter-spacing: -0.32px;
						text-align: center;
						color: #fff;
						border-radius: 5px;
						background-color: ${props => props.theme.dpblack};
						border: 0;
						outline: 0;
						cursor: pointer;
					}
				`;
			case ButtonType.CHECK:
				if (props.active) {
					return css`
						button {
							position: relative;
							height: 20px;
							display: inline-block;
							background: url('/ico/ico-active-check.png') no-repeat 10px
								center/14px 14px;
							font-size: 14px;
							font-weight: 500;
							line-height: 20px;
							letter-spacing: -0.28px;
							color: ${props => props.theme.dpBlue};
							padding-left: 29px;
						}
					`;
				}
				if (!props.active) {
					return css`
						button {
							position: relative;
							height: 20px;
							display: inline-block;
							background: url('/ico/ico-check.png') no-repeat 10px center/14px
								14px;
							font-size: 14px;
							font-weight: 500;
							line-height: 19px;
							letter-spacing: -0.28px;
							color: ${props => props.theme.dpGrayDeep};
							padding-left: 29px;
						}
					`;
				}
				break;
			case ButtonType.NORMAL:
				if (!props.disabled) {
					return css`
						button {
							position: relative;
							width: 160px;
							border-radius: 5px;
							background-color: ${props => props.theme.dpBlue};
							font-size: 16px;
							font-weight: 500;
							line-height: 24px;
							letter-spacing: -0.32px;
							text-align: center;
							color: #fff;
							padding: 8px 0px;
							border: 0;
							outline: 0;
							cursor: pointer;
						}
					`;
				}
				if (props.disabled) {
					return css`
						button {
							position: relative;
							width: 160px;
							border-radius: 5px;
							background-color: ${props => props.theme.dpGrayLight};
							font-size: 16px;
							font-weight: 500;
							line-height: 24px;
							letter-spacing: -0.32px;
							text-align: center;
							color: #fff;
							padding: 8px 0px;
							border: 0;
							outline: 0;
							pointer-events: none;
						}
					`;
				}

				break;
			case ButtonType.LINE:
				return css`
					button {
						box-sizing: border-box;
						position: relative;
						width: 160px;
						border-radius: 5px;
						border: solid 1px ${props => props.theme.dpBlue};
						background-color: #fff;
						font-size: 16px;
						font-weight: 500;
						line-height: 24px;
						letter-spacing: -0.32px;
						color: ${props => props.theme.dpBlue};
						padding: 8px 28px 8px 10px;
						outline: 0;
						cursor: pointer;

						::after {
							position: absolute;
							right: 10px;
							top: 0;
							width: 18px;
							height: 100%;
							content: '';
							background: url('/ico/btn-download.png') no-repeat right
								center/18px 18px;
						}
					}
				`;
				break;
			case ButtonType.BACK:
				return css`
					button {
						position: relative;
						width: 100%;
						display: flex;
						align-items: center;
						font-size: 14px;
						font-weight: 500;
						line-height: 30px;
						letter-spacing: -0.28px;
						color: ${props => props.theme.dpBlack};
						border-bottom: 1px solid ${props => props.theme.dpGrayLight};
						padding: 20px 0px 20px 35px;

						::after {
							position: absolute;
							left: 0px;
							top: calc(50% - transform(translateY(-50%)));
							width: 30px;
							height: 30px;
							content: '';
							background: url('/ico/btn-back.png') no-repeat right center/30px
								30px;
						}
					}
				`;
				break;
			case ButtonType.NORMALGRAY:
				return css`
					button {
						position: relative;
						width: 100px;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 4px;
						font-size: 14px;
						line-height: 20px;
						letter-spacing: -0.28px;
						text-align: center;
						background-color: ${props => props.theme.borderColor};
						color: ${props => props.theme.dpBlack};
						padding: 7px 0px;
					}
				`;
				break;
			case ButtonType.FILE:
				return css`
					button {
						position: relative;
						width: 100px;
						display: flex;
						align-items: center;
						justify-content: center;
						border-top-left-radius: 0px;
						border-bottom-left-radius: 0px;
						border-top-right-radius: 4px;
						border-bottom-right-radius: 4px;
						font-size: 14px;
						line-height: 20px;
						letter-spacing: -0.28px;
						text-align: center;
						background-color: ${props => props.theme.borderColor};
						color: ${props => props.theme.dpBlack};
						padding: 7px 0px;
					}
				`;
				break;
			default:
				return css``;
		}
	}}
`;

interface IProp {
	type: ButtonType;
	text: string;
	click: () => void;
	active?: boolean;
	disabled?: boolean;
}

function Button(props: IProp): JSX.Element {
	const { type, text, click, active, disabled } = props;

	useEffect(() => {
		// console.log('disabled', disabled);
	}, []);

	const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		if (click) {
			click();
		}
	};
	return (
		<Container buttonType={type} active={active} disabled={disabled}>
			<button type="button" onClick={onClickHandler} style={{}}>
				{text}
			</button>
		</Container>
	);
}

export default React.memo(Button);

Button.defaultProps = {
	active: false,
	disabled: false,
};
