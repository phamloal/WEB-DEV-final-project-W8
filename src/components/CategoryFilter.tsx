
import { Button } from "@/components/ui/button";
import { categories } from "@/data/products";

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(category)}
            className={
              activeCategory === category 
                ? "bg-brand-blue hover:bg-brand-accent" 
                : "hover:bg-brand-blue hover:text-white"
            }
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
