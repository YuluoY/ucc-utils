import * as cookie from "./cookie";
import * as localStorage from "./localStorage";
import * as sessionStorage from "./sessionStorage";
import * as indexDB from "./indexDB";

export default {
  cookie, // 4KB
  localStorage, // 2.5-10MB
  sessionStorage, // 2.5-10MB
  indexDB, // >250MB
};
