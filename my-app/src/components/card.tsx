import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { patchDoneTask, deleteData, fetchData } from "../store/action";

type ValueProps = {
  title: string;
  status: string;
  date: string;
  id: number;
};

const CardToDo: React.FC<ValueProps> = ({ title, status, date, id }) => {
  const dispatch = useDispatch();

  function deleteTask(id: number) {
    console.log(id);

    dispatch(deleteData(id));
    Swal.fire("Deleted!", "You Deleted the Task!", "success");
    dispatch(fetchData());
  }

  function doneTask(id: number) {
    dispatch(patchDoneTask(id));
    Swal.fire("Congratulations!", "You Finish Your Task!", "success");
  }

  return (
    <div className="mx-2 my-2">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            <b>Status:</b> {status}
          </p>
          <p className="card-text">
            <b>Date:</b> {date}
          </p>
          <button
            type="button"
            className="btn-sm btn-primary mt-2 mr-2"
            onClick={() => doneTask(id)}
          >
            Done
          </button>
          <button
            type="button"
            className="btn-sm btn-danger mt-2"
            onClick={() => deleteTask(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardToDo;