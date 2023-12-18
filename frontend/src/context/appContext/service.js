import axios from "axios";
export const getMovieLists = (page) => {
  return axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}data/page${page}.json`
  );
};
