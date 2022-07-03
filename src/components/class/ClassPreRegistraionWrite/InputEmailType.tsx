import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
`;

interface IProps {
	title: string;
	registerName1: string;
	registerName2: string;
	require?: boolean;
	topLine?: boolean;
	placeholder?: string;
}

function InputEmailType(props: IProps): JSX.Element {
	const { title, registerName1, registerName2, require, topLine, placeholder } =
		props;
	return <Container>d</Container>;
}

export default React.memo(InputEmailType);

InputEmailType.defaultProps = {
	require: false,
	topLine: false,
	placeholder: '',
};
