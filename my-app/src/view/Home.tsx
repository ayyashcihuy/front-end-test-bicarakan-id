import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataByCategory, changeCategory } from "../store/action";
import CardToDo from "../components/card";
import Lottie from "react-lottie";
import DataNotFound from "../asset/85557-empty.json";
import Loading from "../asset/9844-loading-40-paperplane.json";
import Error from "../asset/44656-error.json";

function Home() {
  const dataNotFoundOption = {
    loop: true,
    autoplay: true,
    animationData: DataNotFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const errorOption = {
    loop: true,
    autoplay: true,
    animationData: Error,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const loadingOption = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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

  function changeCategoryF(e: string) {
    dispatch(changeCategory(e));
  }

  function ErrorMsg() {
    return (
      <div>
        <Lottie options={dataNotFoundOption} height={400} width={400} />
        <p>Data Not Found :(</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <Lottie options={loadingOption} height={400} width={400} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Lottie options={errorOption} height={400} width={400} />
      </div>
    );
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
              <option value="On Progress">On Progress</option>
              <option value="Done">Done</option>
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
