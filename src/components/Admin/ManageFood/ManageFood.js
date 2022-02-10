import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory, useLocation } from "react-router-dom";

const ManageFood = () => {
  const headingColor = { color: "#3A4256" };
  const [foodsData, setFoodsData] = useState([]);
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
        `${process.env.REACT_APP_API_URL}/foodItem/paginationFoodItemData`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ page: page }),
        }
      );
      const usersData = await res.json();
      const userData = usersData.result;
      setFoodsData(userData);
      const totalData = usersData.totalData;
      setTotalData(totalData);
    };
    loadData();
  }, [page, number]);

  const handlePageChange = (page) => {
    history.push(`/manageStudent?page=${page.selected + 1}`);
  };

  return (
    <div>
      <h4 className="pt-3 pb-5 ps-3" style={headingColor}>
        Manage Food Item
      </h4>
      <div className="container">
        <div className="table-responsive">
          <table className="table text-center table-responsive border">
            <thead>
              <tr>
                <th scope="col">#Sl</th>
                <th scope="col">Food Name</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {foodsData.map((foodData, index) => (
                <tr key={foodData._id}>
                  <td>{serial + index + 1}</td>
                  <td>{foodData.name}</td>
                  <td>{foodData.price}</td>
                  <td>
                    <button
                      style={{ border: "none" }}
                      //   onClick={() => deleteService(service._id)}
                    >
                      <FontAwesomeIcon
                        style={{ color: "blue" }}
                        icon={faEdit}
                      />
                    </button>
                    |
                    <button
                      style={{ border: "none" }}
                      //   onClick={() => deleteService(service._id)}
                    >
                      <FontAwesomeIcon
                        style={{ color: "red" }}
                        icon={faTrash}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end me-4">
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

export default ManageFood;
