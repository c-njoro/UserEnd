import {
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  EmailField,
  List,
  Pagination,
  TextField,
} from "react-admin";

const ProductPagination = (props) => (
  <Pagination rowsPerPageOptions={[5]} {...props} />
);

const UserList = (props) => {
  return (
    <List {...props} pagination={<ProductPagination />} perPage={5}>
      <Datagrid>
        <TextField source="_id" />
        <TextField source="name" />
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="role" />
        <TextField source="isActive" />
        <DateField source="dateOfBirth" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default UserList;
