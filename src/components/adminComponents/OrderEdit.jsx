// ProductEdit.js
import { Edit, SelectInput, SimpleForm, TextInput } from "react-admin";

const status = [
  { id: "pending", name: "pending" },
  { id: "processing", name: "processing" },
  { id: "shipping", name: "shipping" },
  { id: "shipped", name: "shipped" },
  { id: "delivered", name: "delivered" },
  { id: "cancelled", name: "cancelled" },
  { id: "returned", name: "returned" },
];

const payment = [
  { id: "pending", name: "pending" },
  { id: "paid", name: "paid" },
];

const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="trackingNumber" disabled />
      <SelectInput source="paymentStatus" choices={payment} />
      <SelectInput source="orderStatus" choices={status} />
    </SimpleForm>
  </Edit>
);

export default ProductEdit;
