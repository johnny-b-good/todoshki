// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";

// App
// -----------------------------------------------------------------------------
import { useGetBoardFullQuery } from "src/api";
import { useIdParam } from "src/hooks";

const BoardPage: FC = () => {
  const id = useIdParam();
  const result = useGetBoardFullQuery({ id });

  return (
    <div>
      {result.isPending ? (
        <div>Loading...</div>
      ) : result.isError ? (
        <div>Error</div>
      ) : (
        <h1>{result.data.name}</h1>
      )}
    </div>
  );
};

export default BoardPage;
