import { fatchClassDetailView, fatchClassList } from "api/class";
import ClassDetail from "components/class/ClassDetailView/ClassDetail";
import ClassSideList from "components/class/ClassDetailView/ClassSideList";
import PcWrapper from "components/common/PcWrapper";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import styled from "styled-components";
import { IClassDetailResView } from "types/\bclass";
import ScrapModal from 'components/common/popup/ScrapModal';
import Head from "next/head";

const Conatiner = styled.div`
        display: flex;
		justify-content: space-between;
    	width: 100%;
`;

interface IProps{
	item:IClassDetailResView;
}




const ClassDetailView = () => {
	const router = useRouter();
	const { classId } = router.query;
	

	// const item = useQuery(
	// 	'classDetail',
	// 	() => fatchClassDetailView(classId as string),
	// 	{
	// 		keepPreviousData: true,
	// 		refetchOnMount: false,
	// 		refetchOnWindowFocus: false,
	// 	},
	// );

	return (
		<PcWrapper>
			<Conatiner>
				<Head>
					<title>서버사이드 렌더링 </title>
				</Head>
				<ClassSideList classId={classId as string} />
				<ClassDetail classId={classId as string}/>
			</Conatiner>
	    </PcWrapper>
	)
  }



export async function getServerSideProps(context:any) {
	const classId = context.params.id;
	const queryClient = new QueryClient()
  
	await queryClient.prefetchQuery('classListDetailView', () => fatchClassDetailView(classId))

	await queryClient.prefetchQuery(
		'fatchClassList',
		async () => await fatchClassList({	curPage: 1,
			pageScale: 10,}),
	);
  
	return {
	  props: {
		dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
	  }
	}
  }



export default ClassDetailView;