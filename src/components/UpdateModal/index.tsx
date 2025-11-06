import { useState, useEffect } from "react";
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
import { LuPen, LuFlag } from "react-icons/lu";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "../ui/select";
import type Task from "../../domain-models/tasks";
interface UpdateModalProps {
    task: Task;
    onUpdate: (taskId: string, updates: Task) => void;
}
export function UpdateModal({ task, onUpdate }: UpdateModalProps) {
    const [open, setOpen] = useState(false);
    const [priority, setPriority] = useState(task.priority);
    
    useEffect(() => {
        if (open) {
            setPriority(task.priority);
        }
    }, [task.priority, open]);
    
    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        onUpdate(task.id, {title, description, priority} as Task);
        setOpen(false);
    };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <span className="flex items-center gap-4 cursor-pointer hover:text-blue-600 transition-colors">
          <LuPen /> Edit
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleUpdate}>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Task</AlertDialogTitle>
            <AlertDialogDescription>
              Make changes to your Task here. Click save when you&apos;re done.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Task Name</Label>
              <Input id="title" name="title" defaultValue={task.title} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Task Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={task.description}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="priority">Task Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem className="group text-blue-500 hover:bg-blue-200 focus:opacity-100 hover:text-white focus:bg-blue-500 focus:text-white [&:hover_svg]:text-white [&:focus_svg]:text-white" value="Low">
                      <LuFlag className="text-blue-500" /> Low
                    </SelectItem>
                    <SelectItem className="group text-yellow-500 hover:bg-yellow-200 focus:opacity-100 hover:text-white focus:bg-yellow-500 focus:text-white [&:hover_svg]:text-white [&:focus_svg]:text-white" value="Medium">
                      <LuFlag className="text-yellow-500" /> Medium
                    </SelectItem>
                    <SelectItem className="group text-red-500 hover:bg-red-200 focus:opacity-100 hover:text-white focus:bg-red-500 focus:text-white [&:hover_svg]:text-white [&:focus_svg]:text-white" value="High">
                      <LuFlag className="text-red-500" /> High
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel type="button" onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              type="submit"
              className="bg-[oklch(25.7%_0.09_281.288)] text-white hover:opacity-90"
            >
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
