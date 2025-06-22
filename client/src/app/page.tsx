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
  const { data } = await axios.get("http://localhost:8000/foods");

  // const { user } = useAuth();
  // const router = useRouter();
  // const [file, setFile] = useState<File | null>(null);
  // const [url, setUrl] = useState("");
  // const [categories, setCategories] = useState<any>("");
  // const [categoryName, setCategoryName] = useState<string>("");
  // const [error, setError] = useState("");

  // const uploadImage = async () => {
  //   if (!file) {
  //     alert("Please select a file");
  //     return null;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "food-delivery");

  //   try {
  //     const response = await fetch(
  //       `https://api.cloudinary.com/v1_1/dip9rajob/image/upload`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     const result = await response.json();
  //     console.log("Uploaded image URL:", result.secure_url);
  //     alert("Image uploaded successfully!");
  //     return result.secure_url;
  //   } catch (error) {
  //     console.error("Failed to upload image:", error);
  //     alert("Failed to upload image");
  //     return null;
  //   }
  // };

  // const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files?.[0];

  //   if (selectedFile) {
  //     setFile(selectedFile);

  //     const url = URL.createObjectURL(selectedFile);
  //     setUrl(url);
  //     console.log("Selected file:", selectedFile.name);
  //   }
  // };

  return (
    <div className="text-2xl">
      <Appetizer foods={data.foods} />
      <Salad foods={data.foods} />
      <Pizza foods={data.foods} />

    </div>
  );
};

export default Home;




      {/* <input type="file" onChange={fileHandler} accept="image/*" />
      <Button onClick={uploadImage}>Upload</Button> */}

      {/* <Image src={url} alt="food" width={100} height={100} /> */}
      {/* 
      <div className="mt-4">
        <h2>Create Food Category</h2>
        <input
          type="text"
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
          placeholder="Enter category name (e.g., Pizza)"
          className="border p-2 mr-2"
        />
        <Button onClick={createCategory}>Create Category</Button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div> */}


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
