import { useOutletContext } from "react-router";
import { NotesContextType } from "./Contexts";

export function useNotes() {
  return useOutletContext<NotesContextType>();
}