import { Appetizer } from "./_components/Appetizer";
import { Salad } from "./_components/Salad";
import { Pizza } from "./_components/Pizza";

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

const FoodPage = async ({ foods }: PropsType) => {
  return (
    <div className="flex flex-col">
      <Appetizer foods={foods} />
      <Salad foods={foods} />
      <Pizza foods={foods} />
    </div>
  );
};

export default FoodPage;
