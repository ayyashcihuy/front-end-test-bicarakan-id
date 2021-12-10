import actionType from "./actionType";
import axios from "axios";

export const setData = (data: any[]) => {
  return {
    type: actionType.FETCH_DATA,
    payload: data,
  };
};

export const changeCategory = (category: string) => {
  return {
    type: actionType.CHANGE_CATEGORY,
    payload: category,
  };
};

export const fetchData = () => {
  return (dispatch: (arg0: { type: string; payload: any[] }) => void) => {
    axios
      .get("http://localhost:3000/tasks")
      .then(({ data }) => {
        dispatch(setData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchDataByCategory = (status: string) => {
  return (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    dispatch({ type: actionType.CHANGE_LOADING });
    axios
      .get("http://localhost:3000/tasks")
      .then(({ data }) => {
        let result: any[] = [];
        data = data.map((e: { status: any }) => {
          if (status === "all") {
            result.push(e);
          } else if (e.status === status) {
            result.push(e);
          }
        });
        dispatch(setData(result));
      })
      .catch((err) => {
        dispatch({ type: actionType.CHANGE_ERROR, payload: err });
      })
      .finally(() => {
        dispatch({ type: actionType.CHANGE_LOADING });
      });
  };
};

export const patchDoneTask = (id: number, categoryName: string) => {
  console.log(id, "hehe");
  return (dispath: (arg0: (dispatch: any) => void) => void) => {
    axios({
      method: "PATCH",
      url: `http://localhost:3000/tasks/${id}`,
      data: {
        status: "Done",
      },
    })
      .then(() => {
        dispath(fetchDataByCategory(categoryName));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const createData = (data: {
  title: string;
  status: string;
  date: string;
}) => {
  return (dispatch: (arg0: (dispatch: any) => void) => void) => {
    axios({
      method: "POST",
      url: "http://localhost:3000/tasks",
      data,
    })
      .then(({ data }) => {
        dispatch(fetchDataByCategory("all"));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const deleteData = (id: any, categoryName: string) => {
  console.log(id);
  return (dispatch: (arg0: (dispatch: any) => void) => void) => {
    axios({
      method: "DELETE",
      url: `http://localhost:3000/tasks/${id}`,
    })
      .then(({ data }) => {
        dispatch(fetchDataByCategory(categoryName));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
