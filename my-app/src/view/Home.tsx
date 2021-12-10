import { ReactChild, ReactFragment, ReactPortal, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  fetchData,
  deleteData,
  fetchDataByCategory,
  changeCategory,
  patchDoneTask,
} from "../store/action";
import CardToDo from "../components/card";

function Home() {
  const dispatch = useDispatch();
  const { todoList, categoryName, loading, error } = useSelector(
    (state: any) => {
      return {
        todoList: state.todoList,
        categoryName: state.categoryName,
        loading: state.loading,
        error: state.error,
      };
    }
  );

  useEffect(() => {
    dispatch(fetchDataByCategory(categoryName));
  }, [categoryName]);

  function deleteTask(id: number) {
    dispatch(deleteData(id));
    Swal.fire("Deleted!", "You Deleted the Task!", "success");
    dispatch(fetchData());
  }

  function changeCategoryF(e: string) {
    dispatch(changeCategory(e));
  }

  function ErrorMsg() {
    return <p>Samtingwong</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something Wrong...</p>;
  }
  return (
    <div className="container mt-6 d-flex flex-column justify-content-center">
      <div className="align-items-sm-center justify-content-sm-center">
        <div className="">
          <label htmlFor="validationCustom04" className="form-label">
            <b>Sort By Status</b>
          </label>
          <div className="form-selection">
            <select
              className="form-select"
              value={categoryName}
              onChange={(e) => {
                changeCategoryF(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="onProgress">On Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <h1 className="mt-10 fs-1">
          <b>To Do List</b>
        </h1>
      </div>
      <div className="container mt-10 d-flex justify-content-center flex-sm-wrap">
        {todoList && todoList.length > 0 ? (
          todoList.map(
            (
              e: {
                title: string;
                status: string;
                date: string;
                id: number;
              },
              index: number
            ) => {
              return (
                <CardToDo
                  title={e.title}
                  status={e.status}
                  date={e.date}
                  id={e.id}
                />
              );
            }
          )
        ) : (
          <ErrorMsg />
        )}
      </div>
    </div>
  );
}

export default Home;
