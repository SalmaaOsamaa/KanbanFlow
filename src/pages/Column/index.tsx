import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Badge } from "../../components/ui/badge";
import { TaskItem } from "../TaskItem";
import type Task from "../../domain-models/tasks";
import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CreateTaskModal } from "../../components/CreateTaskModal";
interface ColumnProps {
  cardId: string;
  title: string;
  tasks: Task[];
  color: string;
  onAddTask: (task: Task) => void;
  onEditTask: (taskId: string, updates: Task) => void;
  filters :{
    searchText: string;
  }
  deleteSingleTask: (taskId: string) => void;
}

const TASKS_PER_PAGE = 3;

export function Column({ cardId, title, tasks, color, filters, onEditTask, deleteSingleTask, onAddTask }: ColumnProps) {
  const filteredTasks = useMemo(() => tasks.filter((task) => task.title.toLowerCase().includes(filters.searchText.toLowerCase())),[tasks, filters.searchText] );
  const [displayedCount, setDisplayedCount] = useState(TASKS_PER_PAGE);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayedCount(TASKS_PER_PAGE);
  }, [filteredTasks.length, filters.searchText]);

  useEffect(() => {
    const scrollElement = document.getElementById(`column-${cardId}`);
    if (scrollElement) {
      console.log('Scroll element found for column', cardId, scrollElement);
    } else {
      console.warn('Scroll element not found for column', cardId);
    }
  }, [cardId]);

  const displayedTasks = useMemo(() => {
    return filteredTasks.slice(0, displayedCount);
  }, [filteredTasks, displayedCount]);

  const hasMore = displayedCount < filteredTasks.length;

  const fetchMoreTasks = useCallback(async () => {
    console.log('fetchMoreTasks called', { displayedCount, totalTasks: filteredTasks.length });
    if (displayedCount < filteredTasks.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setDisplayedCount(prev => {
        const newCount = Math.min(prev + TASKS_PER_PAGE, filteredTasks.length);
        console.log('Updating displayedCount', { prev, newCount });
        return newCount;
      });
    }
  }, [displayedCount, filteredTasks.length]);


  return (
    <Droppable droppableId={cardId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`w-full min-h-[400px] border rounded-sm flex flex-col gap-4 transition-colors ${
            snapshot.isDraggingOver ? "bg-blue-50 border-blue-300" : "bg-white"
          }`}
        >
          <div
            className={`h-10 rounded-sm flex items-center justify-between px-4 text-white font-semibold 
                border
              ${color}`}
          >
            <div className="flex items-center gap-2">
              <span>{title}</span>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {tasks.length}
              </Badge>
            </div>
          <CreateTaskModal onAddTask={(task) => onAddTask(task)} />
          </div>
          <div className="flex-1 bg-[#F7F8FA] px-4 py-4 rounded-sm min-h-[200px]">
            {tasks.length === 0 ? (
              <div className="text-gray-400 text-center py-8 text-sm">
                Drop tasks here
              </div>
            ) : (
              <div 
                ref={scrollContainerRef}
                id={`column-${cardId}`} 
                className="flex flex-col gap-3 scrollbar-hide h-[600px] overflow-y-auto overflow-x-hidden"
              >
                <InfiniteScroll
                  key={`infinite-scroll-${cardId}-${displayedCount}`}
                  dataLength={displayedTasks.length}
                  next={fetchMoreTasks}
                  hasMore={hasMore}
                  loader={<div className="text-center py-2 text-sm text-gray-500">Loading more tasks...</div>}
                  scrollableTarget={`column-${cardId}`}
                  endMessage={null}
                  scrollThreshold={0.8}
                >
                  <div className="flex flex-col gap-3">
                    {displayedTasks.map((task, index) => (
                      <Draggable
                        key={`${cardId}-${task.id}`}
                        draggableId={`${cardId}-${task.id}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${
                              snapshot.isDragging
                                ? "opacity-50 rotate-2 shadow-lg"
                                : "opacity-100"
                            } transition-all`}
                          >
                            <TaskItem task={task} 
                             editingSingleTask={onEditTask}  deleteSingleTask={deleteSingleTask} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            )}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
