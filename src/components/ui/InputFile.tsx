import React, { useCallback, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ButtonType } from 'types/ComponentType';
import Button from './Button';

const Container = styled.div`
	width: 100%;
	padding-top: 12px;
	.box {
		position: relative;
		display: flex;
		flex-direction: row;
		.file-item {
			width: 380px;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
			border: solid 1px ${props => props.theme.borderColor};
			outline: none;
		}
	}
`;

export interface IInputFileProps {
	id?: string;
	accept?: string;
	require?: boolean;
	change?: (filename: string, filetype: string, imageData: File) => void;
}

function InputFile(props: IInputFileProps): JSX.Element {
	const { id, accept, change } = props;
	const methods = useFormContext();
	const inputfile = useRef<HTMLInputElement>(null);
	const changeImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const maxSize = 10 * 1024 * 1024;
			const fileSize = file.size;
			if (fileSize < maxSize) {
				if (change) {
					const imageType = file.type.split('/').pop();
					change(file.name, imageType as string, file);
				}
			}
		}
	};
	const clickHandler = useCallback(() => {
		if (inputfile.current) {
			inputfile.current.click();
		}
	}, []);

	return (
		<Container>
			<input
				type="file"
				ref={inputfile}
				id={id}
				accept={accept || '.gif, .jpg, .png'}
				style={{ display: 'none', visibility: 'hidden', width: '0px' }}
				onChange={changeImageFile}
			/>
			<div className="box">
				<input className="file-item" {...methods.register(`file`)} />
				<Button text="파일찾기" type={ButtonType.FILE} click={clickHandler} />
			</div>
		</Container>
	);
}
export default InputFile;

InputFile.defaultProps = {
	id: '아이디',
	accept: '파일확장자',
	require: false,
	change: () => console.warn('change event'),
};
