// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";

// App
// -----------------------------------------------------------------------------
import { useGetBoardsListQuery } from "src/api";

export const BoardListPage: FC = () => {
  const result = useGetBoardsListQuery();

  return (
    <div>
      <h1>BOARDS</h1>

      {result.isPending ? (
        <div>Loading...</div>
      ) : result.isError ? (
        <div>Error</div>
      ) : result.data.count === 0 ? (
        <div>No data</div>
      ) : (
        <ul>
          {result.data.items.map((item) => (
            <li key={item.id}>
              {item.id}: {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
