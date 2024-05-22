// Lib
// -----------------------------------------------------------------------------
import { FC, useState, useCallback, KeyboardEvent } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useClickAway } from "@uidotdev/usehooks";

// App
// -----------------------------------------------------------------------------
import { Button, Textarea } from "src/components";
import { useCreateTaskMutation } from "src/api";

// Props
// -----------------------------------------------------------------------------
export interface TaskCreatingEditorProps {
  sectionId: number;
  boardId: number;
  hasEditor: boolean;
  attachEditor: () => void;
  detachEditor: () => void;
}

/** Task creating editor component */
export const TaskCreatingEditor: FC<TaskCreatingEditorProps> = ({
  sectionId,
  boardId,
  hasEditor,
  attachEditor,
  detachEditor,
}) => {
  const createTaskResult = useCreateTaskMutation();

  const [newTaskContent, setNewTaskContent] = useState<string>("");

  const resetEditor = useCallback(() => {
    setNewTaskContent("");
    detachEditor();
  }, [detachEditor]);

  const createTask = useCallback(() => {
    if (newTaskContent) {
      void createTaskResult
        .mutateAsync({
          content: newTaskContent,
          sectionId,
          order: 0,
          boardId,
        })
        .then(() => {
          resetEditor();
        });
    } else {
      resetEditor();
    }
  }, [boardId, createTaskResult, newTaskContent, resetEditor, sectionId]);

  const ref = useClickAway<HTMLDivElement>(createTask);

  const onKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.code === "Enter") {
        createTask();
      } else if (ev.code === "Escape") {
        resetEditor();
      }
    },
    [createTask, resetEditor],
  );

  return hasEditor ? (
    <div className="flex w-60 flex-none flex-col gap-2" ref={ref}>
      <Textarea
        placeholder="New task"
        autoComplete="off"
        value={newTaskContent}
        onChange={(ev) => {
          setNewTaskContent(ev.target.value);
        }}
        autoFocus
        rows={3}
        onKeyDown={onKeyDown}
      />

      <div className="flex gap-2">
        <Button variant="primary" onClick={createTask}>
          Create task
        </Button>

        <Button variant="text" onClick={resetEditor} title="Cancel">
          <XMarkIcon className="size-5" />
        </Button>
      </div>
    </div>
  ) : (
    <Button onClick={attachEditor} variant="text">
      <PlusIcon className="size-4" /> Create task
    </Button>
  );
};
