import "./App.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import SimpleQnA from "./pages/SimpleQnA";
import ImageContentGeneration from "./pages/ImageContentGeneration";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                
                <Route path="/askaquestion" element={<SimpleQnA/>}/>
                <Route path="/imgcontentgeneration" element={<ImageContentGeneration/>}/>
            </Routes>
        </Router>
    );
};
export default App;
