import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyle";
import { DownloadResult, ScanQr, SelectFilter, SelectFrame, Shoot, Start } from "./pages";

function App() {
    return (
        <div className="App">
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/frame" element={<SelectFrame />} />
                <Route path="/shoot" element={<Shoot />} />
                <Route path="/filter" element={<SelectFilter />} />
                <Route path="/result" element={<ScanQr />} />
                <Route path="/download/:imgUrl/*" element={<DownloadResult />} />
                <Route path="/*" element={<Start />} />
            </Routes>
        </div>
    );
}

export default App;
