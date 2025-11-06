import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal";
import { UpdateModal } from "../UpdateModal";
import type Task from "../../domain-models/tasks";
interface DeleteEditModalProps {
    task: Task;
    onDelete: () => void;
    onEdit: (taskId: string, updates: Task) => void;
    openConfirmationModal: () => void;
}
export function DeleteEditModal({ task, onDelete, onEdit, openConfirmationModal }: DeleteEditModalProps) {

    return (
      <>
      <Popover>
        <PopoverTrigger asChild>
          <button><PiDotsThreeOutlineLight /></button>
        </PopoverTrigger>
        <PopoverContent>
        <div className="flex flex-col gap-2 items-center">
        <UpdateModal task={task} onUpdate={onEdit}/>
        <DeleteConfirmationModal onDelete={onDelete} openConfirmationModal={openConfirmationModal} />

       </div>
        </PopoverContent>
      </Popover>
      </>
    )
  }