// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { Link } from "react-router-dom";

// App
// -----------------------------------------------------------------------------
import { useGetBoardsListQuery, useCreateBoardMutation } from "src/api";
import { makeUrl } from "src/router";

const BoardListPage: FC = () => {
  const getBoardListResult = useGetBoardsListQuery();
  const createBoardResult = useCreateBoardMutation();

  return (
    <div>
      <h1>BOARDS</h1>
      <div>
        <button
          onClick={() => {
            const newName = prompt("CREATE NEW BOARD?");
            if (newName) {
              createBoardResult.mutate({ name: newName });
            }
          }}
        >
          CREATE
        </button>
      </div>

      {getBoardListResult.isPending ? (
        <div>LOADING...</div>
      ) : getBoardListResult.isError ? (
        <div>ERROR</div>
      ) : getBoardListResult.data.count === 0 ? (
        <div>NO DATA</div>
      ) : (
        <ul>
          {getBoardListResult.data.items.map((item) => (
            <li key={item.id}>
              <Link
                to={makeUrl("board", { id: item.id })}
                className="text-blue-500 underline"
              >
                Board {item.id}: {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BoardListPage;
