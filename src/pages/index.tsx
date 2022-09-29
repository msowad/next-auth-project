import { withSession, WithSessionType } from "common/withSession";
import { NextPage } from "next";
import NextLink from "next/link";

interface Props {
  session: WithSessionType;
}

export const getServerSideProps = withSession((ctx, session) => {
  return { props: { session } };
});

const Index: NextPage<Props> = ({ session }) => {
  return (
    <div>
      {session ? (
        <>
          <h1>{session.user?.email}</h1>
          <NextLink href="/dashboard">Dashboard</NextLink>
        </>
      ) : (
        <NextLink href="/login">Login</NextLink>
      )}
    </div>
  );
};

export default Index;
