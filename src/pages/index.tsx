import { Footer } from "@/components/Footer";
import { DefaultLayout } from "@/components/layout";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type InputsCANIMM = {
  fieldOne: string;
  fieldTwo: string;
  fieldThree: string;
  fieldFour: string;
  fieldFive: string;
  fieldSix: string;
};

const Home = () => {
  const [priceCANIMM, setPriceCANIMM] = useState(0);
  const [priceUKTB, setPriceUKTB] = useState(0);
  const [defaultValue, setDefaultValue] = useState(0);
  const [sel, setSel] = useState(0);
  const [familySize1, setFamilySize1] = useState(0);
  const [familySize2, setFamilySize2] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsCANIMM>();
  const onSubmit: SubmitHandler<InputsCANIMM> = (data) => {
    const price1 = (parseInt(data.fieldOne) || 0) * 82350;
    const price2 = (parseInt(data.fieldTwo) || 0) * 82350;
    const price3 = (parseInt(data.fieldThree) || 0) * 95000;
    const price4 = (parseInt(data.fieldFour) || 0) * 118450;
    const price5 = (parseInt(data.fieldFive) || 0) * 31650;
    const price6 = (parseInt(data.fieldSix) || 0) * 44350;
    setPriceCANIMM(price1 + price2 + price3 + price4);
    setPriceUKTB(price5 + price6);
    const sizes1 =
      parseInt(data.fieldOne) +
      parseInt(data.fieldTwo) +
      parseInt(data.fieldThree) +
      parseInt(data.fieldFour);
    const sizes2 = parseInt(data.fieldFive) + parseInt(data.fieldSix);
    setFamilySize1(sizes1);
    setFamilySize2(sizes2);
  };

  const toClear = () => {
    setDefaultValue(0);
    setPriceCANIMM(0);
    setPriceUKTB(0);
    setFamilySize1(0);
    setFamilySize2(0);
  };

  return (
    <DefaultLayout>
      <div>
        <img
          src="/images/logo.jfif"
          alt="logo"
          className="w-auto h-14 mx-auto"
        />
      </div>
      <div className="py-4 flex space-x-4">
        <button
          onClick={() => setSel(0)}
          className={`${
            sel === 0 ? "bg-blue-50 text-black" : "text-blue-50"
          } px-4 py-2 rounded-md text-xs flex`}
        >
          <span>
            <img src="/images/can.png" className="w-4 h-4 mr-2" />
          </span>
          CAN_IMM Price
        </button>
        <button
          onClick={() => setSel(1)}
          className={`${
            sel === 1 ? "bg-blue-50 text-black" : "text-blue-50"
          } px-4 py-2 rounded-md text-xs flex`}
        >
          <span>
            <img src="/images/uk.png" className="w-4 h-4 mr-2" />
          </span>
          UK_TB Price
        </button>
      </div>
      {sel === 0 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <h1 className="text-center py-4 text-2xl">CAN_IMM Price calculator</h1> */}
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col">
              <span className="text-xs">
                Less than 5 years
                <span className="bg-gray-300 text-gray-900 px-1 ml-1">
                  82 350 FCFA
                </span>
              </span>
              <input
                {...register("fieldOne")}
                className="mt-2 w-full h-8 py-1 px-3 text-sm text-black rounded-md"
                type="number"
                min={0}
                defaultValue={defaultValue}
              />
            </div>
            <div className="flex flex-col mt-4">
              <span className="text-xs">
                5 to 10 years
                <span className="bg-gray-300 text-gray-900 px-1 ml-1">
                  82 350 FCFA
                </span>
              </span>
              <input
                {...register("fieldTwo")}
                className="mt-2 w-full h-8 py-1 px-3 text-sm text-black rounded-md"
                type="number"
                min={0}
                defaultValue={defaultValue}
              />
            </div>
            <div className="flex flex-col mt-4">
              <span className="text-xs">
                11 to 14 years
                <span className="bg-gray-300 text-gray-900 px-1 ml-1">
                  95 000 FCFA
                </span>
              </span>
              <input
                {...register("fieldThree")}
                className="mt-2 w-full h-8 py-1 px-3 text-sm text-black rounded-md"
                type="number"
                min={0}
                defaultValue={defaultValue}
              />
            </div>
            <div className="flex flex-col mt-4">
              <span className="text-xs">
                15 years and above
                <span className="bg-gray-300 text-gray-900 px-1 ml-1">
                  118 450 FCFA
                </span>
              </span>
              <input
                {...register("fieldFour")}
                className="mt-2 w-full h-8 py-1 px-3 text-sm text-black rounded-md"
                type="number"
                min={0}
                defaultValue={defaultValue}
              />
            </div>
            {familySize1 !== 0 && (
              <p className="bg-gray-300 text-gray-900 px-2 py-0.5 mt-4 rounded-md text-xs animate-pulse">
                Family size: {familySize1}
              </p>
            )}
            <div className="flex gap-x-2 flex-row w-1/2">
              <button
                className="bg-blue-600 mt-4 w-full h-8 p-1 rounded-md text-sm"
                type="submit"
              >
                Calculate
              </button>
              <button
                className="bg-gray-500 mt-4 w-full h-8 p-1 text-sm rounded-md"
                type="button"
                onClick={toClear}
              >
                Clear
              </button>
            </div>
            <h1 className="text-center my-4 bg-white text-blue-700 p-2 rounded-md">
              {new Intl.NumberFormat("en-US").format(priceCANIMM)} FCFA
            </h1>
          </div>
        </form>
      )}
      {sel === 1 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col mt-4">
              <span className="text-xs">
                Less than 11 years
                <span className="bg-gray-300 text-gray-900 px-1 ml-1">
                  31 650 FCFA
                </span>
              </span>
              <input
                {...register("fieldFive")}
                className="mt-2 w-full h-8 py-1 px-3 text-sm text-black rounded-md"
                type="number"
                defaultValue={defaultValue}
                min={0}
              />
            </div>
            <div className="flex flex-col mt-4">
              <span className="text-xs">
                11 years and above
                <span className="bg-gray-300 text-gray-900 px-1 ml-1">
                  44 350 FCFA
                </span>
              </span>
              <input
                {...register("fieldSix")}
                className="mt-2 w-full h-8 py-1 px-3 text-sm text-black rounded-md"
                type="number"
                defaultValue={defaultValue}
                min={0}
              />
            </div>
            {familySize2 !== 0 && (
              <p className="bg-gray-300 text-gray-900 px-2 py-0.5 mt-4 rounded-md text-xs animate-pulse">
                Family size: {familySize2}
              </p>
            )}
            <div className="flex gap-x-2 flex-row w-1/2">
              <button
                className="bg-blue-600 mt-4 w-full h-8 p-1 rounded-md text-sm"
                type="submit"
              >
                Calculate
              </button>
              <button
                className="bg-gray-500 mt-4 w-full h-8 p-1 text-sm rounded-md"
                type="button"
                onClick={toClear}
              >
                Clear
              </button>
            </div>
            <h1 className="text-center my-4 bg-white text-blue-700 p-2 rounded-md">
              {new Intl.NumberFormat("en-US").format(priceUKTB)} FCFA
            </h1>
          </div>
        </form>
      )}
    </DefaultLayout>
  );
};

export default Home;
