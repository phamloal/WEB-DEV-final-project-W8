
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";
  
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [filteredProducts, setFilteredProducts] = useState(getProductsByCategory(activeCategory));

  useEffect(() => {
    setFilteredProducts(getProductsByCategory(activeCategory));
    
    // Update URL when category changes
    if (activeCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: activeCategory });
    }
  }, [activeCategory, setSearchParams]);

  // Update active category when URL param changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    } else {
      setActiveCategory("All");
    }
  }, [searchParams]);

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">All Products</h1>
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 mb-6 md:mb-0 md:mr-8">
          <CategoryFilter 
            activeCategory={activeCategory} 
            onSelectCategory={handleSelectCategory} 
          />
        </div>
        
        <div className="md:w-3/4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-500">No products found</h2>
              <p className="mt-2 text-gray-400">Try selecting a different category</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
