import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddFood = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const headingColor = { color: "#3A4256" };

  const onSubmit = (data, e) => {
    fetch(`${process.env.REACT_APP_API_URL}/foodItem/addFoodItem`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        price: data.price,
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
        Add Food
      </h4>
      <div className="card make-admin-card-style">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group pb-3">
              <label htmlFor="name" className="pb-2">
                Food Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Food Name"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name", { required: true })}
                id="name"
                className="form-control"
              />
              {errors.name && (
                <span role="alert" className="text-danger">
                  {" "}
                  This field is required{" "}
                </span>
              )}
            </div>
            <div className="form-group pb-3">
              <label htmlFor="price" className="pb-2">
                Food Price
              </label>
              <input
                type="text"
                name="price"
                placeholder="Enter Food Price"
                aria-invalid={errors.price ? "true" : "false"}
                {...register("price", { required: true })}
                id="price"
                className="form-control"
              />
              {errors.price && (
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

export default AddFood;
