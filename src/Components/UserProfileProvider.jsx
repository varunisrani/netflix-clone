import { createContext, useContext, useState } from "react";

const UserProfileContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [selectedProfileId, setSelectedProfileId] = useState(() => {
    // Retrieve selectedProfileId from local storage on component mount
    const storedId = localStorage.getItem("selectedProfileId");
    return storedId ? JSON.parse(storedId) : null;
  });

  const updateUserProfile = (newProfileData) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      ...newProfileData,
    }));
  };

  const setSelectedProfile = (profileId) => {
    // Save selectedProfileId to local storage
    localStorage.setItem("selectedProfileId", JSON.stringify(profileId));
    setSelectedProfileId(profileId);
  };

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        selectedProfileId,
        setSelectedProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};
