import { useMemo, useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { FaSearch } from "react-icons/fa";
import { Column } from "../Column";
import { Separator } from "../../components/ui/separator";
import { useAllTasks } from "./useAllTasks";
import { requestAddTask, requestUpdateTask,  } from "../../network/tasks";
import type Task from "../../domain-models/tasks";
import { DashboardBreadcrumb } from "../../components/DashboardBreacrumb";
import useDebounce from "../../hooks/useDebounce";

interface ColumnConfig {
    id: string;
    title: string;
    columnKey: string;
    color: string;
}

const columnsConfig: ColumnConfig[] = [
    {
        id: "1",
        title: "todo",
        columnKey: "todo",
        color: "bg-yellow-500",
    },
    {
        id: "2",
        title: "in progress",
        columnKey: "in progress",
        color: "bg-blue-500",
    },
    {
        id: "3",
        title: "done",
        columnKey: "done",
        color: "bg-green-500",
    },
    {
        id: "4",
        title: "blocked",
        columnKey: "blocked",
        color: "bg-red-500",
    },
];

export default function DashboardPage() {
    const { tasksList, isLoading, addTask, updateTaskOptimistically, changeFilters, filters, deleteSingleTask } = useAllTasks();
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        console.log("tasksList changes", tasksList);
    }, [tasksList]);
    const debouncedSearchValue = useDebounce(searchValue, 300);

    useEffect(() => {
        changeFilters({ searchText: debouncedSearchValue });
    }, [debouncedSearchValue, changeFilters]);

    const tasksByColumn = useMemo(() => {
        const grouped: Record<string, Task[]> = {};

        columnsConfig.forEach((config) => {
            grouped[config.columnKey] = [];
        });

        tasksList?.forEach((task) => {
            const columnKey = task.column?.toLowerCase();
            if (grouped[columnKey]) {
                grouped[columnKey].push(task);
            }
        });
        return grouped;
    }, [tasksList]);

  const handleAddTask = (task: Task, column: string) => {
    const newTask = {
        id: crypto.randomUUID(),
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        column, 
      } as Task;
    addTask(newTask);
    requestAddTask({
      task: newTask,
    }).catch((error) => {
      console.error("Failed to add task:", error);
    });
  };
    const handleDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const sourceColumn = columnsConfig.find((col) => col.id === source.droppableId);
        const destColumn = columnsConfig.find((col) => col.id === destination.droppableId);

        if (!sourceColumn || !destColumn) {
            return;
        }

        const sourceTasks = tasksByColumn[sourceColumn.columnKey] || [];

        const movedTask = sourceTasks[source.index];

        if (!movedTask) {
            return;
        }

        if (sourceColumn.columnKey !== destColumn.columnKey) {
            updateTaskOptimistically(movedTask.id, {
                column: destColumn.columnKey,
            } as Task);

            requestUpdateTask({
                taskId: movedTask.id,
                updates: {
                    column: destColumn.columnKey,
                },
            }).catch((error) => {
                console.error("Failed to update task:", error);
            });
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleEditTask = (taskId: string, updates: Task) => {
        updateTaskOptimistically(taskId, updates);
        requestUpdateTask({
            taskId,
            updates,
        }).catch((error) => {
            console.error("Failed to update task:", error);
        });
    };

   
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <DashboardBreadcrumb />
            <div className="flex justify-between mt-4 ">

                <div className="flex flex-col gap-2">
                    <h1 className="text-start text-2xl font-bold">Tasks</h1>
                    <p className="text-start text-sm text-gray-500">Keep track of your tasks and move them to the appropriate column.</p>
                </div>


                <div className="relative inline-flex items-center">
                    <FaSearch className="absolute left-3 text-gray-400 pointer-events-none" style={{ fontSize: '14px', lineHeight: '1.5' }} />
                    <input
                        type="text"
                        placeholder="search..."
                        className="pl-10 pr-2 py-0 border border-[#D4D4D4] focus:outline-none rounded-md h-10 text-sm"
                        value={searchValue}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <Separator orientation="horizontal" className="mt-4" />

            <div className="mt-6 border rounded-sm p-4 gap-4">
                {isLoading ? (
                    <div className="text-center py-8">Loading tasks...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-start gap-4">
                        {columnsConfig.map((column) => (
                            <Column
                                key={column.id}
                                cardId={column.id}
                                title={column.title}
                                tasks={tasksByColumn[column.columnKey] || []}
                                color={column.color}
                                onAddTask={(task) => handleAddTask(task, column.columnKey)}
                                filters={filters}
                                onEditTask={handleEditTask}
                                deleteSingleTask={deleteSingleTask}
                            />
                        ))}
                    </div>
                )}
            </div>
        </DragDropContext>
    );
}
