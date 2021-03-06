import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SingleStudent = ({
  studentData,
  index,
  serial,
  setNumber,
  deleteStudent,
  onSubmitStudentEdit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState(studentData?.status);
  const updateStatus = (val, id) => {
    fetch(`${process.env.REACT_APP_API_URL}/student/updateStudent/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: val }),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success("Status changed Successfully!");
        setNumber((prevState) => prevState + 1);
      });
  };

  return (
    <tr>
      <td>{serial + index + 1}</td>
      <td>{studentData?.fullName}</td>
      <td>{studentData?.roll}</td>
      <td>{studentData?.age}</td>
      <td>{studentData?.class}</td>
      <td>{studentData?.hallName}</td>
      <td>{studentData?.status}</td>
      <td>
        <input
          type="checkbox"
          defaultChecked={status === "inActive" ? false : true}
          onChange={() => {
            setStatus(status === "inActive" ? "active" : "inActive");
            updateStatus(
              status === "inActive" ? "active" : "inActive",
              studentData?._id
            );
          }}
        />
      </td>
      <td>
        <button
          style={{ border: "none" }}
          data-bs-toggle="modal"
          data-bs-target={`#studentDataEdit${studentData._id}`}
        >
          <FontAwesomeIcon style={{ color: "blue" }} icon={faEdit} />
        </button>
        |
        <button
          style={{ border: "none" }}
          data-bs-toggle="modal"
          data-bs-target={`#studentDataDelete${index + 1}`}
        >
          <FontAwesomeIcon style={{ color: "red" }} icon={faTrash} />
        </button>
      </td>
      <div
        className="modal fade text-start"
        id={`studentDataEdit${studentData._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                EDIT - {studentData.fullName}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmitStudentEdit)}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    defaultValue={studentData.fullName}
                    {...register("fullName")}
                    name="fullName"
                    id="fullName"
                    autoComplete="off"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="roll">Roll</label>
                  <input
                    type="text"
                    defaultValue={studentData.roll}
                    {...register("roll")}
                    name="roll"
                    id="roll"
                    autoComplete="off"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="text"
                    defaultValue={studentData.age}
                    {...register("age")}
                    name="age"
                    id="age"
                    autoComplete="off"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="class">Class</label>
                  <input
                    type="text"
                    defaultValue={studentData.class}
                    {...register("class")}
                    name="class"
                    id="class"
                    autoComplete="off"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="hallName">Hall Name</label>
                  <input
                    type="text"
                    defaultValue={studentData.hallName}
                    {...register("hallName")}
                    name="hallName"
                    id="hallName"
                    autoComplete="off"
                    className="form-control"
                  />
                </div>

                <input
                  type="id"
                  defaultValue={studentData._id}
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
        id={`studentDataDelete${index + 1}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                DELETE - {studentData?.fullName}
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
                onClick={() => deleteStudent(studentData._id)}
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

export default SingleStudent;
