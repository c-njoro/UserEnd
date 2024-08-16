import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";

const AdminPanel = dynamic(() => import("./AdminPanel"), {
  ssr: false,
});

const AdminPage = () => {
  return <AdminPanel />;
};

export default AdminPage;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/sign",
        permanent: false,
      },
    };
  }

  //checks for admin role here
  if (session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
