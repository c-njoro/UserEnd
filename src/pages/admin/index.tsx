import dynamic from "next/dynamic";
import withAuth from "./Authentication";

const AdminPanel = dynamic(() => import("./AdminPanel"), {
  ssr: false,
});

const AdminPage = () => {
  return <AdminPanel />;
};

export default withAuth(AdminPage);
