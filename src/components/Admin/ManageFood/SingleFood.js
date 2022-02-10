import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";

const SingleFood = ({
  foodData,
  index,
  deleteFoodItem,
  serial,
  onSubmitEdit,
  setNumber,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <tr>
      <td>{serial + index + 1}</td>
      <td>{foodData.name}</td>
      <td>{foodData.price}</td>
      <td>
        <button
          style={{ border: "none" }}
          data-bs-toggle="modal"
          data-bs-target={`#dataEdit${foodData._id}`}
        >
          <FontAwesomeIcon style={{ color: "blue" }} icon={faEdit} />
        </button>
        |
        <button
          style={{ border: "none" }}
          data-bs-toggle="modal"
          data-bs-target={`#dataDelete${index + 1}`}
        >
          <FontAwesomeIcon style={{ color: "red" }} icon={faTrash} />
        </button>
      </td>
      <div
        className="modal fade text-start"
        id={`dataEdit${foodData._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                EDIT - {foodData.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmitEdit)}>
                <div className="form-group">
                  <label htmlFor="name">Food Name</label>
                  <input
                    type="text"
                    defaultValue={foodData.name}
                    {...register("name")}
                    name="name"
                    id="name"
                    autoComplete="off"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    defaultValue={foodData.price}
                    {...register("price")}
                    name="price"
                    id="price"
                    autoComplete="off"
                    className="form-control"
                  />
                </div>

                <input
                  type="id"
                  defaultValue={foodData._id}
                  {...register("id")}
                  name="id"
                  id="id"
                  hidden
                />

                <div className="form-group mt-3">
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-primary"
                    value="Save Changes"
                    data-bs-dismiss="modal"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id={`dataDelete${index + 1}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                DELETE - {foodData?.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you want to delete this?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => deleteFoodItem(foodData._id)}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </tr>
  );
};

export default SingleFood;
