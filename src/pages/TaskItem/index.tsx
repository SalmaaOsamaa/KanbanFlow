import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { IoFlagOutline } from "react-icons/io5";
import type Task from "../../domain-models/tasks";
import { DeleteEditModal } from "../../components/DeleteEditModal";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";
interface TaskItemProps {
  task: Task;
  editingSingleTask: (taskId: string, updates: Task) => void;
  deleteSingleTask: (taskId: string) => void;
}

const getPriorityBadgeStyles = (priority: string) => {
  const priorityLower = priority.toLowerCase();
  switch (priorityLower) {
    case "high":
      return "bg-red-200 text-red-500 border-red-200 hover:bg-red-200";
    case "medium":
      return "bg-yellow-200 text-yellow-500 border-yellow-200 hover:bg-yellow-200";
    case "low":
      return "bg-blue-200 text-blue-500 border-blue-200 hover:bg-blue-200";
    default:
      return "bg-gray-200 text-gray-800 border-gray-200 hover:bg-gray-200";
  }
};

export function TaskItem({ task, editingSingleTask, deleteSingleTask }: TaskItemProps) {
  const priorityStyles = getPriorityBadgeStyles(task.priority);
  return (
    <Card className="flex flex-col w-full cursor-move hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-end items-end cursor-pointer hover:text-gray-500 transition-colors">
          <DeleteEditModal
            task={task}
            openConfirmationModal={() => {
              console.log("Opening confirmation modal");
            }}
            onEdit={editingSingleTask}
            onDelete={() => {
              deleteSingleTask(task.id);
            }}
          />
        </div>

        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardFooter className="flex gap-2 justify-end items-end">
        <div className="flex gap-2 items-center justify-between w-full">
          <span className="flex items-center gap-2 text-sm text-gray-500">
            {" "}
            <IoFlagOutline /> {task.dueDate}
          </span>
          <Badge
            variant="outline"
            className={`flex items-center gap-2 rounded-full border  ${priorityStyles}`}
          >
            {" "}
            {task.priority}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}
