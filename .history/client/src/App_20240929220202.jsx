import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import TopHeadlines from "./components/TopHeadlines";
import SummarizeArticle from "./components/SummarizeArticle"; // Adjust the path as needed
import CountryNews from "./components/CountryNews";
import "./App.css";

function App() {
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
