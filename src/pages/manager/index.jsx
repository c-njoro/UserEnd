const checkAuthStatus = async () => {
  try {
    const response = await fetch("/api/check-auth");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to check authentication status:", error);
    return false;
  }
};

const Dashboard = () => {
  return (
    <>
      <div>
        <h1>Manager's Dashboard</h1>
      </div>
    </>
  );
};

export default Dashboard;
