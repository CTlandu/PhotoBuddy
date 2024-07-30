import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";

const Profile_test = () => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [userData, setUserData] = useState(null);
 
  useEffect(() => {
    const getUserMetadata = async () => {
      console.log("Auth0 State at useEffect call:", {
        user,
        isAuthenticated,
        getAccessTokenSilently,
        isLoading,
      });
      if (isLoading || !user || !isAuthenticated) {
        // 如果仍在加载或用户未登录，则等待
        return;
      }

      const domain = "dev-m5ocddyzhqndhe7x.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
        setUserData(user);
        console.log(user);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user, isAuthenticated, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      {isAuthenticated && user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>name: {user.name}</h2>
          <p>email: {user.email}</p>
          <p>sub: {user.sub}</p>
          <h3>User Metadata</h3>
          {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          ) : (
            "No user metadata defined"
          )}
        </div>
      )}
    </>
  );
};

export default Profile_test;