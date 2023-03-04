import { type NextPage } from "next";
import DarkButton from "~/components/common/DarkButton";

import { signIn, signOut, useSession } from "next-auth/react";
import CreateCommentLink from "~/components/CreateCommentLink";
import ListCommentLink from "~/components/ListCommentLink";

// import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <main>
        {!sessionData ? (
          <div className="flex min-h-screen flex-col items-center justify-center">
            <h1>LSAC - Link Saver and Commenter</h1>
            <DarkButton className="mt-5" onClick={() => void signIn()}>
              Login
            </DarkButton>
          </div>
        ) : (
          <>
            <div className="container w-screen">
              <CreateCommentLink />
              <ListCommentLink />
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };