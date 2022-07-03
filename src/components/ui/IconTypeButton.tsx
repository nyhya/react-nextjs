import React from 'react';
import styled, { css } from 'styled-components';
import { ButtonIconType } from '../../types/ComponentType';

const Container = styled.div<{
	buttonType: ButtonIconType;
	after: boolean;
	active?: boolean;
}>`
	position: relative;

	display: flex;
	align-items: center;
	margin-right: ${props => (props.after ? '10px' : 0)};

	${props => {
		switch (props.after) {
			case true:
				return css`
					&:after {
						position: absolute;
						right: -5px;
						top: transform(translate(0, -50%));
						content: '';
						width: 1px;
						height: 15px;
						background-color: ${props => props.theme.borderColor};
					}
				`;
			case false:
				return css`
					&:after {
						content: none;
					}
				`;
			default:
				return css``;
		}
	}}

	${props => {
		switch (props.buttonType) {
			case ButtonIconType.THUMBNAIL:
				if (props.active) {
					return css`
						button {
							position: relative;
							width: 34px;
							height: 34px;
							border: 0;
							outline: 0;
							cursor: pointer;
							background: url('/ico/btn-active-thumb.png') no-repeat center
								center/20px auto;
						}
					`;
				}
				if (!props.active) {
					return css`
						button {
							position: relative;
							width: 34px;
							height: 34px;
							border: 0;
							outline: 0;
							cursor: pointer;
							background: url('/ico/btn-thumb.png') no-repeat center center/20px
								auto;
						}
					`;
				}
				break;
			case ButtonIconType.LIST:
				if (props.active) {
					return css`
						button {
							position: relative;
							width: 34px;
							height: 34px;
							background: url('/ico/btn-active-list.png') no-repeat center
								center/20px auto;
							border: 0;
							outline: 0;
							cursor: pointer;
						}
					`;
				}
				if (!props.active) {
					return css`
						button {
							position: relative;
							width: 34px;
							height: 34px;
							background: url('/ico/btn-list.png') no-repeat center center/20px
								auto;
							border: 0;
							outline: 0;
							cursor: pointer;
						}
					`;
				}
				break;
			case ButtonIconType.SCRAP:
				return css`
					button {
						width: 40px;
						height: 40px;
						display: inline-block;
						border-radius: 5px;
						border: 1px solid ${props => props.theme.borderColor};
						background: url('/ico/btn-faverite.png') no-repeat center
							center/18px 18px #fff;
					}
				`;
			case ButtonIconType.SHARE:
				return css`
					button {
						width: 40px;
						height: 40px;
						display: inline-block;
						border-radius: 5px;
						border: 1px solid ${props => props.theme.borderColor};
						background: url('/ico/btn-share.png') no-repeat center center/18px
							18px #fff;
					}
				`;
			default:
				return css``;
		}
	}}
`;

interface IProp {
	type: ButtonIconType;
	after?: boolean;
	onClick: () => void;
	active?: boolean;
}

function IconTypeButton(props: IProp): JSX.Element {
	const { type, after, onClick, active } = props;

	const onClickHandler = () => {
		if (!active) {
			onClick();
		}
	};

	return (
		<Container active={active} after={after || false} buttonType={type}>
			<button type="button" onClick={onClickHandler} />
		</Container>
	);
}

IconTypeButton.defaultProps = {
	active: false,
	after: false,
};

export default React.memo(IconTypeButton);
