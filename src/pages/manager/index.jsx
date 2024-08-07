import Link from "next/link";

const Dashboard = () => {
  return (
    <>
      <div>
        <h1>Manager's Dashboard</h1>
        <Link href="/manager/newData">
          <h3>Add New User / Product</h3>
        </Link>
        <Link href="/manager/updateProducts">
          <h3>Update Existing Product</h3>
        </Link>
        <Link href="/manager/stockManagement">
          <h3>Stock Management</h3>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
