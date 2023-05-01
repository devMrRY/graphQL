import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import AddUser from "./AddUser";

const QUERY_ALL_USERS = gql`
  query getAllUsers {
    users {
      ... on UserSuccessResult {
        users {
          id
          name
          age
          nationality
        }
      }

      ... on UserError {
        message
      }
    }
  }
`;

const QUERY_USER_BY_NAME = gql`
  query getUserByName($name: String!) {
    userByName(name: $name) {
      id
      name
      age
      nationality
    }
  }
`;

function DisplayUsers() {
  const [userList, setUserList] = useState([]);
  const [fetchUserByName, { data: userData, error: userError }] =
    useLazyQuery(QUERY_USER_BY_NAME);

  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);

  useEffect(() => {
    setUserList(data);
  }, [data]);

  useEffect(() => {
    if (userData) {
      setUserList({ users: { users: userData.userByName } });
    }
  }, [userData]);

  if (loading) {
    <div>...loading</div>;
  }
  if (error || userError) {
    <h4>SOMETHING WENT WRONG</h4>;
  }
  return (
    <div>
      <AddUser refetch={refetch} />
      <br />
      <br />
      <input
        placeholder="search user..."
        onChange={(e) =>
          fetchUserByName({ variables: { name: e.target.value } })
        }
      />
      <br />
      <br />
      {userList?.users?.users?.map((user) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            border: "0.1px solid black",
          }}
          id={user.id}
        >
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>Nationality: {user.nationality}</p>
        </div>
      ))}
    </div>
  );
}

export default DisplayUsers;
