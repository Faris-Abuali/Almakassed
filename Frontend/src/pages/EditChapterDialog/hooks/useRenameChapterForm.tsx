import { useFormik } from "formik";
import validationSchema from "../schema";
import { EditChapterFormValues } from "../types";
import useRenameChapter from "./useRenameChapter";
import { Chapter } from "../API/types";

const useRenameChapterForm = (chapter: Chapter) => {
  const { renameChapter, isRenaming } = useRenameChapter(chapter.id);

  const submitForm = (values: EditChapterFormValues) => {
    renameChapter({
      newChapterName: values.newChapterName,
      id: chapter.id,
    });
  };

  const formikProps = useFormik({
    initialValues: {
      newChapterName: chapter.name,
    },
    validationSchema,
    onSubmit: submitForm,
    enableReinitialize: true,
    isInitialValid: false,
  });

  return { formikProps, isRenaming };
};

export default useRenameChapterForm;
