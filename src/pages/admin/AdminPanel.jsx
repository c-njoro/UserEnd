import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Admin, Resource } from "react-admin";
import CustomLayout from "../../components/adminComponents/CustomLayout";
import OrderEdit from "../../components/adminComponents/OrderEdit";
import OrderShow from "../../components/adminComponents/OrderShow";
import ProductCreate from "../../components/adminComponents/ProductCreate";
import ProductEdit from "../../components/adminComponents/ProductEdit";
import ProductShow from "../../components/adminComponents/ProductShow";
import UserEdit from "../../components/adminComponents/UserEdit";
import UserShow from "../../components/adminComponents/UserShow";

import customDataProvider from "./customDataProvider";

import OrderList from "../../components/adminComponents/OrderList";
import ProductList from "../../components/adminComponents/ProductList";
import UserList from "../../components/adminComponents/UsersList";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: "relative", // Customize the position here
        },
      },
    },
  },
});

const Page = () => {
  return (
    <ThemeProvider theme={theme}>
      <Admin dataProvider={customDataProvider} layout={CustomLayout}>
        <Resource
          name="products"
          list={ProductList}
          create={ProductCreate}
          edit={ProductEdit}
          show={ProductShow}
        />

        <Resource
          name="users"
          list={UserList}
          show={UserShow}
          edit={UserEdit}
        />

        <Resource
          name="orders"
          list={OrderList}
          edit={OrderEdit}
          show={OrderShow}
        />
      </Admin>
    </ThemeProvider>
  );
};

export default Page;
