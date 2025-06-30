import axios from "axios";
import { Appetizer } from "./Add-food/_components/Appetizer";
import { Pizza } from "./Add-food/_components/Pizza";
import { Salad } from "./Add-food/_components/Salad";

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

const Home = async () => {
  const { data } = await axios.get(
    "https://food-delivery-p342.onrender.com/foods"
  );

  return (
    <div className="text-2xl">
      <Appetizer foods={data.foods} />
      <Salad foods={data.foods} />
      <Pizza foods={data.foods} />
    </div>
  );
};

export default Home;

// const handleLogout = () => {
//   localStorage.removeItem("token");
//   setUser(null);
//   router.push("/LogIn");
// };

{
  /* <Button
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        onClick={handleLogout}
      >
        Log out
      </Button> */
}
