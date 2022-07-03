import PcWrapper from "components/common/PcWrapper";
import styled from "styled-components";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputRadioType from "components/class/ClassPreRegistraionWrite/InputRadioType";
import InputTextType from "components/class/ClassPreRegistraionWrite/InputTextType";
import InputSelectType from "components/class/ClassPreRegistraionWrite/InputSelectType";
import InputCalenderType from "components/class/ClassPreRegistraionWrite/InputCalenderType";
import InputCheckType from "components/class/ClassPreRegistraionWrite/InputCheckType";
import InputAreaType from "components/class/ClassPreRegistraionWrite/InputAreaType";
import InputAddressSearch from "components/class/ClassPreRegistraionWrite/InputAddressSearch";
import InputCalendar from "components/class/ClassPreRegistraionWrite/InputCalendar";
import InputImageUpload from "components/class/ClassPreRegistraionWrite/InputImageUpload";
import InputAccount from "components/class/ClassPreRegistraionWrite/InputAccount";
import dynamic from "next/dynamic";
import { IClassMake } from "types/\bclass";
import dayjs from "dayjs";
import InputPhoneType from "components/class/ClassPreRegistraionWrite/InputPhoneType";
import InputEmailType from "components/class/ClassPreRegistraionWrite/InputEmailType";

const Container = styled.div`
	width: 100%;
	
	.category-name {
		display: flex;
		justify-content: space-between;
		font-size: 20px;
		font-weight: 500;
		letter-spacing: -0.4px;
		color: ${props => props.theme.dpBlack};
		margin-top: 50px;
		padding-bottom: 15px;

		.sub {
			font-size: 14px;
			font-weight: 500;
			line-height: 20px;
			letter-spacing: -0.28px;
			color: #fd7b57;
		}
	}

	.table-con {
		width: 100%;
	}
`;


const adTypeOptions = [
	{ value: 'GENERAL', label: '일반' },
	{ value: 'PREMIUM', label: '광고' },
];

const clasNameoptions = [
	{ value: '학술대회', label: '학술대회' },
	{ value: '세미나', label: '세미나' },
	{ value: '심포지엄', label: '심포지엄' },
	{ value: '연수강좌', label: '연수강좌' },
	{ value: '기타', label: '기타' },
];

const options = [
	{ value: 'normal', label: '일반' },
	{ value: 'advertisement', label: '광고' },
];

const eventTypeOptions = [
	{ value: 'online', label: '온라인' },
	{ value: 'offline', label: '오프라인' },
];


interface FormValue {
	name: string;
	nickname: string;
	email: string;
	password: string;
	password_confirm: string;
	adType:string;
}

const Contents = dynamic(
	() => import('components/class/ClassPreRegistraionWrite/SmartEditor'),
	{
		ssr: false,
	},
);


export default function PreRegistrationWrite():JSX.Element{
    const methods = useForm<FormValue>();
	const [postParam, setPostParam] = useState<IClassMake>();


	useEffect(()=>{
		console.log(postParam);
	},[postParam])

	const onAdTypeChang = (select:string) => {
		// setPostParam({...postParam, })
	}

	/**
	 * @function onDateRangeHandler
	 * @description 일시(진행기간)
	 */
	const onDateRangeHandler = (startDate: string, endDate: string) => {
		const start = dayjs(startDate).format('YYYY-MM-DD');
		const end = dayjs(startDate).format('YYYY-MM-DD');
		setPostParam({...postParam, eventFromDt:start,eventToDt:end })
	};

	/**
	 * @function onChangePreRegCloseDate
	 * @description 사전등록 마감일자
	 */
	const onChangePreRegCloseDate = (date:string) => {
		const preCloseDate = dayjs(date).format('YYYY-MM-DD');
		setPostParam({...postParam, preRegCloseDt: preCloseDate});

	}

	/**
	 * @function onSumbmitHandler
	 * @description 제출하기 버튼 
	 */
	const onSumbmitHandler: SubmitHandler<FormValue> = (data) => {
		console.log(data.adType);
		
	};
    return(
        <Container>
            <PcWrapper>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSumbmitHandler)}>
                         <p className="category-name">
                            <span>기본 정보</span>
                            <span className="sub">
                                필수입력항목<span>&nbsp;*</span>
                            </span>
                        </p>
                      
                        <InputRadioType id="adRadio" name="adType" title='광고유형' registerName="adType" topLine option={adTypeOptions} onChangeHandler={onAdTypeChang} />
						<p className="category-name">
							<span>클래스 정보</span>
							<span className="sub">
								필수입력항목<span>&nbsp;*</span>
							</span>
						</p>
						<div className="table-con">
							<InputTextType title="클래스명"  registerName="className" topLine />
							<InputSelectType
								id="plaza"
								name="plazaFg"
								title="구분"
								registerName="plazaFg"
								option={clasNameoptions}
							/>
							<InputTextType title="주관"  registerName="hostName" />
							<InputCalenderType title="일시 (진행기간)" onDateRange={onDateRangeHandler} />
							<InputCheckType
								id="eventType"
								name="eventType"
								title="행사 형태"
								registerName="eventType"
								option={eventTypeOptions}
							/>
							<InputTextType
								title="장소 (메인)"
								registerName="place"
								placeholder="장소를 입력해 주세요"
							/>
							<InputAreaType title="행사정보" registerName="eventInfoTextArea" />
							<InputAddressSearch
								title="주소"
								registerName1="zipCode"
								registerName2="address"
							/>
							<InputCalendar title="사전등록 마감일" change={onChangePreRegCloseDate}/>
							<InputImageUpload title="대표이미지" accept=".bmp,.jpg,.png,.jpeg,.gif"/>
							<InputImageUpload title="관련자료 업로드" accept=".bmp,.jpg,.png,.jpeg,.gif,.hwp,.pdf,.xls,.zip,.pptx,.xlsx,.doc" />
							<InputTextType
								title="연수평점"
								registerName="gradePoint"
								width="160px"
								extraText="점"
							/>
							<InputTextType
								title="수강료"
								registerName="tuition"
								width="160px"
								extraText="원"
							/>
							<InputAccount title="계좌번호" option={options} />
							<Contents title="내용" name="editor" />
						</div>
						<p className="category-name">
                            <span>문의처 정보</span>
                            <span className="sub">
                                필수입력항목<span>&nbsp;*</span>
                            </span>
                        </p>
						<InputImageUpload title="로고 업로드" accept=".jpg,.png,.jpeg,.gif" topLine />
						<InputAddressSearch
							title="주소"
							registerName1="zipCode"
							registerName2="address"
						/>
						<InputPhoneType title="전화번호" registerName1="middlePhone" registerName2="lastPhone" />
						<InputEmailType title="이메일" registerName1="emailId" registerName2="emailHost"/>
						<InputTextType
								title="홈페이지"
								registerName="homepage"
								placeholder="http:// 를 제회하고 입력해주세요."
							/>
					
                        <input type="submit" />
                    </form>
                </FormProvider>
            </PcWrapper>
        </Container>
    )
};