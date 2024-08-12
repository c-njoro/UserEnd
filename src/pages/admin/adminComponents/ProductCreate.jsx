// ProductCreate.js
import {
  Create,
  NumberInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const categories = [
  { id: "Electronics", name: "Electronics" },
  { id: "Cameras", name: "Cameras" },
  { id: "Laptops", name: "Laptops" },
  { id: "Accessories", name: "Accessories" },
  { id: "Headphones", name: "Headphones" },
  { id: "Sports", name: "Sports" },
];

const ProductCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <NumberInput source="price" />
      <NumberInput source="stock" />
      <SelectInput source="category" choices={categories} />
      <TextInput source="seller" />
      <TextInput multiline source="description" />
    </SimpleForm>
  </Create>
);

export default ProductCreate;
