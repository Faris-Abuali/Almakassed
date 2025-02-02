import { Chapter, CreateChapterResponse } from "./types";
import axios from "src/API/axios";

export const createChapter = (chapterName: string) => {
  return axios
    .post<CreateChapterResponse>("/chapters", { name: chapterName })
    .then((res) => res.data);
};

export const getChapters = () => {
  return axios.get<Chapter[]>("/chapters").then((res) => res.data);
};
