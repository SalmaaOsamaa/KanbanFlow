import type Task from "../domain-models/tasks";
import { instance } from "./instance";

interface RequestFetchAllTasksArgs {
    
    options?:{
        signal:AbortSignal;
    }
}
interface RequestFetchAllTasksResult {
data : Task[]
}

interface RequestUpdateTaskArgs {
  taskId: string;
  updates: Partial<Task>;
}

interface RequestUpdateTaskResult {
  data: Task;
}

interface RequestAddTaskArgs {
  task: Task;
}

interface RequestAddTaskResult {
  data: Task;
}



const requestFetchAllTasks = async ({
    options,
  }: RequestFetchAllTasksArgs): Promise<RequestFetchAllTasksResult> => {
    const { data } = await instance.get<Task[]>(`/tasks`, {
      signal: options?.signal,
    });
  
    return { data };
  };
  const requestAddTask = async ({
    task,
  }: RequestAddTaskArgs): Promise<RequestAddTaskResult> => {
    const { data } = await instance.post<Task>(`/tasks`, task);
    
    return { data };
  };
const requestUpdateTask = async ({
  taskId,
  updates,
}: RequestUpdateTaskArgs): Promise<RequestUpdateTaskResult> => {
  const { data } = await instance.patch<Task>(`/tasks/${taskId}`, updates);
  
  return { data };
};

export { requestFetchAllTasks, requestUpdateTask, requestAddTask };