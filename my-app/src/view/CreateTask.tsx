import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createData, changeCategory } from "../store/action";
import Swal from "sweetalert2";

function CreateTask() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  function submitData(e: { preventDefault: () => void }) {
    e.preventDefault();
    dispatch(changeCategory("all"));
    if (title) {
      const data = {
        title,
        status: "On Progress",
        date: new Date().toLocaleString(),
      };
      dispatch(createData(data));
      Swal.fire("Created!", "You create a new task!", "success");
      history.push("/");
    } else {
      Swal.fire("Error!", "To Do List Cannot be Empty", "error");
    }
  }

  function backToHome() {
    history.push("/");
  }

  return (
    <div>
      <form className="container" onSubmit={submitData}>
        <div>
          <label className="font-bold mb-3 mt-10">To Do List</label>
          <input
            placeholder="Apa yang akan anda lakukan hari ini? :)"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>
        <div className="my-3">
          <button className="btn btn-primary" type="submit">
            Create
          </button>
          <button className="btn btn-danger ml-3" onClick={() => backToHome()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
