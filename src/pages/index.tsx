import { useState } from "react";
import { type NextPage } from "next";

import { SignInButton, useUser, useClerk } from "@clerk/nextjs";

import CreateCommentLink from "~/components/CreateCommentLink";
import ListCommentLink from "~/components/ListCommentLink";
import DarkButton from "~/components/common/DarkButton";
import LinkDeletionModal from "~/components/LinkDeletionModal";

const Home: NextPage = () => {
  const { signOut } = useClerk();
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalLinkId, setModalLinkId] = useState<string>("");

  if (!userLoaded) return <div />;

  return (
    <>
      <main>
        {!isSignedIn && (
          <div className="flex min-h-screen flex-col items-center justify-center">
            <h1>LSAC - Link Saver and Commenter</h1>
            <SignInButton>
              <DarkButton>Sign In</DarkButton>
            </SignInButton>
          </div>
        )}
        {isSignedIn && (
          <div>
            <div className="mt-1 flex justify-between">
              <div>
                <p className="ml-1 mt-1 text-gray-300">
                  LSAC - Link Saver and Commenter
                </p>
              </div>
              <div>
                <DarkButton onClick={() => void signOut()}>Sign out</DarkButton>
              </div>
            </div>
            <CreateCommentLink />
            <ListCommentLink
              setModalOpen={setModalOpen}
              setModalLinkId={setModalLinkId}
            />
            <LinkDeletionModal
              open={modalOpen}
              id={modalLinkId}
              setOpen={setModalOpen}
              setId={setModalLinkId}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
