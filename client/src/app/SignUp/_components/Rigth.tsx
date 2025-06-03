import Image from "next/image";

const Right = () => {
  return (
    <div className="w-[856px] h-[904px] rounded-[8px] border border-green-400">
      <Image width={856} height={904} src={"/image.png"} alt="Driver"></Image>
    </div>
  );
};

export default Right;
