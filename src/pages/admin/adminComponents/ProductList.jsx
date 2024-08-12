import {
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  List,
  Pagination,
  TextField,
} from "react-admin";

const ProductPagination = (props) => (
  <Pagination rowsPerPageOptions={[5]} {...props} />
);

const ProductList = (props) => {
  return (
    <List {...props} pagination={<ProductPagination />} perPage={5}>
      <Datagrid>
        <TextField source="_id" />
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="stock" />
        <TextField source="price" />
        <DateField source="createdAt" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default ProductList;
