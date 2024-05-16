// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { PlusIcon } from "@heroicons/react/24/solid";

// App
// -----------------------------------------------------------------------------
import { useGetBoardsListQuery, useCreateBoardMutation } from "src/api";
import { makeUrl } from "src/router";
import { List, Button, Loader } from "src/components";

const BoardListPage: FC = () => {
  const navigate = useNavigate();
  const getBoardListResult = useGetBoardsListQuery();
  const createBoardResult = useCreateBoardMutation();

  return (
    <div className="mx-auto flex max-w-[960px] flex-col gap-4 px-4 py-8">
      <div className="flex items-center">
        <div className="flex-grow text-2xl font-semibold">Your boards</div>
        <Button
          onClick={() => {
            const newName = prompt("CREATE NEW BOARD?");
            if (newName) {
              createBoardResult.mutate({ name: newName });
            }
          }}
        >
          <PlusIcon className="size-5" /> Create new
        </Button>
      </div>

      {getBoardListResult.isPending ? (
        <Loader />
      ) : getBoardListResult.isError ? (
        <div>ERROR</div>
      ) : getBoardListResult.data.count === 0 ? (
        <div>NO DATA</div>
      ) : (
        <List
          items={getBoardListResult.data.items}
          onClick={(item) => {
            navigate(makeUrl("board", { id: item.id }));
          }}
          renderItem={(item) => {
            return (
              <>
                <div className="flex-1 px-5 py-3">{item.name}</div>
                <div className="flex-1 px-5  py-3">
                  updated {dayjs().from(item.updatedAt)}
                </div>
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default BoardListPage;
