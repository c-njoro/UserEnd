import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  List,
  Pagination,
  SingleFieldList,
  TextField,
} from "react-admin";

const ProductPagination = (props) => (
  <Pagination rowsPerPageOptions={[5]} {...props} />
);

const OrderList = (props) => {
  return (
    <List {...props} pagination={<ProductPagination />} perPage={5}>
      <Datagrid>
        <TextField source="trackingNumber" />
        <TextField source="orderStatus" />
        <TextField source="shippingAddress" />
        <TextField source="shippingMethod" />
        <TextField source="paymentMethod" />
        <TextField source="totalAmount" />
        <TextField source="paymentStatus" />
        <TextField source="transactionId" />
        <TextField source="contactInfo.phone" label="Phone" />
        <TextField source="contactInfo.email" label="Email" />

        <DateField source="orderDate" />

        <ArrayField source="products">
          <SingleFieldList>
            <ChipField source="productName" />
            <ChipField source="quantity" />
          </SingleFieldList>
        </ArrayField>
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default OrderList;
