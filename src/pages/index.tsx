import { DefaultLayout } from "@/components/layout";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaExclamation } from "react-icons/fa";

type InputsCANIMM = {
  fieldOne: string;
  // fieldTwo: string;
  fieldThree: string;
  fieldFour: string;
  fieldFive: string;
  fieldSix: string;
  fieldDiffOne: string;
};

const Home = () => {
  const [priceCANIMM, setPriceCANIMM] = useState(0);
  const [priceUKTB, setPriceUKTB] = useState(0);
  const [defaultValue, setDefaultValue] = useState(0);
  const [sel, setSel] = useState(0);
  const [familySize1, setFamilySize1] = useState(0);
  const [familySize2, setFamilySize2] = useState(0);
  const [textToShow, setTextToShow] = useState("");
  const [pp, setPp] = useState(0);
  const [restOne, setRestOne] = useState(0);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputsCANIMM>();
  const onSubmit: SubmitHandler<InputsCANIMM> = (data) => {
    const price1 = (parseInt(data.fieldOne) || 0) * 82350;
    // const price2 = (parseInt(data.fieldTwo) || 0) * 82350;
    const price3 = (parseInt(data.fieldThree) || 0) * 95000;
    const price4 = (parseInt(data.fieldFour) || 0) * 118450;
    const price5 = (parseInt(data.fieldFive) || 0) * 31650;
    const price6 = (parseInt(data.fieldSix) || 0) * 44350;
    const priceDiff1 = parseInt(data.fieldDiffOne) || 0;

    setPriceCANIMM(price1 + price3 + price4);
    // setPriceCANIMM(price1 + price2 + price3 + price4);
    setPriceUKTB(price5 + price6);
    const sizes1 =
      parseInt(data.fieldOne) +
      // parseInt(data.fieldTwo) +
      parseInt(data.fieldThree) +
      parseInt(data.fieldFour);
    const sizes2 = parseInt(data.fieldFive) + parseInt(data.fieldSix);
    setFamilySize1(sizes1);
    setFamilySize2(sizes2);
    setPp(priceDiff1);
    setRestOne(priceCANIMM - priceDiff1);
  };

  // const toClear = () => {
  //   setDefaultValue(0);
  //   setPriceCANIMM(0);
  //   setPriceUKTB(0);
  //   setFamilySize1(0);
  //   setFamilySize2(0);
  // };

  const toClear = () => {
    reset({
      fieldOne: "0",
      // fieldTwo: "0",
      fieldThree: "0",
      fieldFour: "0",
      fieldFive: "0",
      fieldSix: "0",
      fieldDiffOne: "0",
    });
    setPriceCANIMM(0);
    setPriceUKTB(0);
    setFamilySize1(0);
    setFamilySize2(0);
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
    setPp(0);
    setRestOne(0);
  };

  const toCheck = () => {
    parseInt(String(pp)) === 0
      ? setRestOne(0)
      : setRestOne(parseInt(String(priceCANIMM)) - parseInt(String(pp)));
  };

  return (
    <>
      <DefaultLayout>
        <div>
          <img
            src="/images/logo-02.png"
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
              <div>
                <div className="flex flex-col">
                  <div className="flex space-x-2 justify-center items-center">
                    <span className="text-xs">
                      Less than 10 years
                      <span className="bg-gray-300 text-gray-900 px-1 ml-1">
                        82 350 FCFA
                      </span>
                    </span>
                    <span
                      onClick={() => setOpen1(!open1)}
                      className="border rounded-full p-1 cursor-pointer"
                    >
                      <FaExclamation
                        size={14}
                        className="flex justify-center items-center"
                      />
                    </span>
                  </div>
                  {open1 && (
                    <div className="text-white p-4 flex space-x-10">
                      <div>
                        <p>
                          <span className="text-sm">
                            <strong>Less than 5 years</strong>
                          </span>
                        </p>
                        <ul className="text-[14px] leading-5 text-gray-300">
                          <li>&#8594; Registration</li>
                          <li>&#8594; Nurses&apos;Unit</li>
                          <li>&#8594; Doctors&apos;Unit</li>
                        </ul>
                      </div>
                      <div>
                        <p>
                          <span className="text-sm">
                            <strong>5 to 10 years</strong>
                          </span>
                          <ul className="text-[14px] leading-5 text-gray-300">
                            <li>&#8594; Registration</li>
                            <li>&#8594; Laboratory</li>
                            <li>&#8594; Nurses&apos;Unit</li>
                            <li>&#8594; Doctors&apos;Unit</li>
                          </ul>
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    {...register("fieldOne")}
                    className="mt-2 w-full h-8 py-1 px-3 text-sm text-black rounded-md"
                    type="number"
                    min={0}
                    defaultValue={defaultValue}
                  />
                </div>
                {/* <div className="flex flex-col mt-4">
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
              </div> */}
                <div className="flex flex-col mt-4">
                  <div className="flex space-x-2 items-center">
                    <span className="text-xs">
                      11 to 14 years
                      <span className="bg-gray-300 text-gray-900 px-1 ml-1">
                        95 000 FCFA
                      </span>
                    </span>

                    <span
                      onClick={() => setOpen2(!open2)}
                      className="border rounded-full p-1 cursor-pointer"
                    >
                      <FaExclamation
                        size={14}
                        className="flex justify-center items-center"
                      />
                    </span>
                  </div>
                  {open2 && (
                    <div className="text-white flex flex-col space-y-4 mt-2 mb-4">
                      <ul className="text-[14px] leading-5 text-gray-300">
                        <li>&#8594; Registration</li>
                        <li>&#8594; Laboratory</li>
                        <li>&#8594; X-Ray Chest</li>
                        <li>&#8594; Nurses&apos;Unit</li>
                        <li>&#8594; Doctors&apos;Unit</li>
                      </ul>
                    </div>
                  )}
                  <input
                    {...register("fieldThree")}
                    className="mt-2 w-full h-8 py-1 px-3 text-sm text-black rounded-md"
                    type="number"
                    min={0}
                    defaultValue={defaultValue}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <div className="flex space-x-2 justify-center items-center">
                    <span className="text-xs">
                      15 years and above
                      <span className="bg-gray-300 text-gray-900 px-1 ml-1">
                        118 450 FCFA
                      </span>
                    </span>
                    <span
                      onClick={() => setOpen3(!open3)}
                      className="border rounded-full p-1 cursor-pointer"
                    >
                      <FaExclamation size={14} className="flex items-center" />
                    </span>
                  </div>
                  {open3 && (
                    <div className="text-white flex flex-col space-y-4 mt-2 mb-4">
                      <ul className="text-[14px] leading-5 text-gray-300">
                        <li>&#8594; Registration</li>
                        <li>&#8594; Laboratory</li>
                        <li>&#8594; X-Ray Chest</li>
                        <li>&#8594; Nurses&apos;Unit</li>
                        <li>&#8594; Doctors&apos;Unit</li>
                      </ul>
                    </div>
                  )}
                  <input
                    {...register("fieldFour")}
                    className="mt-2 w-full h-8 py-1 px-3 text-sm text-black rounded-md"
                    type="number"
                    min={0}
                    defaultValue={defaultValue}
                  />
                </div>
                {familySize1 !== 0 && (
                  <p className="bg-gray-300 text-gray-900 px-2 py-2 mt-4 rounded-md text-xs font-bold text-center">
                    Family size: {familySize1}
                  </p>
                )}
                <div className="flex gap-x-2 flex-row justify-center items-center w-full">
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
            </div>
            <div className="bg-blue-950 rounded-md px-6 py-4">
              <div className="flex justify-center items-center flex-col">
                <p className="text-xs text-gray-300 text-center">
                  Receipt amount
                </p>
                <div className="flex flex-row justify-center items-center space-x-2 mt-4">
                  <input
                    {...register("fieldDiffOne")}
                    className="w-2/3 h-8 py-1 px-3 text-sm text-black rounded-md"
                    type="number"
                    defaultValue={defaultValue}
                    min={0}
                  />
                  <button
                    className="bg-green-500 w-[80px] h-8 p-1 text-sm rounded-md text-white"
                    onClick={toCheck}
                  >
                    Check
                  </button>
                </div>
                {priceCANIMM && parseInt(String(restOne)) < 0 ? (
                  <p className="bg-green-300 text-gray-900 px-2 py-0.5 mt-4 rounded-md text-xs">
                    It is in good sale.
                  </p>
                ) : parseInt(String(pp)) === 0 ? (
                  <p className="hidden"></p>
                ) : (
                  <p className="bg-red-300 text-gray-900 px-2 py-0.5 mt-4 rounded-md text-xs">
                    {new Intl.NumberFormat("en-US").format(restOne)} FCFA left
                    to complete the invoice
                  </p>
                )}
              </div>
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
                <p className="bg-gray-300 text-gray-900 px-2 py-0.5 mt-4 rounded-md text-xs font-bold">
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
    </>
  );
};

export default Home;
