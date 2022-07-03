import SelectBox from 'components/ui/SelectBox';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { scrapActions } from 'store/common/scrapModal';
import styled from 'styled-components';
import { ISelectType, SelectBoxDesignType } from 'types/ComponentType';

const Container = styled.div<{ open: boolean }>`
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

	section {
		position: relative;
		width: 510px;

		header {
			position: relative;
			box-sizing: border-box;
			width: 100%;
			height: 60px;
			background-color: ${props => props.theme.dpBlue};
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			padding: 0px 30px;
			span {
				line-height: 60px;
				font-size: 20px;
				font-weight: 500;
				letter-spacing: -0.4px;
				color: #fff;
			}

			button {
				position: absolute;
				top: 10px;
				right: 10px;
				width: 40px;
				height: 40px;
				background: url(/btn/btn-modal-close.png) no-repeat right center/100%
					100%;
			}
		}

		main {
			background-color: white;
			padding: 30px 88px;
			.folder-select {
				display: flex;
				align-items: center;
				margin-bottom: 10px;
				span {
					font-size: 14px;
					line-height: 20px;
					letter-spacing: -0.28px;
					margin-right: 30px;
					color: ${props => props.theme.dpBlack};
				}

				select {
					width: 250px;
					height: 40px;
					padding: 10px;
					border-radius: 4px;
					border: solid 1px ${props => props.theme.dpGrayLight};
					font-size: 14px;
					line-height: 20px;
					letter-spacing: -0.28px;
					background: url('/ico/btn-select-option.png') no-repeat 95%
						center/10px 10px;
					color: ${props => props.theme.dpBlack};
					outline: none;
				}
			}
			.folder-add {
				display: flex;
				align-items: center;
				span {
					font-size: 14px;
					line-height: 20px;
					letter-spacing: -0.28px;
					margin-right: 30px;
					color: ${props => props.theme.dpBlack};
				}
				.input-area {
					display: flex;
					align-items: center;
					input {
						box-sizing: border-box;
						width: 184px;
						height: 40px;
						border-left: solid 1px ${props => props.theme.dpGrayLight};
						border-top: solid 1px ${props => props.theme.dpGrayLight};
						border-bottom: solid 1px ${props => props.theme.dpGrayLight};
						border-right: none;
						border-top-left-radius: 4px;
						border-bottom-left-radius: 4px;
						padding-left: 10px;
						outline: none;
					}

					button {
						width: 65px;
						height: 40px;
						font-size: 14px;
						font-weight: 500;
						line-height: 20px;
						letter-spacing: -0.28px;
						color: ${props => props.theme.dpGrayDeep};
						border-top-right-radius: 4px;
						border-bottom-right-radius: 4px;
						border: solid 1px ${props => props.theme.dpGrayLight};
					}
				}
			}
		}
		footer {
			width: 100%;
			display: flex;
			justify-content: center;
			background-color: #fff;
			padding-bottom: 30px;
			button {
				width: 140px;
				height: 40px;
				border-radius: 5px;
				font-size: 16px;
				font-weight: 500;
				line-height: 24px;
				letter-spacing: -0.32px;
				text-align: center;
				color: #fff;
			}

			.cancle {
				background-color: ${props => props.theme.dpGrayDeep};
				margin-right: 10px;
			}

			.apply {
				background-color: ${props => props.theme.dpBlue};
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

const options = [
	{ value: 'insert', label: '최신순' },
	{ value: 'view', label: '인기순' },
	{ value: 'close', label: '마감일순' },
];

export default function ScrapModal() {
	const dispatch = useDispatch();
	const { open } = useSelector((state: RootState) => state.scrapModal);

	const onClickCloseModal = useCallback(() => {
		dispatch(scrapActions.rdxScrapModalOpen(false));
	}, []);

	const selectHandler = useCallback((select: string | number) => {
		console.log('selected:', select);
	}, []);

	return (
		<Container open={open}>
			<section>
				<header>
					<span>스크랩</span>
					<button type="button" onClick={onClickCloseModal} />
				</header>
				<main>
					<div className="folder-select">
						<span>폴더 선택</span>
						<SelectBox
							type={SelectBoxDesignType.SCRAP}
							selectHandler={selectHandler}
							label="최신순"
							options={options}
						/>
					</div>
					<div className="folder-add">
						<span>폴더 추가</span>
						<div className="input-area">
							<input type="text" />
							<button type="button">추가</button>
						</div>
					</div>
				</main>
				<footer>
					<div className="box">
						<button className="cancle" type="button">
							취소
						</button>
						<button className="apply" type="button">
							스크랩
						</button>
					</div>
				</footer>
			</section>
		</Container>
	);
}
