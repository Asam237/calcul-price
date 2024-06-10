import { Footer } from "@/components/Footer";
import { DefaultLayout } from "@/components/layout";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  fieldOne: string;
  fieldTwo: string;
  fieldThree: string;
  fieldFour: string;
};

const Home = () => {
  const [price, setPrice] = useState(0);
  const [defaultValue, setDefaultValue] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const price1 = parseInt(data.fieldOne) && parseInt(data.fieldOne) * 82350;
    const price2 = parseInt(data.fieldTwo) && parseInt(data.fieldTwo) * 82350;
    const price3 =
      parseInt(data.fieldThree) && parseInt(data.fieldThree) * 95000;
    const price4 =
      parseInt(data.fieldFour) && parseInt(data.fieldFour) * 118450;
    setPrice(price1 + price2 + price3 + price4);
  };

  const toClear = () => {
    setDefaultValue(0);
    setPrice(0);
  };

  return (
    <DefaultLayout>
      <div>
        <img src="/images/logo.jfif" alt="logo" className="w-auto h-14 mx-auto" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center py-4 text-2xl">CAN_IMM Price calculator</h1>
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
              defaultValue={defaultValue}
            />
          </div>
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
              onClick={() => toClear()}
            >
              Clear
            </button>
          </div>
          <h1 className="text-center my-4 bg-white text-blue-700 p-2 rounded-md">
            {new Intl.NumberFormat("en-US").format(price)} FCFA
          </h1>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default Home;
