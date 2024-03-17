import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import ProductPage from "./components/product/ProductPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import DownloadApp from "./components/reusable/DownloadApp";
import React, { useEffect } from "react";
function App() {

    useEffect(() => {
    function isFacebookApp() {
        console.log("code test");
      var ua = navigator.userAgent || navigator.vendor || window.opera;
      return ua.indexOf("FBAV") > -1 || ua.indexOf("FBAN") > -1;
    }

    if (isFacebookApp()) {
      // eslint-disable-next-line no-restricted-globals
      var currentLink = location.href;
      if (currentLink.indexOf("https") > -1) {
        currentLink = currentLink.replace("https://", "");
        currentLink = currentLink.replace("www.", "");
        var chromeLink =
          "intent://" +
          currentLink +
          "#Intent;scheme=https;package=com.android.chrome;end";
        window.location.href = chromeLink;
      }
      if (currentLink.indexOf("http") > -1) {
        currentLink = currentLink.replace("http://", "");
        currentLink = currentLink.replace("www.", "");
        chromeLink =
          "intent://" +
          currentLink +
          "#Intent;scheme=http;package=com.android.chrome;end";
        window.location.href = chromeLink;
      }
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/product/:id/checkout" element={<CheckoutPage />} />
        <Route path="/download/app" element={<DownloadApp />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
