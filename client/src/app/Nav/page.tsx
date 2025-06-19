import axios from "axios";

import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Appetizer } from "./_components/Appetizer";
import { Salad } from "./_components/Salad";
import { usePathname } from 'next/navigation'
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
  onclick: ()=>void;
};


const NavPage = async ({foods}:PropsType) => {
 const arr = ['/login', '/signup']
    const path = usePathname()

    if (arr.includes(path)) {
        return null
    }


  const { data } = await axios.get("http://localhost:8000/foods");
  return (
    <div className="flex flex-col">
      <Header />
      <Appetizer foods={data.foods} />
      <Salad foods={data.foods}/>
      <Pizza  foods={data.foods}/>
      <Footer />
    </div>
  );
};

export default NavPage;
