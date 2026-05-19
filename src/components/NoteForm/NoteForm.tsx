import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote, type CreateNoteData } from "../../services/noteService";

import css from "./NoteForm.module.css";

const schema = Yup.object({
  title: Yup.string()
    .min(3, "Min 3 symbols")
    .max(50, "Max 50 symbols")
    .required("Required"),

  content: Yup.string().max(500, "Max 500 symbols"),

  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Required"),
});

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      onClose();
    },
  });

  return (
    <Formik<CreateNoteData>
      initialValues={{
        title: "",
        content: "",
        tag: "Todo",
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        mutation.mutate(values);
      }}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>

          <Field id="title" name="title" className={css.input} />

          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>

          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />

          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>

          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>

            <option value="Work">Work</option>

            <option value="Personal">Personal</option>

            <option value="Meeting">Meeting</option>

            <option value="Shopping">Shopping</option>
          </Field>

          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>

          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
