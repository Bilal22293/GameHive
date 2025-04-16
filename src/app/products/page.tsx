import { Suspense } from "react";
import ProductClient from "./ProductClient";
import ProductSkeleton from "./ProductSkeleton";
export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div>
          <ProductSkeleton />
        </div>
      }
    >
      <ProductClient />
    </Suspense>
  );
}
