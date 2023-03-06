import { api } from "~/utils/api";
import DarkButton from "./common/DarkButton";
import DropDown from "./common/DropDown";

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
            <div key={cl.id} className="flex justify-between">
              <div>
                <li className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset">
                  <a href={cl.link} target="_blank">
                    {cl.link}
                  </a>
                  <div className="mt-1">
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {cl.comment}
                    </p>
                  </div>
                </li>
              </div>
              <div>
                <DropDown id={cl.id} />
              </div>
            </div>
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
