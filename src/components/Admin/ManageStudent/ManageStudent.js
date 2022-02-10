import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import SingleStudent from "./SingleStudent";

const ManageStudent = () => {
  const headingColor = { color: "#3A4256" };
  const [studentsData, setStudentsData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [number, setNumber] = useState(0);
  const history = useHistory();
  const search = useLocation().search;
  const pageNumber = new URLSearchParams(search).get("page") || 1;
  const page = new URLSearchParams(search).get("page") || 1;
  const serial = 10 * pageNumber - 10;
  const totalPage = Math.ceil(totalData / 10);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/student/paginationStudentData`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ page: page }),
        }
      );
      const usersData = await res.json();
      const userData = usersData.result;
      setStudentsData(userData);
      const totalData = usersData.totalData;
      setTotalData(totalData);
    };
    loadData();
  }, [page, number]);

  const handlePageChange = (page) => {
    history.push(`/manageStudent?page=${page.selected + 1}`);
  };

  const onSubmitStudentEdit = (data) => {
    fetch(`${process.env.REACT_APP_API_URL}/student/updateStudent/${data.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
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
        setNumber((prevState) => prevState + 1);
      });
  };

  const deleteStudent = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/student/deleteStudent/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.success);
        const newStudentsData = studentsData.filter(
          (studentData) => studentData._id !== id
        );
        setStudentsData(newStudentsData);
        setNumber((prevState) => prevState + 1);
      });
  };

  return (
    <div>
      <h4 className="pt-3 pb-5 ps-3" style={headingColor}>
        Manage Student
      </h4>
      <div className="container">
        <div className="table-responsive">
          <table className="table text-center table-responsive border">
            <thead>
              <tr>
                <th scope="col">#Sl</th>
                <th scope="col">Full Name</th>
                <th scope="col">Roll</th>
                <th scope="col">Age</th>
                <th scope="col">Class</th>
                <th scope="col">Hall Name</th>
                <th scope="col">Status</th>
                <th scope="col">Checked</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((studentData, index) => (
                <SingleStudent
                  key={studentData?._id}
                  studentData={studentData}
                  deleteStudent={deleteStudent}
                  onSubmitStudentEdit={onSubmitStudentEdit}
                  index={index}
                  serial={serial}
                  setNumber={setNumber}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={totalPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageStudent;
