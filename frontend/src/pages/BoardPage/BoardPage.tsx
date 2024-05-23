// Lib
// -----------------------------------------------------------------------------
import { FC, useState } from "react";

// App
// -----------------------------------------------------------------------------
import { useGetBoardFullQuery } from "src/api";
import { useIdParam } from "src/hooks";
import { Page, Loader } from "src/components";
import { Section, SectionCreatingEditor } from "./components";

const BoardPage: FC = () => {
  const id = useIdParam();

  const [sectionWithOpenTaskEditorId, setSectionWithOpenTaskEditorId] =
    useState<number | null>(null);

  const getBoardFullResult = useGetBoardFullQuery({ id });

  return getBoardFullResult.isPending ? (
    <Loader />
  ) : getBoardFullResult.isError ? (
    <div>Error</div>
  ) : (
    <Page title={getBoardFullResult.data.name}>
      <div className="grid min-h-0 grid-flow-col items-start justify-start gap-4 overflow-x-auto overflow-y-hidden pb-4">
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
    </Page>
  );
};

export default BoardPage;
