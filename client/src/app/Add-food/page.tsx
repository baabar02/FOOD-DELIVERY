"use client";

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

const FoodPage = ({ foods }: PropsType) => {
  const keys = Object.keys(foods);

  return (
    <div className="container mx-auto py-10">
      {keys.map((el) => {
        return (
          <div key={el}>
            <h2 className="text-4xl">{el}</h2>
            {foods[el].slice(0, 6).map((food) => {
              return (
                <div key={food._id} className="flex flex-col gap-2">
                  <p>{food._id}</p>
                  <div>{food.foodName}</div>
                  <div>{food.image}</div>
                  <div>{food.ingredients}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default FoodPage;
