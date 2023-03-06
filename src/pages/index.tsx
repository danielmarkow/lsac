import { type NextPage } from "next";
import DarkButton from "~/components/common/DarkButton";

import { signIn, useSession } from "next-auth/react";
import CreateCommentLink from "~/components/CreateCommentLink";
import ListCommentLink from "~/components/ListCommentLink";
import Loading from "~/components/common/Loading";

const Home: NextPage = () => {
  const { status: sessionStatus } = useSession();

  return (
    <>
      <main>
        {sessionStatus === "unauthenticated" ? (
          <div className="flex min-h-screen flex-col items-center justify-center">
            <h1>LSAC - Link Saver and Commenter</h1>
            <DarkButton className="mt-5" onClick={() => void signIn()}>
              Login
            </DarkButton>
          </div>
        ) : sessionStatus === "authenticated" ? (
          <>
            <div className="container w-screen">
              <CreateCommentLink />
              <ListCommentLink />
            </div>
          </>
        ) : (
          <div className="flex min-h-screen flex-col items-center justify-center">
            <Loading />
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
