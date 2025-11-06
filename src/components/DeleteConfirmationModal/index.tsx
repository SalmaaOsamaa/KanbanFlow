import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { LuTrash2 } from "react-icons/lu";
interface DeleteConfirmationModalProps {
  onDelete: () => void;
  openConfirmationModal: () => void;
}
export function DeleteConfirmationModal({
  onDelete,
}: DeleteConfirmationModalProps) {
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span
          className="flex items-center gap-4 cursor-pointer hover:text-red-600 transition-colors"
        >
          <LuTrash2 /> Delete
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Task
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onDelete}
            className="bg-[oklch(25.7%_0.09_281.288)] text-white hover:opacity-90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
