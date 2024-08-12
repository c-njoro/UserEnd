import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Admin, Resource } from "react-admin";
import CustomLayout from "./adminComponents/CustomLayout";
import ProductCreate from "./adminComponents/ProductCreate";
import ProductEdit from "./adminComponents/ProductEdit";
import ProductShow from "./adminComponents/ProductShow";
import UserCreate from "./adminComponents/UserCreate";
import UserEdit from "./adminComponents/UserEdit";
import UserShow from "./adminComponents/UserShow";

import customDataProvider from "./customDataProvider";

import ProductList from "./adminComponents/ProductList";
import UserList from "./adminComponents/UsersList";

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
          create={UserCreate}
        />
      </Admin>
    </ThemeProvider>
  );
};

export default Page;
