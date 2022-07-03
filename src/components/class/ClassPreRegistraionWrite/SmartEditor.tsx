import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
// import Editor from '@ckeditor/ckeditor5-react';
import nhn from 'utils/SmartEditor';
import Icon from 'components/common/Icon';

const getVideoUrl = (url: string) => {
	/* eslint-disable */
    let match =
      url.match(
        /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/
      ) ||
      url.match(
        /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/
      ) ||
      url.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);
    if (match && match[2].length === 11) {
      return "https" + "://www.youtube.com/embed/" + match[2] + "?showinfo=0";
    }
    if ((match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/))) {
      return (
        (match[1] || "https") + "://player.vimeo.com/video/" + match[2] + "/"
      );
    }
  
    return null;
  };

  

  const Container = styled.div`
	width: 100%;
	display: table;

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
			display: inline-block;
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
       
	}
`;





const SmartEditorBox = styled.div`
    box-sizing: border-box;
	position: relative;
	height: 100%;
    width: 100%;
	min-height: 470px;
	padding: 12px 0px 12px 20px;

	&.hide {
		.editor-wrap {
			opacity: 0;
		}

		textarea {
			position: absolute;
			opacity: 0;
		}
	}

	textarea {
		width: 100%;
	}

	textarea {
		height: 470px;
		width: 100%;
		position: absolute;
		opacity: 0;
		left: 0;
		max-height: 50vh;
		min-height: 220px;
	}

	input[type='file'] {
		position: absolute;
		z-index: -1;
		width: 0;
		height: 0;
		overflow: hidden;
		opacity: 0;
	}

	.custom-video-btn,
	.custom-image-btn {
		position: absolute;
		top: 22px;
		left: 520px;
		cursor: pointer;
		width: 28px;
		height: 28px;
		/* padding: 3px 0px; */
		text-align: center;
		border-radius: 5px;
		background: transparent;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;

		&::after {
			content: '이미지';
			opacity: 0;
			position: absolute;
			left: 50%;
			top: 30px;
			white-space: nowrap;
			z-index: 1;
			transform: translate(-50%, 0);
			/* width: 100px; */
			padding: 0 10px;
			height: 27px;
			background: #202020;
			border: 1px solid #202020;
			border-radius: 5px;
			line-height: 27px;
			font-weight: normal;
			color: #fff;
			font-size: 13px;
			transition: all 0.2s;
		}

		&:hover {
			&::after {
				opacity: 1;
			}
		}

		&:hover {
			background: #efefef;
		}

		&.custom-video-btn {
			left: 552px;

			&::after {
				content: '영상';
			}

			.video-input-popup {
				z-index: 25;
				position: absolute;
				left: 50%;
				transform: translate(-50%, 0);
				top: 46px;
				min-width: 400px;
				height: 55px;
				background: #fff;
				border: 1px solid #efefef;
				border-radius: 4px;
				display: flex;
				align-items: center;
				padding: 0 16px;
				font-size: 14px;

				input[type='text'] {
					width: 200px;
					padding: 0 10px;
					height: 40px;
					margin-left: 10px;
					margin-right: 5px;
					border: 1px solid #efefef;
				}

				button {
					width: 70px;
					height: 37px;
					line-height: 37px;
					font-size: 14px;
					text-align: center;
					display: inline-block;
					background: #089feb;
					color: #fff;
					border-radius: 5px;
					margin-left: 5px;
				}
			}
		}
	}
`;

interface IProps {
	name: string;
	required?: boolean;
    title: string;
}

function SmartEditor(props: IProps): JSX.Element {
	const { title, name, required } = props;
	const [editor, setEditor] = useState(null);
	const [viewVideoInput, setViewVideoInput] = useState(false);
	const [videoUrl, setVideoUrl] = useState('');
    let onceBoolean = true; 
    

	useEffect(() => {
        if(onceBoolean){
            onceBoolean = false;
            const htParams = {
                // iframe 사용으로 인한 true 설정
                bSkipXssFilter: true,
                aAdditionalFontList: [
                    ['Noto Sans KR, sans-serif', '본고딕'],
                    ['Nanum Myeongjo', '나눔명조'],
                ],
            };
    
            const oEditors: any = [];
            // const vm = this;
            /* eslint-disable */
        nhn.husky.EZCreator.createInIFrame({
          fCreator: "createSEditor2",
          oAppRef: oEditors,
          elPlaceHolder: "smart-editor",
          sSkinURI: "/smarteditor/SmartEditor2Skin.html",
          htParams,
          fOnAppLoad() {
            setEditor(oEditors[0]);
          },
        });
        }
		
  }, []);

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
  
  };

  const videoToggle = () => {
    setViewVideoInput(!viewVideoInput);
  };

  const handleChangeVideoUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const addVideo = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (videoUrl === "") {
      alert("동영상 링크를 입력해주세요.");
      return false;
    }
    const url = getVideoUrl(videoUrl);
    videoToggle();
    setVideoUrl("");
    if (!url) {
      alert("올바르지 않은 동영상 링크입니다.");
    } else {
      const videoTag = `<iframe src="${url}"></iframe>`;
    //   editor.exec("PASTE_HTML", [videoTag]);
    }
  };

  
	return (

        <Container
		>
			<div className="title">
				{title}
				<span className="require">&nbsp;*</span>
			</div>
			<div className="input-text">
            <SmartEditorBox>
			<textarea id="smart-editor" name={name} required={required} />
			<label className="custom-image-btn">
				<Icon name="editor-image" />
				<input type="file" accept="image/*" multiple onChange={uploadImage} />
			</label>
			<div className="custom-video-btn">
				<span onClick={videoToggle}>
					<Icon name="editor-video" />
				</span>
				{viewVideoInput && (
					<div className="video-input-popup">
						동영상 링크
						<input
							type="text"
							name="videoUrl"
							value={videoUrl}
							onChange={handleChangeVideoUrl}
						/>
						<button onClick={addVideo}>불러오기</button>
					</div>
				)}
			</div>
		</SmartEditorBox>
			</div>
		</Container>


		
	);
}

export default React.memo(SmartEditor);
