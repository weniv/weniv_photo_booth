import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyle";
import { DownloadResult, ScanQr, SelectFilter, SelectFrame, Shoot, Start } from "./pages";
import { useState } from "react";

function App() {
    const [image, setImage] = useState([]);
    const [video, setVideo] = useState([]);

    return (
        <div className="App">
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/frame" element={<SelectFrame />} />
                <Route path="/shoot" element={<Shoot setImage={setImage} setVideo={setVideo} />} />
                <Route path="/filter" element={<SelectFilter image={image} video={video} />} />
                <Route path="/result" element={<ScanQr />} />
                <Route path="/download/:imgUrl/*" element={<DownloadResult />} />
                <Route path="/*" element={<Start />} />
            </Routes>
        </div>
    );
}

export default App;
