import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Admin, Resource } from "react-admin";
import CustomLayout from "./CustomLayout";
import OrderEdit from "./OrderEdit";
import OrderShow from "./OrderShow";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";
import ProductShow from "./ProductShow";
import UserEdit from "./UserEdit";
import UserShow from "./UserShow";

import customDataProvider from "./customDataProvider";

import OrderList from "./OrderList";
import ProductList from "./ProductList";
import UserList from "./UsersList";

import tailwindConfig from "tailwindcss/defaultConfig";

const customTheme = createTheme({
  ...tailwindConfig.theme,
});

const Page = () => {
  return (
    <ThemeProvider theme={customTheme}>
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
