// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import clsx from "clsx";
import { PlusIcon } from "@heroicons/react/24/solid";

// App
// -----------------------------------------------------------------------------
import { useGetBoardsListQuery, useCreateBoardMutation } from "src/api";
import { makeUrl } from "src/router";

const BoardListPage: FC = () => {
  const navigate = useNavigate();
  const getBoardListResult = useGetBoardsListQuery();
  const createBoardResult = useCreateBoardMutation();

  return (
    <div className="mx-auto flex max-w-[960px] flex-col gap-4 px-4 py-8">
      <div className="flex items-center">
        <div className="flex-grow text-2xl font-semibold">Your boards</div>
        <button
          className="flex items-center gap-2 rounded bg-slate-600 px-3 py-2 text-white shadow transition-colors hover:bg-slate-700"
          onClick={() => {
            const newName = prompt("CREATE NEW BOARD?");
            if (newName) {
              createBoardResult.mutate({ name: newName });
            }
          }}
        >
          <PlusIcon className="size-5" /> Create new
        </button>
      </div>

      {getBoardListResult.isPending ? (
        <div>LOADING...</div>
      ) : getBoardListResult.isError ? (
        <div>ERROR</div>
      ) : getBoardListResult.data.count === 0 ? (
        <div>NO DATA</div>
      ) : (
        <div className="rounded bg-white shadow">
          {getBoardListResult.data.items.map((item, index) => (
            <div
              className={clsx(
                "flex cursor-pointer  transition-colors hover:bg-slate-50",
                index !== getBoardListResult.data.items.length - 1 &&
                  "border-b border-solid border-b-slate-300",
                index === 0 && "rounded-t",
                index === getBoardListResult.data.items.length - 1 &&
                  "rounded-b",
              )}
              key={item.id}
              onClick={() => {
                navigate(makeUrl("board", { id: item.id }));
              }}
            >
              <div className="flex-1 px-5 py-3">{item.name}</div>

              <div className="flex-1 px-5  py-3">
                updated {dayjs().from(item.updatedAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardListPage;
