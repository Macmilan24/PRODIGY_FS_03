import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails, getReletedProducts } from "@/lib/actions/action";

const ProductDetail = async ({ params }: { params: { productId: string } }) => {
  const productDetail = await getProductDetails(params.productId);
  const relatedProducts = await getReletedProducts(params.productId);

  console.log(relatedProducts);

  return (
    <>
      <div className=" flex justify-center  gap-10 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery productMedia={productDetail.media} />

        <ProductInfo productInfo={productDetail} />
      </div>

      <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
        <p className="text-heading3-bold">Related Products</p>
        <div className="flex flex-wrap gap-16 mx-auto mt-8">
          {relatedProducts?.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

export const dynamic = "force-dynamic";
