import { useCallback, useEffect, useReducer } from "react";
import type Task from "../../domain-models/tasks";
import { requestFetchAllTasks } from "../../network/tasks";

interface State {
  isLoading: boolean;
  data: Task[];
  filters : {
    searchText: string;
  };
  error: unknown;
}

type Action =
  | {
      type: "FETCH_ALL_START";
    }
  | {
      type: "FETCH_ALL_SUCCESS";
      data: Task[];
    }
  | {
      type: "FETCH_ALL_ERROR";
      error: unknown;
    } | {
      type: "ADD_TASK";
      task: Task;
    }
  | {
      type: "UPDATE_TASK";
      taskId: string;
      updates: Partial<Task>;
    } |
    {
        type:"CHANGE_FILTERS";
        newFilters: {
            searchText: string;
        };
    } | {
        type:"DELETE_SINGLE_TASK"
        taskId: string;
    }

  
type ActionHandlers = {
  [key in Action["type"]]: (
    state: State,
    action: Extract<Action, { type: key }>
  ) => State;
};

const initialState: State = {
  isLoading: false,
  data: [],
  error: null,
  filters: {
    searchText: "",
  },
};

const actionHandlers: ActionHandlers = {
  FETCH_ALL_START: (state, _action) => ({
    ...state,
    isLoading: true,
    data: [],
    error: null,
  }),
  FETCH_ALL_SUCCESS: (state, { data }) => ({
    ...state,
    isLoading: false,
    data,
  }),
  FETCH_ALL_ERROR: (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }),
  CHANGE_FILTERS: (state, { newFilters }) => ({
    ...state,
    filters:{
        ...state.filters,
        ...newFilters,
    },
  }),
  ADD_TASK: (state, { task }) => ({
    ...state,
    data: [...state.data, task],
  }),
  UPDATE_TASK: (state, { taskId, updates }) => ({
    ...state,
    data: state.data.map((task) =>
      task.id === taskId ? { ...task, ...updates } : task
    ),
  }),
  DELETE_SINGLE_TASK: (state, { taskId }) => ({
    ...state,
    data: state.data.filter((task) => task.id !== taskId),
  }),
};

function reducer(state: State = initialState, action: Action): State {
  return actionHandlers[action.type]?.(state, action as any) || state;
}

const useAllTasks = () => {
  const [{ isLoading, data, error, filters}, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchAllTasks = useCallback(() => {
    const controller = new AbortController();

    dispatch({ type: "FETCH_ALL_START" });

    requestFetchAllTasks({
      options: {
        signal: controller.signal,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "FETCH_ALL_SUCCESS",
          data: data,
        });
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return false;
        }
        dispatch({ type: "FETCH_ALL_ERROR", error });
      });
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

const changeFilters = useCallback((newFilters: { searchText: string }) => {
  dispatch({
    type: "CHANGE_FILTERS",
    newFilters,
  });
}, []);
const addTask = useCallback((task: Task) => {
  dispatch({
    type: "ADD_TASK",
    task,
  });
}, []);
  const updateTaskOptimistically = useCallback((taskId: string, updates: Task) => {
    dispatch({
      type: "UPDATE_TASK",
      taskId,
      updates,
    });
  }, []);
const deleteSingleTask = useCallback((taskId: string) => {
  dispatch({
    type: "DELETE_SINGLE_TASK",
    taskId,
  });
}, []);
  return {
    isLoading,
    tasksList: data,
    error,
    refetch: fetchAllTasks,
    changeFilters,
    filters: filters,
    updateTaskOptimistically,
    deleteSingleTask,
    addTask,
  };
};

export { useAllTasks };