import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { alertActions } from 'store/common/alertModal';
import styled from 'styled-components';
import { AlertModalType } from 'types/ComponentType';

const Container = styled.div<{ open: boolean; modalType: AlertModalType }>`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: ${props => (props.open ? 'flex' : 'none')};
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.7);
	animation: modal-bg-show 0.3s;
	z-index: 9000;

	.alert-box {
		width: 100%;
		width: 320px;

		header {
			position: relative;
			box-sizing: border-box;
			width: 100%;
			height: 60px;
			display: ${props =>
				props.modalType === AlertModalType.HEADERTYPE ? 'flex' : 'none'};
			background-color: ${props => props.theme.dpBlue};
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			padding: 0px 30px;
		}

		main {
			width: 100%;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			padding: 30px 0px 20px 0px;
			background-color: white;
			p {
				font-size: 16px;
				line-height: 24px;
				letter-spacing: -0.32px;
				text-align: center;
				color: ${props => props.theme.dpBlack};
				.point {
					color: ${props => props.theme.dpBlue};
				}
			}
		}
		footer {
			display: flex;
			justify-content: center;
			padding-bottom: 30px;
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
			background-color: white;
			button {
				width: 100px;
				height: 36px;
				border-radius: 2px;
				background-color: ${props => props.theme.dpBlue};
				font-size: 14px;
				font-weight: 500;
				text-align: center;
				color: #fff;
			}
		}
	}

	@keyframes modal-bg-show {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

export default function AlertModal() {
	const dispatch = useDispatch();
	const { open, modalType, headerTxt, contentTxt } = useSelector(
		(state: RootState) => state.alertModal,
	);

	const onClickAlertModal = useCallback(() => {
		dispatch(alertActions.rdxModalClose());
	}, []);

	return (
		<Container open={open} modalType={modalType}>
			<section className="alert-box">
				<header>
					<span>{headerTxt}</span>
				</header>
				<main>
					<p dangerouslySetInnerHTML={{ __html: contentTxt }} />
				</main>
				<footer>
					<button type="button" onClick={onClickAlertModal}>
						확인
					</button>
				</footer>
			</section>
		</Container>
	);
}
