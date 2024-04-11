import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Type1 from "../assets/Type1.png";
import Type2 from "../assets/Type2.png";
import Type3 from "../assets/Type3.png";
import Type4 from "../assets/Type4.png";

export default function SelectFilter({ image, video }) {
    const navigate = useNavigate();
    // const videoRef = useRef(null);
    const frameType = localStorage.getItem("frameType");
    const [currentFrame, serCurrentFrame] = useState(null);
    const [filterType, setFilterType] = useState(null);
    const contentRef = useRef(null);

    useEffect(() => {
        switch (frameType) {
            case "Type1":
                serCurrentFrame(Type1);
                break;
            case "Type2":
                serCurrentFrame(Type2);
                break;
            case "Type3":
                serCurrentFrame(Type3);
                break;
            case "Type4":
                serCurrentFrame(Type4);
                break;
            default:
                // 기본값 설정 (옵션)
                serCurrentFrame(null);
                break;
        }

        localStorage.setItem("filterType", "filter1");
    }, [filterType]);

    // useEffect(() => {
    //     if (videoRef.current) {
    //         videoRef.current.playbackRate = 4.0;
    //     }
    // }, []);

    useEffect(() => {
        localStorage.setItem("filterType", filterType);
    }, [filterType]);

    return (
        <Wrap>
            <ImgBox ref={contentRef}>
                <FlexBox filterType={filterType}>
                    {image.map((item, idx) => (
                        <div key={idx}>
                            <img className={`item ${filterType}`} id={idx} src={item} alt="" />
                        </div>
                    ))}
                </FlexBox>
                <Frame src={currentFrame} FrameType={frameType} alt="" />
            </ImgBox>
            <SelectBox>
                <p className="desc">필터를 선택하세요.</p>
                <div className="inputBox first">
                    <label htmlFor="filter1">
                        <input type="radio" id="filter1" name="frame" />
                        <p
                            onClick={() => {
                                setFilterType("filter1");
                            }}
                        >
                            원본
                        </p>
                    </label>
                    <label htmlFor="filter2">
                        <input type="radio" id="filter2" name="frame" />
                        <p
                            onClick={() => {
                                setFilterType("filter2");
                            }}
                        >
                            밝은
                        </p>
                    </label>
                    <label htmlFor="filter3">
                        <input type="radio" id="filter3" name="frame" />
                        <p
                            onClick={() => {
                                setFilterType("filter3");
                            }}
                        >
                            흑백
                        </p>
                    </label>
                </div>
                <div className="inputBox">
                    <label htmlFor="filter4">
                        <input type="radio" id="filter4" name="frame" />
                        <p
                            onClick={() => {
                                setFilterType("filter4");
                            }}
                        >
                            어두운
                        </p>
                    </label>
                    <label htmlFor="filter5">
                        <input type="radio" id="filter5" name="frame" />
                        <p
                            onClick={() => {
                                setFilterType("filter5");
                            }}
                        >
                            반반 1
                        </p>
                    </label>
                    <label htmlFor="filter6">
                        <input type="radio" id="filter6" name="frame" />
                        <p
                            onClick={() => {
                                setFilterType("filter6");
                            }}
                        >
                            반반 2
                        </p>
                    </label>
                </div>
            </SelectBox>
            <button
                className="finish"
                onClick={() => {
                    navigate("/result");
                }}
            >
                FINISH
            </button>
        </Wrap>
    );
}

const Wrap = styled.main`
    width: 100vw;
    padding: 5.75rem 17.67rem 5.37rem 7.19rem;
    display: flex;
    gap: 12.85rem;

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
            height: 100%;

            ${(props) => props.filterType === "filter1" && "filter: none;"}
            ${(props) => props.filterType === "filter2" && "filter: brightness(115%);"}
            ${(props) => props.filterType === "filter3" && "filter: grayscale(100%) brightness(85%);"}
            ${(props) => props.filterType === "filter4" && "filter: brightness(80%) grayscale(20%);"}
        }
    }

    div:nth-child(1),
    div:nth-child(4) {
        ${(props) => props.filterType === "filter5" && "filter: grayscale(100%) brightness(85%);"}
    }

    div:nth-child(2),
    div:nth-child(4) {
        ${(props) => props.filterType === "filter6" && "filter: grayscale(100%) brightness(85%);"}
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

const SelectBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .desc {
        margin: 3rem 0 6.8rem;
        color: var(--white-color);
        font-family: Pretendard;
        font-size: 2.25rem;
        font-weight: 500;
        line-height: normal;
    }

    .first {
        margin-bottom: 3.13rem;
    }

    .inputBox {
        display: flex;
        gap: 4.37rem;

        label {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.94rem;
        }

        input {
            display: flex;
            justify-content: center;
            align-items: center;
            appearance: none;
            width: 1.75rem;
            height: 1.75rem;
            background-color: var(--gray-lv2-color);
            border-radius: 50%;
            cursor: pointer;

            &:checked {
                &::after {
                    content: "";
                    display: block;
                    width: 1.25rem;
                    height: 1.25rem;
                    background-color: var(--main-color);
                    border-radius: 50%;
                }
            }
        }

        p {
            width: 6.5625rem;
            height: 3.675rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0.4375rem;
            border: 1px solid #d9dbe0;
            background: #d9dbe0;
            color: #121314;
            font-size: 1.225rem;
            line-height: 1.75rem;
            text-align: center;
            font-family: Pretendard;
            font-weight: 500;
        }
    }
`;
