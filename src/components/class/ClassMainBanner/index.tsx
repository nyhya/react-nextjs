import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css'; //basic
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';
import ClassSlideItem from 'components/class/ClassMainBanner/ClassSlideItem';
import { IClassListItem, IClassResList } from 'types/\bclass';
import { useQuery } from 'react-query';
import { fatchClassMainBanner } from 'api/class';

const Container = styled.div`
	position: relative;
	width: 100%;
	min-width: 1792px;
	height: 512px;
	display: flex;
	align-items: center;
	background: url('/bg/mainBannerBg.jpg') no-repeat left top/cover;
	padding-bottom: 45px;

	.swiper {
		box-sizing: border-box;
		position: relative;
		width: 100%;
		padding: 0px 50px;
	}

	.swiper-button-prev {
		position: absolute;
		left: 30px;
		width: 60px;
		height: 60px;
		margin: 0 1740px 0 0;
		padding: 15px 22px;
		border-radius: 30px;
		box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
		background: url('/ico/ico-prev-arrow.png') no-repeat center center/16px 30px,
			#fff;
	}

	.swiper-button-next {
		position: absolute;
		right: 30px;
		width: 60px;
		height: 60px;
		margin: 0 0 0 1740px;
		padding: 15px 22px;
		border-radius: 30px;
		box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
		background: url('/ico/ico-next-arrow.png') no-repeat center center/16px 30px,
			#fff;
	}

	.swiper-button-next::after,
	.swiper-button-prev::after {
		display: none;
	}
`;

SwiperCore.use([Navigation]);

export default function ClassMainBanner() {
	const { data } = useQuery('classMainBanner', fatchClassMainBanner, {
		keepPreviousData: true,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});

	return (
		<Container>
			<Swiper navigation slidesPerView={5} spaceBetween={30} loop>
				{data?.data &&
					data?.data.map((slideBanner: IClassListItem, key: number) => {
						return (
							<SwiperSlide key={key}>
								<ClassSlideItem item={slideBanner} />
							</SwiperSlide>
						);
					})}
			</Swiper>
		</Container>
	);
}

ClassMainBanner.defaultProps = {
	list: [
		{
			bid: 11397,
			nCnt: 22,
			title: 'test',
			plazaFg: '1',
			eventFromDt: '2022-05-20',
			eventFromHh: '00',
			eventFromMm: '00',
			eventFromDay: 6,
			eventToDt: '2022-05-31',
			eventToHh: '00',
			eventToMm: '00',
			eventToDay: 3,
			eventAddrSido: null,
			eventAddr1: null,
			hostName: 'www.naver.com',
			preRegCloseDt: null,
			classState: null,
			homepage: null,
			adViewYn: 'Y',
			gradePoint: null,
			onLineYn: null,
			gradeYn: null,
			adminYn: null,
			closeState: null,
			preRegisterYn: 'Y',
			speakerName1: '',
			speakerName2: '',
			speakerName3: '',
			speakerBelong1: '',
			speakerBelong2: '',
			speakerBelong3: '',
			insertDt: '2022-05-18T09:41:36',
			uploadfile1: 'aws.png',
			uploadfile2: null,
			uploadfile1Stored:
				'https://img.vogue.co.kr/vogue/2021/03/style_60544e73dfcf1-930x620.jpg',
			uploadfile2Stored: null,
			fileIdx1: null,
			fileIdx2: null,
			eventConnectType: null,
			preRegClosed: true,
		},
	],
};
