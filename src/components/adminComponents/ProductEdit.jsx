// ProductEdit.js
import {
  ArrayInput,
  Edit,
  NumberInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";
import AddProductImagesButton from "./AddImagesButton";

const categories = [
  { id: "Electronics", name: "Electronics" },
  { id: "Cameras", name: "Cameras" },
  { id: "Laptops", name: "Laptops" },
  { id: "Accessories", name: "Accessories" },
  { id: "Headphones", name: "Headphones" },
  { id: "Sports", name: "Sports" },
];

const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <NumberInput source="price" />
      <NumberInput source="stock" />
      <SelectInput source="category" choices={categories} />
      <TextInput multiline source="description" />
      <ArrayInput source="images">
        <SimpleFormIterator>
          <TextInput source="public_id" label="Public Id" />
          <TextInput source="url" label="URL" />
          <TextInput source="_id" label="Image ID" disabled />
        </SimpleFormIterator>
      </ArrayInput>
      <AddProductImagesButton />
    </SimpleForm>
  </Edit>
);

export default ProductEdit;
