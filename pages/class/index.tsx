import ClassMainBanner from 'components/class/ClassMainBanner/index';
import styled from 'styled-components';
import ClassSearch from 'components/class/ClassSearch';
import { fatchClassList, fatchClassMainBanner } from 'api/class';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { IClassListItem } from 'types/\bclass';
import { instance } from 'api';
import Head from 'next/head';

const Container = styled.div``;

export default function ClassPage() {
	return (
		<Container>
			<Head>
				<title>메인 | DAUM</title>
			</Head>
			<ClassMainBanner />
			<ClassSearch />
		</Container>
	);
}

export async function getStaticProps() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(
		'fatchClassMainBanner',
		async () => await fatchClassMainBanner,
	);

	await queryClient.prefetchQuery(
		'fatchClassList',
		async () => await fatchClassList({	curPage: 1,
			pageScale: 10,}),
	);

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
		},
	};
}
