import Image from "next/image";

const Right = () => {
  return (
    <div className="w-[856px] h-[904px] rounded-[16px] shadow-lg">
      <Image width={856} height={904} src={"/image.png"} alt="Driver"></Image>
    </div>
  );
};

export default Right;
