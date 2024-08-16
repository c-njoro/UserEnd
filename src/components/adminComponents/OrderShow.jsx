// ProductShow.js
import {
  ArrayField,
  DateField,
  NumberField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
} from "react-admin";

const OrderShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="trackingNumber" />
      <TextField source="contactInfo.phone" label="Customer Phone" />
      <TextField source="contactInfo.email" label="Customer Email" />
      <TextField source="orderStatus" />
      <ArrayField source="products">
        <SingleFieldList>
          <TextField source="productName" label="Name" />
          <br />
          <TextField source="quantity" label="Quantity" aria-label="Quantity" />
          <br />
          <TextField source="unitPrice" label="Unit Price" />
          <br />
          <TextField source="totalPrice" label="Total Price" />
        </SingleFieldList>
      </ArrayField>
      <NumberField source="totalAmount" />
      <TextField source="paymentStatus" />
      <TextField source="internalNotes" />
      <TextField source="orderNotes" />
      <DateField source="orderDate" />
    </SimpleShowLayout>
  </Show>
);

export default OrderShow;
