"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import FormRow from "../../FormRow";
import customFetch from "../../..//utilities/axios";
import { useRouter } from "next/navigation";
import {
  getPercentage,
  createPercentage,
} from "../../../features/course/percentage/percentageSlice.jsx";

const initialState = {
  percent: "",
};

const CreatePercentage = () => {
  const { percentage, allpercentage } = useSelector(
    (strore) => strore.percentage
  );
  const { isLoading } = useSelector((store) => store.user);
  const [profitRatio, setprofitRatio] = useState(initialState);
  const [isValue, setIsValue] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const disPatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    disPatch(getPercentage());
    setprofitRatio({ percent: percentage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setprofitRatio({ ...profitRatio, [name]: value });
  };

  const back = () => {
    router.back();
  };
  // console.log(percentage);
  // console.log(allpercentage);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profitRatio || profitRatio === "") {
      toast.error("please fill all details");
    }
    // disPatch(createPercentage(profitRatio.percent));
    try {
      const res = await customFetch.post(
        `finance/company/create-percentage-ratio`,
        {
          percentage: profitRatio.percent,
        },
        {
          withCredentials: true,
          credentials: "includes",
        }
      );
      const resp1 = { data: res.data.profitRatio, stats: res.status };

      const resp = await axios.get(
        `http://localhost:8000/greendometech/ng/finance/company/view-percentage`,
        {
          withCredentials: true,
        }
      );

      //console.log(resp.data);
      setTrigger(true);
      // console.log(profitRatio.percent);
      if (resp1 !== "") {
        setIsValue(true);
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <main>
      {!isValue ? (
        <form action="">
          <button onClick={handleSubmit} type="submit">
            set percentage
          </button>
          <div>set percentage %</div>
          <div>
            <FormRow
              type="number"
              name="percent"
              value={profitRatio.percent}
              handleChange={handleChange}
              // handleOnFocus={() => handleOnFocus()}
              // handleOnBlur={handleOnBlur}
            />
          </div>
        </form>
      ) : (
        <div>
          {allpercentage.map((i, idx) => {
            const { percentage, _id } = i;
            return (
              <div key={idx}>
                <h2>{`The profit sharing ratio for Greendome technology courses with id ${_id} is set to ${percentage}%`}</h2>
                <button onClick={() => back()}>back to settings</button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default CreatePercentage;
