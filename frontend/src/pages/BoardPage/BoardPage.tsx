// Lib
// -----------------------------------------------------------------------------
import { FC, useState } from "react";

// App
// -----------------------------------------------------------------------------
import { useGetBoardFullQuery } from "src/api";
import { useIdParam } from "src/hooks";
import { Loader } from "src/components";
import { Section } from "./components";

const BoardPage: FC = () => {
  const id = useIdParam();

  const [sectionWithOpenTaskEditorId, setSectionWithOpenTaskEditorId] =
    useState<number | null>(null);

  const result = useGetBoardFullQuery({ id });

  return (
    <div className="flex flex-col gap-4 p-8">
      {result.isPending ? (
        <Loader />
      ) : result.isError ? (
        <div>Error</div>
      ) : (
        <>
          <div className="text-2xl font-semibold">{result.data.name}</div>

          <div className="flex gap-4">
            {result.data.sections.map((section) => (
              <Section
                key={section.id}
                section={section}
                boardId={result.data.id}
                hasEditor={sectionWithOpenTaskEditorId === section.id}
                attachEditor={() => {
                  setSectionWithOpenTaskEditorId(section.id);
                }}
                detachEditor={() => {
                  setSectionWithOpenTaskEditorId(null);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BoardPage;
