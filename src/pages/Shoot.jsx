import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import sound from "../assets/camera.wav";

export default function Shoot({ setImage, setVideo }) {
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);
    const [time, setTime] = useState(10);
    const [pictures, setPictures] = useState([]);
    const audio = new Audio(sound);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 5000);
    }, []);

    const takePhoto = () => {
        // 테스트하는 동안 찰칵 소리 off
        // audio.play();

        const width = 640;
        const height = 450;

        let video = videoRef.current;
        let canvas = canvasRef.current;

        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(video, 0, 0);

        let imageData = canvas.toDataURL("image/png");
        setPictures([...pictures, imageData]);
        setImage((prev) => [...prev, imageData]);
    };

    // 타이머
    const timer = () => {
        const sec = setTimeout(() => {
            setTime(time - 1);
        }, 1000);

        if (time === 0) {
            takePhoto();
            setTimeout(() => {
                clearInterval(sec);
                setTime(10);
                setInterval(sec);
            }, 500); // 0.5초 후에 실행
        } else if (pictures.length === 4) {
            handleStopRecording();
            clearInterval(sec);
            setTimeout(() => {
                // 테스트하는 동안 filter페이지로 이동 off
                setVideoUrl();
            }, 1300);
        }
    };

    // --------------------------------
    // --------------------------------
    // 비디오 파일 저장

    const [stream, setStream] = useState(null);
    const [recordedBlobs, setRecordedBlobs] = useState([]);
    const mediaRecorderRef = useRef(null);

    const getVideoFile = async () => {
        try {
            const constraints = {
                audio: false,
                video: {
                    width: 640,
                    height: 450,
                },
            };

            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(mediaStream);

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (e) {
            console.log(`현재 카메라가 연결되지 않았습니다`);
        }
    };

    const handleStartRecording = () => {
        setRecordedBlobs([]);

        try {
            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: "video/webm",
            });
            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    setRecordedBlobs((prev) => [...prev, e.data]);
                }
            };
            mediaRecorderRef.current.start();
        } catch (e) {
            console.log(e);
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    const setVideoUrl = () => {
        const videoBlob = new Blob(recordedBlobs, { type: "video/webm" });

        setVideo(videoBlob);

        setTimeout(() => {
            navigate("/filter");
        }, 1500);
    };

    useEffect(() => {
        // 촬영페이지로 이동 후 5초 뒤 촬영 시작
        if (isReady) {
            timer();

            // stream 상태가 설정되고, 실제로 미디어 스트림이 videoRef에 할당된 후에 녹화 시작
            if (stream && videoRef.current && !mediaRecorderRef.current) {
                handleStartRecording();
            }
        }
    }, [time, isReady, stream]);

    // 다른 페이지로 이동시 카메라 사용 종료
    useEffect(() => {
        if (!stream) {
            getVideoFile();
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [stream]);

    return (
        <>
            <Layout>
                <Timer time={time}>{time}</Timer>
                {isReady ? <p className="notice">10초마다 1컷씩 총 4컷이 촬영됩니다.</p> : <p className="notice">촬영화면이 나오면 5초 뒤 자동으로 촬영이 시작됩니다.</p>}

                <VideoCont>
                    <video autoPlay muted ref={videoRef}></video>
                    <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
                </VideoCont>
            </Layout>
        </>
    );
}

const Layout = styled.main`
    width: 100vw;
    height: 100vh;
    padding: 4.4rem 0 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .notice {
        color: var(--white-color);
        text-align: center;
        font-family: Pretendard;
        font-size: 2.25rem;
        font-weight: 500;
        margin: 2.1rem 0 1.6rem;
    }
`;

const Timer = styled.div`
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 0.4rem;
    ${(props) => (props.time > 3 ? "background: #d9dbe0;" : "background: #6DF2CC;")}

    color: var(--bg-color);
    text-align: center;
    font-family: Pretendard;
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 4.5rem;
`;

const VideoCont = styled.div`
    width: 36.75863rem;
    height: 46.14894rem;
    background-color: var(--gray-lv3-color);
    overflow: hidden;

    video {
        // width: 100%;
        height: 100%;
        object-fit: cover;
        transform: rotateY(180deg);
        -webkit-transform: rotateY(180deg); /* Safari and Chrome */
        -moz-transform: rotateY(180deg);
    }
`;
