// Lib
// -----------------------------------------------------------------------------
import { FC, useState, useCallback, KeyboardEvent } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useClickAway } from "@uidotdev/usehooks";

// App
// -----------------------------------------------------------------------------
import { useCreateSectionMutation } from "src/api";
import { Input, Button } from "src/components";

// Props
// -----------------------------------------------------------------------------
export interface SectionCreatingEditorProps {
  boardId: number;
}

/** Section creating editor component */
export const SectionCreatingEditor: FC<SectionCreatingEditorProps> = ({
  boardId,
}) => {
  const createSectionResult = useCreateSectionMutation();

  const [newSectionName, setNewSectionName] = useState<string>("");

  const [isSectionEditorOpen, setIsSectionEditorOpen] =
    useState<boolean>(false);

  const resetEditor = useCallback(() => {
    setNewSectionName("");
    setIsSectionEditorOpen(false);
  }, []);

  const createSection = useCallback(() => {
    if (newSectionName) {
      void createSectionResult
        .mutateAsync({
          boardId,
          name: newSectionName,
          order: 0,
          role: "todo",
        })
        .then(() => {
          resetEditor();
        });
    } else {
      resetEditor();
    }
  }, [boardId, createSectionResult, newSectionName, resetEditor]);

  const ref = useClickAway<HTMLDivElement>(createSection);

  const onKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.code === "Enter") {
        createSection();
      } else if (ev.code === "Escape") {
        resetEditor();
      }
    },
    [createSection, resetEditor],
  );

  return isSectionEditorOpen ? (
    <div
      className="flex w-64 flex-none flex-col gap-2 rounded bg-slate-200 p-2 shadow"
      ref={ref}
    >
      <Input
        placeholder="New section"
        value={newSectionName}
        onChange={(ev) => {
          setNewSectionName(ev.target.value);
        }}
        autoFocus
        autoComplete="off"
        onKeyDown={onKeyDown}
      />

      <div className="flex gap-2">
        <Button variant="primary" onClick={createSection}>
          Create section
        </Button>

        <Button variant="text" onClick={resetEditor} title="Cancel">
          <XMarkIcon className="size-5" />
        </Button>
      </div>
    </div>
  ) : (
    <Button
      onClick={() => {
        setIsSectionEditorOpen(true);
      }}
    >
      <PlusIcon className="size-4" /> Create section
    </Button>
  );
};
