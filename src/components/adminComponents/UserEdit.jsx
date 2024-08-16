// ProductEdit.js
import { Edit, SimpleForm, TextInput } from "react-admin";

const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="profilePicture" />
      <TextInput source="email" />
      <TextInput source="role" />
    </SimpleForm>
  </Edit>
);

export default ProductEdit;
