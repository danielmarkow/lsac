import { api } from "~/utils/api";
import DarkButton from "./common/DarkButton";

const LIMIT = 10;

export default function ListCommentLink() {
  const {
    data: commentsLinks,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = api.linkComment.getLinkComment.useInfiniteQuery(
    { limit: LIMIT },
    {
      staleTime: 12000,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const flatCommentsLinks =
    commentsLinks?.pages.flatMap((page) => page.linkComments) ?? [];

  return (
    <>
      <div className="mt-1 border-2 border-dashed border-gray-200 p-1">
        <ul role="list" className="divide-y divide-gray-200">
          {flatCommentsLinks.map((cl) => (
            <li
              key={cl.id}
              className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50"
            >
              <a href={cl.link} target="_blank">
                {cl.link}
              </a>
              <div className="mt-1">
                <p className="line-clamp-2 text-sm text-gray-600">
                  {cl.comment}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {commentsLinks && flatCommentsLinks.length > 0 ? (
          <DarkButton
            onClick={() => {
              if (hasNextPage && !isFetching) {
                void fetchNextPage();
              }
            }}
            className="mt-2"
          >
            Fetch More!
          </DarkButton>
        ) : (
          <p className="text-gray-400">No links and comments yet</p>
        )}
      </div>
    </>
  );
}
