import {
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  List,
  Pagination,
  TextField,
} from "react-admin";

import { Filter, NumberInput, SelectInput, TextInput } from "react-admin";

const ProductFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search by name" source="name" alwaysOn />
    <NumberInput label="Search by price" source="price" />
    <NumberInput label="Search by stock" source="stock" />

    <SelectInput
      label="category"
      source="category"
      choices={[
        { id: "Electronics", name: "Electronics" },
        { id: "Cameras", name: "Cameras" },
        { id: "Laptops", name: "Laptops" },
        { id: "Accessories", name: "Accessories" },
        { id: "Headphones", name: "Headphones" },
        { id: "Sports", name: "Sports" },
      ]}
    />
  </Filter>
);

const ProductPagination = (props) => (
  <Pagination rowsPerPageOptions={[5]} {...props} />
);

const ProductList = (props) => {
  return (
    <List
      {...props}
      pagination={<ProductPagination />}
      perPage={5}
      filters={<ProductFilter />}
    >
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
