import ProductCard from "@/components/ProductCard";
import { getSearchResults } from "@/lib/actions/action";
import React from "react";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const searchedProducts = await getSearchResults(params.query);

  const decodedQuery = decodeURIComponent(params.query);

  return (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">
        {" "}
        Search results for {decodedQuery}
      </p>

      {!searchedProducts ||
        (searchedProducts?.length === 0 && (
          <p className="text-body-bold my-5">No result found</p>
        ))}

      <div className="flex flex-wrap justify-between gap-10">
        {searchedProducts?.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;

export const dynamic = "force-dynamic";
