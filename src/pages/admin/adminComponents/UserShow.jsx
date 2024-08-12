// ProductShow.js
import {
  DateField,
  EmailField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="role" />
      <TextField source="isActive" />
      <DateField source="dateOfBirth" />
      <TextField source="__v" />
    </SimpleShowLayout>
  </Show>
);

export default UserShow;
