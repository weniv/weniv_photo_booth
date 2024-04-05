import styled from "styled-components";
import Logo from "../assets/logo.svg";
import TitleBg from "../assets/title-bg.svg";
import Title from "../assets/title.svg";
import { useNavigate } from "react-router-dom";

export default function Start() {
    const navigate = useNavigate();

    return (
        <Bg onClick={() => navigate("/frame")}>
            <Header>
                <h1>
                    <img src={Logo} alt="제주 AI 컨퍼런스" />
                </h1>
                <span className="date">2024.04.12 - 04.13</span>
            </Header>
            <Main>
                <p class="description">AI 기술과 함께 성장하고, 새로운 사람들을 만나 특별한 순간을 남겨보세요!</p>
                <img src={Title} alt="AI네컷" />
                <button class="start-button">START</button>
                <p className="start">화면을 클릭하면 시작합니다.</p>
                <Footer>
                    <span>2024 WENIV Corp.</span>
                    <span>made by. Zeezee</span>
                </Footer>
            </Main>
        </Bg>
    );
}

const Bg = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 71px 115px 65px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

const Header = styled.header`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span.date {
        color: var(--main-color);
        font-family: DungGeunMo;
        font-size: 40px;
    }
`;

const Main = styled.main`
    position: relative;
    width: 1450px;
    height: 840px;
    background-image: url(${TitleBg});
    background-repeat: no-repeat;
    background-size: contain;

    display: flex;
    flex-direction: column;
    align-items: center;

    .description {
        color: var(--main-color);
        font-family: DungGeunMo;
        font-size: 1.75rem;
        letter-spacing: -0.175rem;
        margin: 14rem 0 2.6rem;
    }

    .start-button {
        width: 9.5rem;
        height: 3.75rem;
        margin: 4.8rem 0 2.1rem;
    }

    .start {
        color: var(--white-color);
        font-family: Pretendard;
        font-size: 1.75rem;
        font-weight: 500;
    }
`;

const Footer = styled.footer`
    position: absolute;
    bottom: 67px;
    left: 45px;
    right: 76px;
    display: flex;
    justify-content: space-between;
    color: var(--gray-lv2-color);
    font-family: DungGeunMo;
    font-size: 28px;
`;
