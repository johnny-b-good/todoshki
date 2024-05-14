// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";

// App
// -----------------------------------------------------------------------------
import { useGetBoardQuery } from "src/api";

const BoardPage: FC = () => {
  const result = useGetBoardQuery({ id: 1 });

  return (
    <div>
      {result.isPending ? (
        <div>Loading...</div>
      ) : result.isError ? (
        <div>Error</div>
      ) : (
        <h1>
          Board {result.data.id}: {result.data.name}
        </h1>
      )}
    </div>
  );
};

export default BoardPage;
