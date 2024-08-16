// ProductCreate.js
import {
  Create,
  DateInput,
  PasswordInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <PasswordInput source="password" />
      <DateInput source="dateOfBirth" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
