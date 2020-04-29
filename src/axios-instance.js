import axios from "axios";

const instance = axios.create({
  baseURL: "https://taskmanager-ac119.firebaseio.com/",
});

export default instance;
