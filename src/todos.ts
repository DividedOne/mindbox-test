import { v4 as uuidV4 } from "uuid";

export type Todo = {
  id: string;
  task: string;
  isCompleted: boolean;
};

export const initialTodos = [
  { id: uuidV4(), task: "Learn React", isCompleted: false },
  { id: uuidV4(), task: "Learn Tailwind", isCompleted: true },
  { id: uuidV4(), task: "Learn TypeScript", isCompleted: false },
] satisfies Todo[];
