import Link from "next/link";
import { api } from "~/utils/api";
import DarkButton from "./common/DarkButton";
import DropDown from "./common/DropDown";
import LoadingButton from "./common/LoadingButton";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%dy",
  },
});

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
      refetchOnWindowFocus: false,
    }
  );

  const flatCommentsLinks =
    commentsLinks?.pages.flatMap((page) => page.linkComments) ?? [];

  return (
    <>
      <div className="mt-1 rounded-lg border border-gray-300 p-1 shadow-sm">
        <ul role="list" className="divide-y divide-gray-200">
          {flatCommentsLinks.map((cl) => (
            <li
              key={cl.id}
              className="relative bg-white px-4 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 hover:bg-gray-50"
            >
              <div className="flex justify-between space-x-3">
                <div className="min-w-0 flex-1">
                  <Link
                    href={cl.link}
                    target="_blank"
                    className="block focus:outline-none"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="truncate text-sm font-medium text-gray-900">
                      {cl.link}
                    </p>
                    {/* <p className="truncate text-sm text-gray-500">{message.subject}</p> */}
                  </Link>
                </div>
                <time
                  dateTime={cl.createdAt.toISOString()}
                  className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                >
                  {dayjs(cl.createdAt).fromNow()}
                </time>
                <DropDown id={cl.id} />
              </div>
              <div className="mt-1">
                <p className="line-clamp-2 text-sm text-gray-600">
                  {cl.comment}
                </p>
              </div>
            </li>
          ))}
          {commentsLinks && flatCommentsLinks.length === 0 && (
            <li className="relative bg-white px-4 py-5 ">
              <div className="flex justify-between space-x-3">
                <div className="min-w-0 flex-1">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="truncate text-sm font-medium text-gray-900">
                    No links yet
                  </p>
                </div>
              </div>
            </li>
          )}
        </ul>
        {commentsLinks && flatCommentsLinks.length > 0 && (
          <DarkButton
            onClick={() => {
              if (hasNextPage && !isFetching) {
                void fetchNextPage();
              }
            }}
            className="mt-2 mb-2"
          >
            {!isFetching ? "Fetch More!" : <LoadingButton />}
          </DarkButton>
        )}
      </div>
      {/* <div className="mt-1 rounded-lg border-2 border-gray-300 p-1 shadow-sm">
        <ul role="list" className="divide-y divide-gray-200">
          {flatCommentsLinks.map((cl) => (
            <div key={cl.id} className="flex justify-between">
              <div className="truncate">
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
        {commentsLinks && flatCommentsLinks.length === 0 && (
          <p className="text-gray-400">No links and comments yet</p>
        )}
      </div>
      {commentsLinks && flatCommentsLinks.length > 0 && (
        <DarkButton
          onClick={() => {
            if (hasNextPage && !isFetching) {
              void fetchNextPage();
            }
          }}
          className="mt-2 mb-2"
        >
          {!isFetching ? "Fetch More!" : <LoadingButton />}
        </DarkButton>
      )} */}
    </>
  );
}
