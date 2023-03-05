import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import DarkButton from "./common/DarkButton";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";

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

  const createLinkCommentMutation =
    api.linkComment.createLinkComment.useMutation({
      onSuccess: () => {
        reset();
        utils.linkComment.getLinkComment.invalidate();
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="w-screen">
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
            <div className="ml-5 w-screen">
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
            Submit
          </DarkButton>
        </form>
      </div>
    </>
  );
}
