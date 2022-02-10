import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";

const Distribution = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const headingColor = { color: "#3A4256" };
  const [show, setShow] = useState(true);
  const [foodsData, setFoodsData] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/foodItem/getFoodItem`)
      .then((res) => res.json())
      .then((result) => {
        setFoodsData(
          result.map((res) => ({
            value: res.name,
            label: res.name,
          }))
        );
      });
  }, []);

  const onSearch = (data, e) => {
    fetch(`${process.env.REACT_APP_API_URL}/distribution/searchDistribution`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        studentId: data.roll,
        shift: data.shift,
        date: data.date,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          swal("Failed!", result.message, "error", {
            dangerMode: true,
          });
          e.target.reset();
        } else {
          setSearchInfo(result);
          e.target.reset();
          setShow(false);
        }
      });
  };

  const onSubmit = (data, e) => {
    fetch(`${process.env.REACT_APP_API_URL}/distribution/addDistribution`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        studentId: searchInfo.studentId,
        shift: searchInfo.shift,
        date: searchInfo.date,
        foodItemList: [...data.foodItemList.map((data) => data.value)],
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setShow(true);
      });
  };

  return (
    <div className="ps-3 w-75">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h4 className="ps-2 pt-3 pb-5" style={headingColor}>
        Distribution
      </h4>
      <div className="card make-admin-card-style">
        <div className="card-body">
          <div style={{ display: show ? "block" : "none" }}>
            <form onSubmit={handleSubmit(onSearch)}>
              <div className="form-group pb-3">
                <label htmlFor="roll" className="pb-2">
                  Roll
                </label>
                <input
                  type="text"
                  name="roll"
                  placeholder="Enter Roll"
                  aria-invalid={errors.roll ? "true" : "false"}
                  {...register("roll", { required: true })}
                  id="roll"
                  className="form-control"
                />
                {errors.roll && (
                  <span role="alert" className="text-danger">
                    {" "}
                    This field is required{" "}
                  </span>
                )}
              </div>
              <div className="form-group pb-3">
                <label htmlFor="shift" className="pb-2">
                  Shift
                </label>
                <select {...register("shift")} className="form-control">
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
                {errors.shift && (
                  <span role="alert" className="text-danger">
                    {" "}
                    This field is required{" "}
                  </span>
                )}
              </div>
              <div className="form-group pb-3">
                <label htmlFor="date" className="pb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  placeholder="Enter Date"
                  aria-invalid={errors.date ? "true" : "false"}
                  {...register("date", { required: true })}
                  id="date"
                  className="form-control"
                />
                {errors.date && (
                  <span role="alert" className="text-danger">
                    {" "}
                    This field is required{" "}
                  </span>
                )}
              </div>

              <div className="form-group pb-3">
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
          <div style={{ display: show ? "none" : "block" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group pb-3">
                <label htmlFor="foodItemList" className="pb-2">
                  Food List
                </label>
                <Controller
                  name="foodItemList"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} isMulti={true} options={foodsData} />
                  )}
                />
              </div>

              <div className="form-group pb-3">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distribution;
