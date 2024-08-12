// ProductShow.js
import {
  DateField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

const ProductShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <NumberField source="price" />
      <NumberField source="stock" />
      <TextField source="seller" />
      <TextField source="category" />
      <TextField source="description" />
      <DateField source="createdAt" />
    </SimpleShowLayout>
  </Show>
);

export default ProductShow;
