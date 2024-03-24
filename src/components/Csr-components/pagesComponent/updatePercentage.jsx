"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import customFetch from "../../../utilities/axios";
import FormRow from "../../../components/FormRow";
import Link from "next/link";
import moment from "moment";
import _ from "lodash";
import {
  getPercentage,
  resetPercentage,
  updatePercentage,
  resetUpdateMsg,
  UpdateMsg,
} from "../../../features/course/percentage/percentageSlice.jsx";

const initialState = {
  percent: "",
};

const UpdatePercentage = () => {
  const { percentage, allpercentage, updateMsg } = useSelector(
    (strore) => strore.percentage
  );
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((strore) => strore.profiles);
  const { isLoading } = useSelector((store) => store.user);
  const [profitRatio, setprofitRatio] = useState(initialState);
  const [percentObj, setPercentObj] = useState(allpercentage);
  const [trigger, setTrigger] = useState(false);
  const [sensor, setSensor] = useState(false);
  const [success, setSuccess] = useState(false);
  const [author, setAuthor] = useState();
  const [ratioId, setRatioId] = useState("");
  const [modal, setModal] = useState({ show: false, msg: "", type: "" });
  const disPatch = useDispatch();

  const loggedInUserId = user?.data.user.id;

  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);

  const role = loggedInUser?.map((i) => {
    return i.roles.includes("company");
  });
  //console.log(role);
  const IsCompany = _.toString(role) === "true";

  // console.log(IsCompany);
  const showModal = (show = false, msg = "", type = "") => {
    setModal(show, msg, type);
  };
  {
    IsCompany &&
      useEffect(() => {
        if (allpercentage.length !== 0) {
          const RatioAuthor = _.toString(allpercentage.map((i) => i.createdBy));
          const authorObj = users?.filter((i) => i.id === RatioAuthor);
          const author = authorObj?.map((i) => {
            return i.roles;
          });
          setAuthor(author);
        }
      }, []);
  }

  {
    IsCompany &&
      useEffect(() => {
        disPatch(getPercentage());
        disPatch(resetUpdateMsg());
        setprofitRatio(sensor ? { percent: 0 } : { percent: percentage });
        setRatioId(_.toString(allpercentage.map((i) => i._id)));
      }, [trigger]);
  }

  {
    IsCompany &&
      useEffect(() => {
        if (updateMsg !== undefined) {
          showModal({ show: true });
        }
        const timeout = setTimeout(() => {
          setSuccess(false);
          showModal({ show: false });
          disPatch(resetUpdateMsg());
        }, 5000);

        return () => clearTimeout(timeout);
      }, [updateMsg, success]);
  }

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `http://localhost:8000/greendometech/ng/finance/company/delete-percentage/${id}`,
      {
        withCredentials: true,
      }
    );
    const response = res.data.profitRatio;
    const deletedId = response._id;
    const newRatioList = allpercentage.filter((i) => i._id !== deletedId);
    console.log(response);

    setPercentObj(newRatioList);

    if (newRatioList.length === 0) {
      setTrigger(true);
      setSensor(true);
    }

    // if (newRatio === "") {
    //   setprofitRatio({ percent: 0 });
    // } else {
    //   setprofitRatio({ percent: percentage });
    // }
    // const resp = await axios.get(
    //   `http://localhost:8000/greendometech/ng/finance/company/view-percentage`,
    //   {
    //     withCredentials: true,
    //   }
    // );

    // disPatch(resetPercentage());

    //setprofitRatio({ ...profitRatio, [name]: value });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setprofitRatio({ ...profitRatio, [name]: value });
  };

  // console.log(percentage);
  // console.log(percentage);
  //console.log(profitRatio.percent);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profitRatio || profitRatio === "" || ratioId === "") {
      toast.error("please fill all details");
      disPatch(
        UpdateMsg("Error, no percentage to update, set a new percentage")
      );
      // setSensor(false);
      // setTrigger(true);
    }
    try {
      const res = await customFetch.put(
        `/finance/company/update-percentage/${ratioId}`,
        {
          percentage: profitRatio.percent,
          party_type: author[0],
        },
        {
          withCredentials: true,
          credentials: "include",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = { data: res.data.profitRatio, stats: res.status };
      const updatedId = resp.data._id;
      const newRatioList = percentObj.filter((i) => i._id !== updatedId);
      //console.log(resp);

      setPercentObj([...newRatioList, resp.data]);
      setTrigger(false);

      if (updatedId !== "") {
        setSensor(true);
        setSuccess(true);
      }
    } catch (error) {
      console.log("error");
      return error;
    }
    // disPatch(
    //   updatePercentage({
    //     params: ratioId,
    //     percentage: profitRatio.percent,
    //     party_type: author[0],
    //   })
    // );
    // setTrigger(true);

    // console.log(profitRatio.percent);
    // console.log(ratioId);
  };

  return (
    <main>
      {IsCompany && (
        <div>
          {modal.show && <h2>{updateMsg}</h2>}
          {success && (
            <h2>{`The profit sharing ratio for Greendome technology courses has been updated`}</h2>
          )}
          <form action="" onSubmit={handleSubmit}>
            <Link href={"/panel/admin_dashboard"}>
              <button>done</button>
            </Link>

            <button onClick={handleSubmit} type="submit">
              update percentage
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
          {trigger ? (
            <div>
              <h1>no percentage set, please set percentage</h1>
              <Link href={"/panel/company/set-percentage"}>
                <button>set percentage</button>
              </Link>
            </div>
          ) : (
            <div>
              {percentObj.map((i, idx) => {
                const {
                  percentage,
                  createdBy,
                  party_type,
                  createdAt,
                  updatedAt,
                  _id,
                } = i;
                return (
                  <div key={idx}>
                    <h2>id: {_id}</h2>
                    <h2>ratio: {percentage}</h2>
                    <h2>creator: {createdBy}</h2>
                    <h2>party_type: {party_type}</h2>
                    <h2>createdAt: {createdAt}</h2>
                    <h2>updatededAt: {updatedAt}</h2>
                    <button onClick={() => handleDelete(_id)}>delete</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div>
        <Link href={"/panel/logout"}>
          <h2>logout</h2>
        </Link>
      </div>
    </main>
  );
};

export default UpdatePercentage;
