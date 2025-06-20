import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";

type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
};

type PropsType = {
  foods: Record<string, FoodProps[]>;
};

export const FoodDialog = ({
  foodName,
  image,
  ingredients,
  price,
  _id,
}: FoodProps) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Plus />
        </DialogTrigger>
        <DialogContent className="flex border bg-amber-50 border-green-400 !w-[500px] !max-w-[800px] !h-[500px]">
          <div
            key={_id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full max-w-[398px] mx-auto"
          >
            <div className="relative mt-2 mx-2">
              <img
                src={image}
                alt={foodName}
                className="w-full h-48 object-cover rounded-lg"
                loading="lazy"
              />

              <div
                // onClick={() => handleAddToCart(food)}
                className="absolute top-35 right-3 h-10 w-10 bg-amber-50 text-red-500 rounded-full hover:bg-amber-100 flex items-center justify-center text-lg"
              >
                {/* <FoodDialog foods={foods} /> */}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-red-500">
                  {foodName}
                </h3>
                <p className="font-bold text-lg">${price.toFixed(2)}</p>
              </div>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {ingredients}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
