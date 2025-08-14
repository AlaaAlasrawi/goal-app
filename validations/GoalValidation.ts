import * as Yup from "yup";

export const GoalValidation = Yup.object({
  title: Yup.string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),

  description: Yup.string()
    .trim()
    .max(500, "Description must be at most 500 characters")
    .optional(),

  category: Yup.string()
    .trim()
    .max(50, "Category must be at most 50 characters")
    .optional()
    .transform((v) => (v?.trim() === "" ? undefined : v)),

  dueDate: Yup.string()
    .required("Due date is required")
    .test("is-date", "Invalid date", (value) => {
      const d = value ? new Date(value) : null;
      return !!d && !isNaN(d.getTime());
    })
    .test("in-future", "Due date must be today or later", (value) => {
      const d = new Date(value!);
      const today = new Date();
      d.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      return d.getTime() >= today.getTime();
    }),
});
