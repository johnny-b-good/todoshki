// Lib
// -----------------------------------------------------------------------------
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { PlusIcon } from "@heroicons/react/24/outline";

// App
// -----------------------------------------------------------------------------
import {
  useGetBoardsListQuery,
  useCreateBoardWithDefaultSectionsMutation,
} from "src/api";
import { makeUrl } from "src/router";
import { List, Button, Loader, Dialog, Input, Page } from "src/components";

const BoardListPage: FC = () => {
  const navigate = useNavigate();
  const getBoardListResult = useGetBoardsListQuery();
  const createBoardResult = useCreateBoardWithDefaultSectionsMutation();

  const [isBoardCreationDialogOpen, setIsBoardCreationDialogOpen] =
    useState(false);

  const [newBoardName, setNewBoardName] = useState("");

  return (
    <Page
      title="Your boards"
      titleExtra={
        <Button
          onClick={() => {
            setIsBoardCreationDialogOpen(true);
          }}
        >
          <PlusIcon className="size-4" /> Create new
        </Button>
      }
    >
      {getBoardListResult.isPending ? (
        <Loader />
      ) : getBoardListResult.isError ? (
        <div>ERROR</div>
      ) : getBoardListResult.data.count === 0 ? (
        <div>NO DATA</div>
      ) : (
        <div className="overflow-y-auto px-1">
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
        </div>
      )}

      <Dialog
        title="Create new board"
        description="Please enter new board's name:"
        open={isBoardCreationDialogOpen}
        onCancel={() => {
          setNewBoardName("");
          setIsBoardCreationDialogOpen(false);
        }}
        onOk={() => {
          if (newBoardName) {
            void createBoardResult
              .mutateAsync({ name: newBoardName })
              .then(() => {
                setNewBoardName("");
                setIsBoardCreationDialogOpen(false);
              });
          }
        }}
        width="500px"
      >
        <Input
          placeholder="New board"
          value={newBoardName}
          onChange={(ev) => {
            setNewBoardName(ev.target.value);
          }}
        />
      </Dialog>
    </Page>
  );
};

export default BoardListPage;
