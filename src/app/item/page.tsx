import { Suspense } from "react";
import ProductDetailClient from "./ProductDetailClient";

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div
          className="glass-card rounded-lg p-6 animate-pulse"
          style={{ background: "var(--card)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted h-96 rounded-md"></div>
            <div>
              <div className="bg-muted h-8 rounded-md mb-4 w-3/4"></div>
              <div className="bg-muted h-6 rounded-md mb-4 w-1/4"></div>
              <div className="bg-muted h-4 rounded-md mb-6 w-full"></div>
              <div className="bg-muted h-12 rounded-md mb-4 w-1/3"></div>
              <div className="bg-muted h-12 rounded-md w-full"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <ProductDetailClient />
    </Suspense>
  );
}