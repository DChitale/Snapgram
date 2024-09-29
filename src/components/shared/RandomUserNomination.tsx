import React, { useState, useEffect } from 'react';
import { Client, Databases, Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

// Define a type for the user
interface User extends Models.Document {
  name: string;
  username: string;
  imageUrl?: string;
}

const RandomUserNomination: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [nominatedUser, setNominatedUser] = useState<User | null>(null);

  // Initialize Appwrite client
  const client = new Client()
    .setEndpoint('https://[YOUR_APPWRITE_ENDPOINT]')
    .setProject('YOUR_PROJECT_ID');
  
  const databases = new Databases(client);

  // Fetch users from Appwrite database
  const fetchUsers = async () => {
    try {
      const response = await databases.listDocuments<User>('users_collection_id');
      setUsers(response.documents);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  // Select random user
  const nominateRandomUser = () => {
    if (users.length > 0) {
      const randomIndex = Math.floor(Math.random() * users.length);
      const randomUser = users[randomIndex];
      setNominatedUser(randomUser);
    }
  };

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();

    // Nominate a user at the end of each month
    const currentDate = new Date();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const timeUntilLastDay = lastDayOfMonth.getTime() - currentDate.getTime();

    const timer = setTimeout(() => {
      nominateRandomUser();
    }, timeUntilLastDay);

    return () => clearTimeout(timer);
  }, [users]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h1 className="text-xl font-semibold">Nominate a Random User</h1>
      {nominatedUser ? (
        <Link to={`/profile/${nominatedUser.$id}`} className="user-card mt-4">
          <img
            src={nominatedUser.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt="Nominated User"
            className="rounded-full w-14 h-14"
          />
          <div className="flex-center flex-col gap-1 mt-2">
            <p className="base-medium text-light-1 text-center line-clamp-1">
              {nominatedUser.name}
            </p>
            <p className="small-regular text-light-3 text-center line-clamp-1">
              @{nominatedUser.username}
            </p>
          </div>
          <Button type="button" size="sm" className="shad-button_secondary px-5 mt-2">
            Follow
          </Button>
        </Link>
      ) : (
        <p className="mt-4">Waiting to nominate a user at the end of the month...</p>
      )}
    </div>
  );
};

export default RandomUserNomination;
