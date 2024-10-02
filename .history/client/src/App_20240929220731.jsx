import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
// import Footer from "./components/Footer";
import TopHeadlines from "./components/TopHeadlines";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryNews from "./components/CountryNews";
import "./App.css";

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AllNews />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
          <Route path="/summarize" element={<SummarizeArticle />} />
        </Routes>
        {/* Footer can be uncommented and added later if needed */}
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
