import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import DarkButton from "./common/DarkButton";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

import { toast } from "react-hot-toast";

import type { InfiniteData } from "@tanstack/react-query";

import LoadinButton from "./common/LoadingButton";

const schema = z.object({
  url: z.string().url(),
  comment: z.string(),
});

export default function CreateCommentLink() {
  type FormValues = {
    url: string;
    comment: string;
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const utils = api.useContext();

  type LinkComment = {
    id: string;
    link: string;
    comment: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };

  const createLinkCommentMutation =
    api.linkComment.createLinkComment.useMutation({
      onSuccess: (newData) => {
        reset();
        utils.linkComment.getLinkComment.setInfiniteData(
          { limit: 10 },
          (oldData) => {
            const newRet = {
              pages: [
                {
                  linkComments: [
                    newData,
                    ...(oldData?.pages[0]?.linkComments as LinkComment[]),
                  ],
                  nextCursor: oldData?.pages[0]?.nextCursor,
                },
                ...(oldData?.pages.slice(1) as {
                  linkComments: LinkComment[];
                  nextCursor: string | undefined;
                }[]),
              ],
            };

            return newRet as
              | InfiniteData<RouterOutputs["linkComment"]["getLinkComment"]>
              | undefined;
          }
        );
      },
      onError: () => void toast.error("error saving link and comment"),
    });

  const onSubmit = (data: FieldValues) => {
    createLinkCommentMutation.mutate(data as FormValues);
  };

  return (
    <>
      <div className="mt-1 border-2 border-dashed border-gray-200 p-1">
        <h2 className="text-lg font-medium text-gray-500">Create</h2>
        {/* eslint-disable-next-line */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-1">
            <div className="w-screen md:w-1/3">
              <label
                htmlFor="link-url"
                className="mt-1 block text-sm font-medium text-gray-700"
              >
                Url
              </label>
              <input
                type="text"
                id="link-url"
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                {...register("url")}
              />
              {errors && (
                <p className="mt-2 text-sm text-red-600" id="link-url-error">
                  {errors.url?.message as string}
                </p>
              )}
            </div>
            <div className="w-screen md:w-1/2">
              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Comment
              </label>
              <textarea
                id="comment"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:py-1.5 sm:text-sm sm:leading-6"
                rows={4}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    void handleSubmit(onSubmit)();
                  }
                }}
                {...register("comment")}
              />
              {errors && (
                <p className="mt-2 text-sm text-red-600" id="comment-error">
                  {errors.comment?.message as string}
                </p>
              )}
            </div>
          </div>
          <DarkButton className="mt-5" type="submit">
            {createLinkCommentMutation.isLoading ? <LoadinButton /> : "Submit"}
          </DarkButton>
        </form>
      </div>
    </>
  );
}
