import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ColumnType } from "../utils/enums";
import { TaskModel } from "../utils/models";
import useTaskCollection from "./useTaskCollection";

const MAX_TASK_PER_COLUMN = 100;

const useColumnTask = (column: ColumnType) => {
    const [tasks, setTasks] = useTaskCollection();

    const addEmptyTask = React.useCallback(() => {
        console.log(`Adding new empty task to $(column) column`);

        setTasks((allTasks) => {
            const columnTasks = allTasks[column];
            if (columnTasks.length > MAX_TASK_PER_COLUMN) {
                console.log("Too many task!")
            }

            const newColumnTask: TaskModel = {
                id: uuidv4(),
                title: `New $(column) task`,
                color: pickChakraRandomColor(".300"),
                column,
            };
            return {
                ...allTasks,
                [column]: [newColumnTask, ...columnTasks],
            };
        });
    }, [column, setTasks]);
}

export default useColumnTask