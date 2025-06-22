import axios from "axios";
import FoodPage from "../Add-food/page";

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

const NavPage = async () => {
  return (
    <div className="flex flex-col">
      {/* <FoodPage foods={data.foods} /> */}
      </div>
  );
};

export default NavPage;
