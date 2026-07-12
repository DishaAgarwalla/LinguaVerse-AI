import { useEffect, useState } from "react";

import WelcomeCard from "./WelcomeCard";
import FeatureGrid from "./FeatureGrid";

import { getMe } from "../../services/userService";

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <WelcomeCard name={user?.name} />

      <div className="mt-8">
        <FeatureGrid />
      </div>
    </>
  );
};

export default Dashboard;