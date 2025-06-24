"use client";

import { ChevronRight, MapPin } from "lucide-react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type FoodOrder = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
};

type CartItem = FoodOrder & {
  quantity: number;
  address: string;
};

type FoodCartContextType = {
  cart: CartItem[];
  addFood: (food: CartItem) => void;
  removeCartFood: (_id: string) => void;
  clearCard: () => void;
  incQuantity: (index: number) => void;
  decQuantity: (index: number) => void;
  
};

const FoodCartContext = createContext<FoodCartContextType>(
  {} as FoodCartContextType
);

type FoodCartProviderProps = {
  children: ReactNode;
};

export const FoodCartProvider = ({ children }: FoodCartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addFood = (food: CartItem) => {
    const existingFood = cart.find((foodCart) => foodCart._id === food._id);

    if (existingFood) {
      const updatedCard = cart.map((foodCart) => ({
        ...foodCart,
        quantity: foodCart.quantity + 1,
      }));

      setCart(updatedCard);
      writeCartToLocal(updatedCard);
    } else {
      setCart([...cart, food]);
      writeCartToLocal([...cart, food]);
    }
  };

  const removeCartFood = (_id: string) => {
    const updatedCart = cart.filter((foodCart) => foodCart._id !== _id);
    setCart(updatedCart);
    writeCartToLocal(updatedCart);
  };

  const clearCard = () => setCart([]);

  const incQuantity = (index: number) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };
  const decQuantity = (index: number) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    } else {
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  useEffect(() => {
    const localCart = readCartFromLocal();

    setCart(localCart);
  }, []);


 


  return (
    <FoodCartContext
      value={{
        cart,
        addFood,
        removeCartFood,
        incQuantity,
        decQuantity,
        clearCard,
      
      }}
    >
      {children}
    </FoodCartContext>
  );
};

export const useFoodCart = () => useContext(FoodCartContext);

export const readCartFromLocal = () => {
  const localCart = localStorage.getItem("cart");
  return localCart ? JSON.parse(localCart) : [];
};

export const writeCartToLocal = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
