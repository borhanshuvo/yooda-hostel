import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SingleStudent = ({ studentData, index, serial, setNumber }) => {
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
        setNumber((prevState) => prevState + 1);
      });
  };

  return (
    <tr key={studentData?._id}>
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
          //   onClick={() => deleteService(service._id)}
        >
          <FontAwesomeIcon style={{ color: "blue" }} icon={faEdit} />
        </button>
        |
        <button
          style={{ border: "none" }}
          //   onClick={() => deleteService(service._id)}
        >
          <FontAwesomeIcon style={{ color: "red" }} icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default SingleStudent;
