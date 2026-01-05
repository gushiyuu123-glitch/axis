import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Object from "./pages/Object";
import Product from "./pages/Product";
import "./index.css";

/**
 * App Router
 * - Home    ：世界観トップ
 * - Object  ：カテゴリ一覧
 * - Product ：商品詳細（購入）
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Top */}
        <Route path="/" element={<Home />} />

        {/* Category */}
        <Route path="/object/:slug" element={<Object />} />

        {/* Product */}
        <Route path="/product/:slug" element={<Product />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <main className="min-h-screen bg-black text-white flex items-center justify-center">
              <p className="tracking-[0.32em] text-xs opacity-60">
                PAGE NOT FOUND
              </p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
