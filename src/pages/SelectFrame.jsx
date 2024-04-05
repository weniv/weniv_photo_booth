import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Type1 from "../assets/Type1.svg";
import Type2 from "../assets/Type2.svg";
import Type3 from "../assets/Type3.svg";
import Type4 from "../assets/Type4.svg";

function FrameButton({ frame, id, saveFrame }) {
    return (
        <FrameWrap onClick={(e) => saveFrame(e)}>
            <label htmlFor={id}>
                <img src={frame} style={{ background: "#8D9299" }} alt="" />
                <input type="radio" id={id} name="frame" />
            </label>
        </FrameWrap>
    );
}

const FrameWrap = styled.div`
    width: 21.175rem;

    &:nth-child(2) img {
        border: 1px solid #8d9299;
    }

    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2.2rem;

        input {
            display: flex;
            justify-content: center;
            align-items: center;
            appearance: none;
            width: 2.5rem;
            height: 2.5rem;
            background-color: var(--gray-lv2-color);
            border-radius: 50%;
            cursor: pointer;

            &:checked {
                &::after {
                    content: "";
                    display: block;
                    width: 1.75rem;
                    height: 1.75rem;
                    background-color: var(--main-color);
                    border-radius: 50%;
                }
            }
        }

        img {
            width: 100%;
        }
    }
`;

export default function SelectFrame() {
    const navigate = useNavigate();
    const [frameType, setFrameType] = useState("");

    const saveFrame = (e) => {
        setFrameType(e.target.id);
    };

    useEffect(() => {
        localStorage.setItem("frameType", frameType);
    }, [frameType]);

    return (
        <Layout>
            <p>프레임을 선택해 주세요.</p>
            <FlexBox>
                <FrameButton frame={Type1} id="Type1" saveFrame={saveFrame} />
                <FrameButton frame={Type2} id="Type2" saveFrame={saveFrame} />
                <FrameButton frame={Type3} id="Type3" saveFrame={saveFrame} />
                <FrameButton frame={Type4} id="Type4" saveFrame={saveFrame} />
            </FlexBox>
            <button
                className="next"
                onClick={() => {
                    navigate("/shoot");
                }}
            >
                NEXT
            </button>
        </Layout>
    );
}

const Layout = styled.main`
    position: relative;
    width: 100vw;
    height: 100vh;
    padding: 8rem 7.5rem 6.6rem;

    p {
        color: var(--white-color);
        text-align: center;
        font-family: Pretendard;
        font-size: 2.25rem;
        font-weight: 500;
        letter-spacing: -0.075rem;
        margin-bottom: 4.2rem;
    }

    .next {
        position: absolute;
        bottom: 6.6rem;
        right: 7.5rem;
        padding: 0.5625rem 1.5rem;
    }
`;

const FlexBox = styled.div`
    display: flex;
    justify-content: space-between;
`;
