import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProductCard = ({ product, onAddToBill }) => {
  return (
    <Card className="transition-smooth hover:shadow-elegant cursor-pointer group">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-smooth">
              {product.name}
            </h3>
            {product.category && (
              <p className="text-sm text-muted-foreground">{product.category}</p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ₹{product.defaultPrice}
            </span>
            <Button
              variant="default"
              size="sm"
              onClick={() => onAddToBill(product)}
              className="gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
