import { useParams } from "react-router-dom";

export const useIdParam = (): number => {
  const { id: idString } = useParams();

  const ERROR_MESSAGE = "Bad URL parameter";

  if (!idString) {
    throw new Error(ERROR_MESSAGE);
  }

  const parsedId = parseInt(idString);

  if (!Number.isInteger(parsedId)) {
    throw new Error(ERROR_MESSAGE);
  }

  return parsedId;
};
