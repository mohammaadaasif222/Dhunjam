import React, { useState, useEffect } from "react";
import BarChartComponent from "../components/BarChartComponent";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [chargeCustomers, setChargeCustomers] = useState(null);
  const [formDataValues, setFormDataValues] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchAdminData = async () => {
    const response = await fetch("https://stg.dhunjam.in/account/admin/4");
    const result = await response.json();
    setData(result.data);
    setChargeCustomers(result.data?.charge_customers);
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleInputChange = (event, category) => {
    const value = event.target.value;
    setFormDataValues({
      ...formDataValues,
      [`category_${category}`]: value,
    });
  };

  const handleRadioChange = (e) => {
    setChargeCustomers(e.target.value);
  };
  const handleSave = async () => {
    const categoryValues = [
      formDataValues.category_7,
      formDataValues.category_8,
      formDataValues.category_9,
      formDataValues.category_10,
    ];

    const minValues = [79, 59, 39, 19];

    for (let i = 0; i < categoryValues.length; i++) {
      if (categoryValues[i] < minValues[i]) {
        return alert(
          `Value for category_${i + 7} cannot be less than ${minValues[i]}`
        );
      }
    }

    try {
      setLoading(true);
      const response = await fetch("https://stg.dhunjam.in/account/admin/4", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: {
            ...formDataValues,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        fetchAdminData();
        setLoading(false);
        console.log("Update successful:", data);
        // Handle success
      } else {
        // Handle error
        console.error("Error submitting data:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setLoading(false);
    }
  };

  console.log(Object.keys(formDataValues).length === 0);
  return (
    <div className="xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm max-w-xs mx-auto flex flex-col justify-center">
      <h1 className="text-3xl text-center my-7">{`${data?.name}, ${data?.location}`}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-5">
        <p className="text-xs flex items-center">
          Do you want to charge your customers for requesting songs?
        </p>
        <div className="flex items-center justify-center mb-4">
          <input
            defaultChecked
            id="charge_customers"
            type="radio"
            value="true"
            name="charge_customers"
            onChange={handleRadioChange}
            className="w-4 h-4 text-[#6741D9] bg-white border-white focus:ring-[#6741D9] dark:focus:ring-[#6741D9] dark:ring-offset-gray-800 focus:ring-2 dark:bg-white dark:border-white"
          />
          <label
            htmlFor="default-radio-1"
            className="ms-2 text-xs font-medium text-white mr-10"
          >
            Yes
          </label>
          <input
            id="charge_customers"
            type="radio"
            value="false"
            name="charge_customers"
            onChange={handleRadioChange}
            className="w-4 h-4 text-[#6741D9] bg-gray-100 border-gray-300 focus:ring-[#6741D9] dark:focus:ring-[#6741D9] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-radio-2"
            className="ms-2 text-xs font-medium text-white"
          >
            No
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 my-3">
        <p className="text-xs flex items-center">Custom song request amount-</p>
        <input
          type="text"
          defaultValue={data?.amount?.category_6}
          className={`border-dashed rounded-lg p-3 text-center  text-xs hover:border-[#F0C3F1] ${
            chargeCustomers === "false" ? "bg-[#C2C2C2]" : "bg-transparent"
          }`}
          disabled={chargeCustomers === "false"}
          placeholder="Enter amount"
          min={99}
          onChange={(event) => handleInputChange(event, 6)}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 my-3">
        <p className="text-xs flex items-center">
          Regular song request amounts, from high to low-
        </p>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
          <input
            type="text"
            defaultValue={data?.amount?.category_7}
            className={` border-dashed rounded-lg py-2 px-4 text-xs text-center ${
              chargeCustomers === "false" ? "bg-[#C2C2C2] " : "bg-transparent"
            }`}
            disabled={chargeCustomers === "false"}
            min={7 * 10 - 21}
            onChange={(event) => handleInputChange(event, 7)}
          />
          <input
            type="text"
            defaultValue={data?.amount?.category_8}
            className={` border-dashed rounded-lg py-2 px-4 text-xs text-center ${
              chargeCustomers === "false" ? "bg-[#C2C2C2] " : "bg-transparent"
            }`}
            disabled={chargeCustomers === "false"}
            min={8 * 10 - 21}
            onChange={(event) => handleInputChange(event, 8)}
          />
          <input
            type="text"
            defaultValue={data?.amount?.category_9}
            className={` border-dashed rounded-lg py-2 px-4 text-xs text-center ${
              chargeCustomers === "false" ? "bg-[#C2C2C2] " : "bg-transparent"
            }`}
            disabled={chargeCustomers === "false"}
            min={9 * 10 - 21}
            onChange={(event) => handleInputChange(event, 9)}
          />
          <input
            type="text"
            defaultValue={data?.amount?.category_10}
            className={` border-dashed rounded-lg py-2 px-4 text-xs text-center ${
              chargeCustomers === "false" ? "bg-[#C2C2C2] " : "bg-transparent"
            }`}
            disabled={chargeCustomers === "false"}
            min={10 * 10 - 21}
            onChange={(event) => handleInputChange(event, 10)}
          />
        </div>
      </div>

      <div
        className="py-5"
        // style={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}
      >
        {data && <BarChartComponent data={data.amount} />}
      </div>
      <button
        className={`text-white rounded-lg p-3 mb-10  ${
          chargeCustomers === "false" ||
          Object.keys(formDataValues).length === 0 ||
          loading
            ? "bg-[#C2C2C2] cursor-not-allowed"
            : "bg-[#6741D9]"
        }`}
        disabled={
          chargeCustomers === "false" ||
          Object.keys(formDataValues).length === 0 ||
          loading
        }
        onClick={handleSave}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default Dashboard;
