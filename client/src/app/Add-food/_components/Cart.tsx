import { useFoodCart } from "@/app/_components/CardProvider";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

type CartType = {
  removeItem: (foodId: string) => void;
};

export const Cart = ({ removeItem }: CartType) => {
  const { cart, incQuantity, decQuantity } = useFoodCart();
  return (
    <div>
      {cart.length === 0 ? (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div
            key={`${item._id}-${index}`}
            className="flex items-center justify-between gap-4 border-b pb-2"
          >
            <img
              src={item.image}
              alt={item.foodName}
              className="w-20 h-20 rounded object-cover"
            />
            <div className="flex flex-col flex-1">
              <p className="font-semibold">{item.foodName}</p>
              <p className="text-sm text-gray-500">{item.ingredients}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-3 items-center">
                  <Button
                    onClick={() => decQuantity(index)}
                    className="h-8 w-8 bg-gray-200 rounded-full hover:bg-gray-300"
                    aria-label={`Decrease quantity of ${item.foodName}`}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <Button
                    onClick={() => incQuantity(index)}
                    className="h-8 w-8 bg-gray-200 rounded-full hover:bg-gray-300"
                    aria-label={`Increase quantity of ${item.foodName}`}
                  >
                    <Plus size={16} />
                  </Button>
                  <Button
                    onClick={() => removeItem(item._id)}
                    className="h-8 w-8 bg-red-100 rounded-full hover:bg-red-200"
                    aria-label={`Remove ${item.foodName} from cart`}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
