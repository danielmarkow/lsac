import { type NextPage } from "next";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

import CreateCommentLink from "~/components/CreateCommentLink";
import ListCommentLink from "~/components/ListCommentLink";
// import Loading from "~/components/common/Loading";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (!userLoaded) return <div />;

  return (
    <>
      <main>
        {!isSignedIn && (
          <div className="flex min-h-screen flex-col items-center justify-center">
            <h1>LSAC - Link Saver and Commenter</h1>
            <SignInButton />
          </div>
        )}
        {isSignedIn && (
          <div>
            <CreateCommentLink />
            <ListCommentLink />
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
