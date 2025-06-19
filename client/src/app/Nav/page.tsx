import axios from "axios";
import FoodPage from "../Add-food/page";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";

const NavPage = async () => {
  const { data } = await axios.get("http://localhost:8000/foods");
  return (
    <div>
      <Header />
      <FoodPage foods={data.foods} />
      <Footer />
    </div>
  );
};

export default NavPage;
