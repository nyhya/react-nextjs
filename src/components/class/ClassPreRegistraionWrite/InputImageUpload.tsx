import { PostClassImageLoader } from 'api/class';
import InputFile from 'components/ui/InputFile';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

const Container = styled.div<{ topLine: boolean; require: boolean }>`
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
			display: ${props => (props.require ? 'inline-block' : 'none')};
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

		input {
			width: 100%;
			height: 34px;
			font-size: 14px;
			line-height: 20px;
			letter-spacing: -0.28px;
			color: var(--very-light-pink);
			border-radius: 4px;
			border: solid 1px ${props => props.theme.borderColor};
			padding: 10px;

			::placeholder {
				font-size: 14px;
				line-height: 20px;
				letter-spacing: -0.28px;
				color: ${props => props.theme.borderColor};
			}
		}
		padding: 12px 12px 12px 20px;
	}

	.box-list {
		position: relative;
		width: 480px;
		.file-list {
			box-sizing: border-box;
			position: relative;
			width: 480px;
			height: 34px;
			font-size: 14px;
			letter-spacing: -0.28px;
			color: ${props => props.theme.dpBlack};
			border-radius: 4px;
			border: solid 1px ${props => props.theme.borderColor};
			margin-top: 5px;
			padding: 10px;
		}

		.momory {
			position: absolute;
			right: 46px;
			top: 7.5px;
			font-size: 12px;
			font-weight: 300;
			line-height: 17px;
			letter-spacing: -0.24px;
			color: ${props => props.theme.dpBlack};
		}

		.file {
			position: absolute;
			right: 24px;
			top: 11px;
			width: 12px;
			height: 12px;
			background: url('/btn/btn-file-del.png') no-repeat right center/12px 12px;
		}
	}

	.desc {
		font-size: 14px;
		line-height: 20px;
		letter-spacing: -0.28px;
		text-align: left;
		color: ${props => props.theme.dpGrayDeep};
		background: url('/ico/ico-desc.png') no-repeat left center/10px 10px;
		padding-left: 12px;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.warning-massage {
		display: ${props => (props.require ? 'inline-block' : 'none')};
		font-size: 13px;
		line-height: 19px;
		letter-spacing: -0.26px;
		color: #f00;
	}
`;

interface IProps {
	title: string;
	require?: boolean;
	topLine?: boolean;
	accept: string;
}

function InputImageUpload(props: IProps): JSX.Element {
	const { title, require, topLine, accept } = props;
	const [fileList, setFileList] = useState<Array<{ image: string }>>([]);

	const { mutate } = useMutation((data: FormData) =>
		PostClassImageLoader(data),
	);

	const changeHandler = (
		imagename: string,
		imagetype: string,
		imagedata: File,
	) => {
		if (fileList.length <= 3) {
			const formData = new FormData();
			formData.append('img', imagedata);
			formData.append('contextPath', 'LEAFLET_FILE');
			mutate(formData);

			setFileList([...fileList, { image: imagename }]);
		}
	};

	const onClickFileDel = useCallback(() => {
		console.log('첨부파일 삭제');
	}, []);

	return (
		<Container topLine={topLine || false} require={require || false}>
			<div className="title">
				{title}
				<span className="require">&nbsp;*</span>
			</div>
			<div className="input-text">
				<InputFile accept={accept} change={changeHandler} />
				<div className="box-list">
					<ul>
						{fileList.map((item, key) => {
							return (
								<li key={key} className="file-list">
									{item.image}
									<p className="momory">0.05MB</p>
									<button
										type="button"
										className="file"
										onClick={onClickFileDel}
									/>
								</li>
							);
						})}
					</ul>
				</div>
				<p className="desc">
					첨부파일은 최대 3개, 1회 파일 제한 크기 10MB까지만 등록 가능합니다.
				</p>
				<p className="warning-massage">{title}를 입력해주세요.</p>
			</div>
		</Container>
	);
}

export default React.memo(InputImageUpload);

InputImageUpload.defaultProps = {
	topLine: false,
	require: false,
};
