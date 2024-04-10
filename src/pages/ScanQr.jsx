import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";

import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Type1 from "../assets/Type1.png";
import Type2 from "../assets/Type2.png";
import Type3 from "../assets/Type3.png";
import Type4 from "../assets/Type4.png";
import Arrow from "../assets/arrow.svg";

export default function ScanQr({ image, video, videoUrl }) {
    console.log(video);
    const frameType = localStorage.getItem("frameType");
    const navigate = useNavigate();

    const [imgUrl, setImgUrl] = useState("");
    const [isQr, setIsQr] = useState(false);
    const [qrValue, setQrValue] = useState("");

    const contentRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(null);

    useEffect(() => {
        switch (frameType) {
            case "Type1":
                setCurrentFrame(Type1);
                break;
            case "Type2":
                setCurrentFrame(Type2);
                break;
            case "Type3":
                setCurrentFrame(Type3);
                break;
            case "Type4":
                setCurrentFrame(Type4);
                break;
            default:
                // 기본값 설정 (옵션)
                setCurrentFrame(null);
                break;
        }
    }, []);

    const date = new Date();
    const createdDate = `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}`;
    const getTime = date.getTime();
    const baseURL = "https://weniv.github.io/weniv_photo_booth/download/";

    // 화면 캡쳐
    const imageCaptureHandler = async () => {
        if (!contentRef.current) return;
        const result = contentRef.current;

        try {
            const canvas = await html2canvas(result, { scale: window.devicePixelRatio });
            canvas.toBlob((myBlob) => {
                const imageFile = new File([myBlob], `${createdDate}-${getTime}.jpeg`, {
                    type: myBlob && myBlob.type,
                });
                handleUploadImage(imageFile);
            }, "image/jpeg");

            const videoFile = new File([video], `${createdDate}-${getTime}.mp4`, {
                type: "video/mp4",
            });
            console.log(`Video blob size: ${videoFile.size} bytes`);

            handleUploadVideo(videoFile);
        } catch (error) {
            console.error("Error converting div to image:", error);
        }
    };

    // 이미지 업로드 함수
    const uploadImage = async (imageFile) => {
        const storageRef = ref(storage, "images/" + imageFile.name);
        await uploadBytes(storageRef, imageFile);
        return getDownloadURL(storageRef);
    };

    const uploadVideo = async (videoFile) => {
        if (videoFile === null) return;

        const storageRef = ref(storage, `videos/${videoFile.name}`);
        await uploadBytes(storageRef, videoFile);
        return getDownloadURL(storageRef);
    };

    // 이미지 업로드 및 URL 검색
    const handleUploadImage = async (imageFile) => {
        const imageUrl = await uploadImage(imageFile);
        setImgUrl(imageUrl);
        setIsQr(true);
    };

    const handleUploadVideo = async (videoFile) => {
        const videoUrl = await uploadVideo(videoFile);
    };

    useEffect(() => {
        const images = document.querySelectorAll(".item");
        let loaded = 0;

        images.forEach((image) => {
            if (image.complete) {
                loaded++;
            } else {
                image.onload = () => {
                    loaded++;
                    if (loaded === images.length) {
                        setImagesLoaded(true);
                    }
                };
            }
        });

        if (loaded === images.length) {
            setImagesLoaded(true);
        }
    }, []);

    useEffect(() => {
        setIsQr(false);

        if (imagesLoaded) {
            // 모든 이미지가 로드된 후 html2canvas 호출
            setTimeout(() => {
                imageCaptureHandler();
            }, 1000);
        }
    }, [imagesLoaded]);

    useEffect(() => {
        if (imgUrl.length > 1) {
            const specificUrl = imgUrl.split("images")[1];
            setQrValue(baseURL + specificUrl);
        }
    }, [imgUrl]);

    return (
        <Wrap>
            <ImgBox ref={contentRef}>
                <FlexBox>
                    {image.map((item, idx) => (
                        <div key={idx}>
                            <img className={`item item${idx}`} id={idx} src={item} alt="" />
                        </div>
                    ))}
                </FlexBox>
                <Frame src={currentFrame} FrameType={frameType} alt="" />
            </ImgBox>
            <VideoWrap>
                <video src={videoUrl} autoPlay loop muted style={{ transform: "scaleX(-1)" }}></video>
            </VideoWrap>
            <QrBox>
                <Message>
                    <b>QR코드</b>를 통해
                    <br /> 사진을 다운로드 하세요
                </Message>
                <img className="arrow" src={Arrow} alt="" />
                <LoadingBox>{isQr && qrValue ? <QRCodeCanvas value={qrValue} size={250} /> : <div className="spinner"></div>}</LoadingBox>
            </QrBox>

            <button
                className="finish"
                onClick={() => {
                    navigate("/");
                }}
            >
                HOME
            </button>
        </Wrap>
    );
}

const Wrap = styled.main`
    width: 100vw;
    height: 100vh;
    padding: 5.75rem 19.31rem 5.37rem 7.19rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    button.finish {
        position: fixed;
        right: 7.19rem;
        bottom: 4.06rem;
        padding: 0.625rem 2rem;
    }
`;

const ImgBox = styled.div`
    position: relative;
    width: 570px;
    height: 855px;
    background: #d9d9d9;
    overflow: hidden;
`;

const FlexBox = styled.div`
    width: 100%;
    padding: 109px 31px;
    display: flex;
    gap: 11px;
    flex-wrap: wrap;

    div {
        position: relative;
        width: 248px;
        height: 312px;
        overflow: hidden;

        img {
            transform: scaleX(-1);
            // position: absolute;
            // top: 0;
            // left: 0;
            height: 100%;
        }
    }
`;

const Frame = styled.img`
    width: 570px;
    z-index: 100;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    ${(props) => props.FrameType === "Type2" && "border: 1px solid #8d9299;"}
`;

const QrBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.61rem;

    img.arrow {
        width: 3.5rem;
    }
    .spinner {
        width: 100px;
        height: 100px;
        border: 5px solid white;
        border-radius: 50%;
        border-top-color: royalblue;
        animation: spin 0.8s infinite ease-in-out;
    }
    @keyframes spin {
        to {
            transform: rotate(1turn);
        }
    }
`;

const Message = styled.p`
    color: var(--white-color);
    text-align: center;
    font-family: Pretendard;
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 3.15rem */

    b {
        color: var(--main-color);
    }
`;

const LoadingBox = styled.div`
    background: var(--white-color);
    width: 17.5rem;
    height: 17.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
`;

const VideoWrap = styled.div`
    width: 18.75rem;
    height: 23.5625rem;
    overflow: hidden;
    position: relative;

    video {
        height: 100%;
    }
`;
