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
		width: 300px;

		main {
			width: 100%;
			border-top-left-radius: 3px;
			border-top-right-radius: 3px;
			padding: 90px 0px 10px 0px;
			background: url('/ico/ico-alert.png') no-repeat center 30px/50px 50px;
			background-color: white;
			p {
				font-size: 14px;
				line-height: 1.43;
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
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
			background-color: white;
			padding-bottom: 30px;
			button {
				width: 56px;
				height: 30px;
				border-radius: 2px;
				background-color: ${props => props.theme.dpGrayDeep};
				font-size: 14px;
				font-weight: 500;
				line-height: 20px;
				letter-spacing: -0.28px;
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

export default function Alert() {
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
