import { useUserInfoProvider } from "@/components/GlobalState";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const AdminPanel = dynamic(
  () => import("../../components/adminComponents/AdminPanel"),
  {
    ssr: false,
  }
);

const AdminPage = () => {
  const router = useRouter();
  const { userInfo } = useUserInfoProvider();

  if (!userInfo.loggedIn) {
    return (
      <div className="w-screen min-h-[calc(90vh)] flex flex-col justify-center items-center">
        <h1 className="text-3xl uppercase text-red-500 font-body font-bold">
          Not logged in
        </h1>
        <button
          onClick={() => router.push("/sign")}
          className="w-max h-max font-body text-base bg-black text-white shadow-lg px-5 py-2 rounded-full"
        >
          Log in
        </button>
      </div>
    );
  }

  if (userInfo.userData.role !== "admin") {
    return (
      <div className="w-screen min-h-[calc(90vh)] flex flex-col justify-center items-center">
        <h1 className="text-7xl uppercase text-red-500 font-body font-bold tracking-widest">
          !!! Not Unauthorized !!!
        </h1>
      </div>
    );
  }
  return <AdminPanel />;
};

export default AdminPage;
