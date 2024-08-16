import * as React from "react";
import { Filter, NumberInput, SelectInput, TextInput } from "react-admin";

const ProductFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search by name" source="name" alwaysOn />
    <NumberInput label="Search by price" source="price" />
    <NumberInput label="Search by stock" source="stock" alwaysOn />

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

export default ProductFilter;
