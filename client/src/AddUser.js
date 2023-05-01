import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const ADD_USER = gql`
  mutation createNewUser($createUser: createUserInput!) {
    createUser(input: $createUser) {
      name
      age
      nationality
    }
  }
`;

function AddUser(props) {
  const [state, setState] = useState({});
  const [createUser] = useMutation(ADD_USER, {
    variables: {
      createUser: {
        name: state.name,
        age: +state.age,
        nationality: state.nationality,
      },
    },
    onCompleted: (data) => {
        console.log(data);
      props.refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleChange = (e) => {
    if (e.target.type === "radio") {
      setState((prev) => ({ ...prev, [e.target.name]: e.target.id }));
    } else {
      setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  return (
    <>
      <div onChange={handleChange}>
        <input placeholder="Name" name="name" />
        <br />
        <br />
        <input placeholder="age" type="number" name="age" />
        <br />
        <br />
        <input
          placeholder="nationality"
          id="INDIA"
          type="radio"
          name="nationality"
        />
        <label for="INDIA">INDIA</label>
        <br></br>
        <input
          placeholder="nationality"
          id="CHINA"
          type="radio"
          name="nationality"
        />
        <label for="CHINA">CHINA</label>
      </div>
      <br></br>
      <button onClick={createUser}>Add User</button>
    </>
  );
}

export default AddUser;
