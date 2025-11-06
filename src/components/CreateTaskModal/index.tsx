import type Task from "../../domain-models/tasks";
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
  import { Button } from "../ui/button";
  import { FaPlus } from "react-icons/fa";
  import { Label } from "../ui/label";
  import { Input } from "../ui/input";
  import { Textarea } from "../ui/textarea";
  import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "../ui/select";
  import { CalendarIcon } from "lucide-react";
  import { Calendar } from "../ui/calendar";
  import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
  import { LuFlag } from "react-icons/lu";
  import { useState } from "react";
  interface CreateTaskModalProps {
    onAddTask: (payload: Task) => void;
  }
  
  const formatDate = (date: Date | undefined) => {
    if (!date) {
      return ""
    }
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }
  const isValidDate = (date: Date | undefined) => {
    if (!date) {
      return false
    }
    return !isNaN(date.getTime())
  }
  export function CreateTaskModal({
    onAddTask,
  }: CreateTaskModalProps) {
    const [priority, setPriority] = useState("");
    const [open, setOpen] = useState(false)
    const [date, setDate]= useState<Date | undefined>()
    const [month, setMonth] = useState<Date | undefined>(date)
    const [value, setValue] = useState(formatDate(date))
    
    const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const dueDate = formData.get("dueDate") as string;
        onAddTask({title, description, dueDate, priority} as Task);
    };
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button
              variant="ghost"
              size="icon-sm"
              className="text-white hover:bg-white/20 hover:text-white h-7 w-7"
            >
              <FaPlus className="text-sm" />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
        <form onSubmit={handleCreateTask}>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Task</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new task here. Click save when you&apos;re done.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Task Name</Label>
              <Input id="title" name="title" placeholder="Enter task name" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Task Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter task description"
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
            <div className="grid gap-3">
            <div className="flex flex-col gap-3">
      <Label htmlFor="dueDate" className="px-1">
        Due Date
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          name="dueDate"
          value={value}
          placeholder="Select a date"
          className="bg-background pr-10"
          onChange={(e) => {
            const date = new Date(e.target.value)
            setValue(e.target.value)
            if (isValidDate(date)) {
              setDate(date)
              setMonth(date)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date: Date | undefined) => {
                setDate(date)
                setValue(formatDate(date))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel type="button" onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              type="submit"
              className="bg-[oklch(25.7%_0.09_281.288)] text-white hover:opacity-90"
            >
              Create Task
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  