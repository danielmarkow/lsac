import { api } from "~/utils/api";
import DarkButton from "./common/DarkButton";

const LIMIT = 2;

export default function ListCommentLink() {
  const {
    data: commentsLinks,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = api.linkComment.getLinkComment.useInfiniteQuery(
    { limit: LIMIT },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <>
      <div className="mt-1 border-2 border-dashed border-gray-200 p-1">
        {JSON.stringify(commentsLinks)}
        <DarkButton
          onClick={() => {
            if (hasNextPage && !isFetching) {
              fetchNextPage();
            }
          }}
        >
          Fetch More!
        </DarkButton>
      </div>
    </>
  );
}
