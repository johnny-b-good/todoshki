// Lib
// -----------------------------------------------------------------------------
import { FC, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

// App
// -----------------------------------------------------------------------------
import { useGetBoardFullQuery, useCreateSectionMutation } from "src/api";
import { useIdParam } from "src/hooks";
import { Loader, Input, Button, Select, Label, Field } from "src/components";
import { Section } from "./components";

const BoardPage: FC = () => {
  const id = useIdParam();

  const [sectionWithOpenTaskEditorId, setSectionWithOpenTaskEditorId] =
    useState<number | null>(null);

  const [isSectionEditorOpen, setIsSectionEditorOpen] =
    useState<boolean>(false);

  const [newSectionName, setNewSectionName] = useState<string>("");

  const [newSectionRole, setNewSectionRole] = useState<string>("");

  const getBoardFullResult = useGetBoardFullQuery({ id });

  const createSectionResult = useCreateSectionMutation();

  return (
    <div className="flex flex-col gap-4 p-8">
      {getBoardFullResult.isPending ? (
        <Loader />
      ) : getBoardFullResult.isError ? (
        <div>Error</div>
      ) : (
        <>
          <div className="text-2xl font-semibold">
            {getBoardFullResult.data.name}
          </div>

          <div className="flex items-start gap-4 overflow-auto pb-4">
            {getBoardFullResult.data.sections.map((section) => (
              <Section
                key={section.id}
                section={section}
                boardId={getBoardFullResult.data.id}
                hasEditor={sectionWithOpenTaskEditorId === section.id}
                attachEditor={() => {
                  setSectionWithOpenTaskEditorId(section.id);
                }}
                detachEditor={() => {
                  setSectionWithOpenTaskEditorId(null);
                }}
              />
            ))}

            {isSectionEditorOpen ? (
              <div className="flex w-80 flex-col gap-4 rounded bg-slate-200 p-2 shadow">
                <Field>
                  <Label>Name</Label>
                  <Input
                    placeholder="New section"
                    value={newSectionName}
                    onChange={(ev) => {
                      setNewSectionName(ev.target.value);
                    }}
                    autoFocus
                  />
                </Field>

                <Field>
                  <Label>Role</Label>
                  <Select
                    value={newSectionRole}
                    onChange={(ev) => {
                      setNewSectionRole(ev.target.value);
                    }}
                    options={[
                      { label: "To do", value: "todo" },
                      { label: "In progress", value: "in_progress" },
                      { label: "Done", value: "done" },
                      { label: "Rejected", value: "rejected" },
                    ]}
                  />
                </Field>

                <div className="mt-4 flex gap-4 ">
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (newSectionName) {
                        void createSectionResult
                          .mutateAsync({
                            boardId: id,
                            name: newSectionName,
                            order: 0,
                            role: newSectionRole,
                          })
                          .then(() => {
                            setNewSectionName("");
                            setNewSectionRole("todo");
                            setIsSectionEditorOpen(false);
                          });
                      } else {
                        setNewSectionName("");
                        setNewSectionRole("todo");
                        setIsSectionEditorOpen(false);
                      }
                    }}
                  >
                    Create section
                  </Button>

                  <Button
                    onClick={() => {
                      setNewSectionName("");
                      setNewSectionRole("todo");
                      setIsSectionEditorOpen(false);
                    }}
                  >
                    Cancel
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
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BoardPage;
