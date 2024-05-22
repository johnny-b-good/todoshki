// Lib
// -----------------------------------------------------------------------------
import { FC, useState } from "react";

// App
// -----------------------------------------------------------------------------
import { useGetBoardFullQuery } from "src/api";
import { useIdParam } from "src/hooks";
import { Loader } from "src/components";
import { Section, SectionCreatingEditor } from "./components";

const BoardPage: FC = () => {
  const id = useIdParam();

  const [sectionWithOpenTaskEditorId, setSectionWithOpenTaskEditorId] =
    useState<number | null>(null);

  const getBoardFullResult = useGetBoardFullQuery({ id });

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

            <SectionCreatingEditor boardId={id} />
          </div>
        </>
      )}
    </div>
  );
};

export default BoardPage;
