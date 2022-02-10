import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddStudent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const headingColor = { color: "#3A4256" };

  const onSubmit = (data, e) => {
    fetch(`${process.env.REACT_APP_API_URL}/student/addStudent`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        roll: data.roll,
        age: data.age,
        class: data.class,
        hallName: data.hallName,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.success);
        e.target.reset();
      });
  };

  return (
    <div className="ps-3 w-75">
      <h4 className="ps-2 pt-3 pb-5" style={headingColor}>
        Add Student
      </h4>
      <div className="card make-admin-card-style">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group pb-3">
              <label htmlFor="fullName" className="pb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                aria-invalid={errors.fullName ? "true" : "false"}
                {...register("fullName", { required: true })}
                id="fullName"
                className="form-control"
              />
              {errors.fullName && (
                <span role="alert" className="text-danger">
                  {" "}
                  This field is required{" "}
                </span>
              )}
            </div>
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
              <label htmlFor="age" className="pb-2">
                Age
              </label>
              <input
                type="text"
                name="age"
                placeholder="Enter Age"
                aria-invalid={errors.age ? "true" : "false"}
                {...register("age", { required: true })}
                id="age"
                className="form-control"
              />
              {errors.age && (
                <span role="alert" className="text-danger">
                  {" "}
                  This field is required{" "}
                </span>
              )}
            </div>
            <div className="form-group pb-3">
              <label htmlFor="class" className="pb-2">
                Class
              </label>
              <input
                type="text"
                name="class"
                placeholder="Enter Class"
                aria-invalid={errors.class ? "true" : "false"}
                {...register("class", { required: true })}
                id="class"
                className="form-control"
              />
              {errors.class && (
                <span role="alert" className="text-danger">
                  {" "}
                  This field is required{" "}
                </span>
              )}
            </div>
            <div className="form-group pb-3">
              <label htmlFor="hallName" className="pb-2">
                Hall Name
              </label>
              <input
                type="text"
                name="hallName"
                placeholder="Enter Hall Name"
                aria-invalid={errors.hallName ? "true" : "false"}
                {...register("hallName", { required: true })}
                id="hallName"
                className="form-control"
              />
              {errors.hallName && (
                <span role="alert" className="text-danger">
                  {" "}
                  This field is required{" "}
                </span>
              )}
            </div>
            <div className="form-group pb-3">
              <input type="submit" name="submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
