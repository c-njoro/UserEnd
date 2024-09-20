// dataProvider.js
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_BASE_URL_FOR_ADMIN;

const customDataProvider = {
  getList: (resource, params) => {
    const {
      name,
      price,
      stock,
      category,
      role,
      orderStatus,
      paymentStatus,
      trackingNumber,
    } = params.filter;
    let query = `${apiUrl}/${resource}?`;

    if (name) {
      query += `name=${name}&`;
    }
    if (price) {
      query += `price=${price}&`;
    }
    if (stock) {
      query += `stock=${stock}&`;
    }
    if (role) {
      query += `role=${role}&`;
    }
    if (category) {
      query += `category=${category}&`;
    }
    if (orderStatus) {
      query += `orderStatus=${orderStatus}&`;
    }
    if (paymentStatus) {
      query += `paymentStatus=${paymentStatus}&`;
    }
    if (trackingNumber) {
      query += `trackingNumber=${trackingNumber}&`;
    }

    return axios
      .get(query.slice(0, -1))
      .then((response) => {
        const data = response.data;

        // Ensure data is an array
        if (Array.isArray(data)) {
          return {
            data: data.map((item) => ({
              id: item._id, // Rename _id to id
              ...item,
            })),
            total: data.length, // Use length of the array as total count
          };
        } else {
          console.error("Invalid response format:", data);
          return { data: [], total: 0 }; // Return empty data if format is incorrect
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return { data: [], total: 0 }; // Return empty data in case of error
      });
  },

  getOne: async (resource, params) => {
    try {
      const response = await axios.get(
        `${apiUrl}/${resource}/findById/${params.id}`
      );
      const data = response.data;

      // Map MongoDB _id to id
      return {
        data: {
          ...data,
          id: data._id,
        },
      };
    } catch (error) {
      console.error("Error fetching the item:", error);
      throw new Error("Error fetching the item");
    }
  },

  create: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    return axios
      .post(url, { ...params.data, _id: params.data.id }) // Map id to _id
      .then((response) => {
        const data = response.data;
        return {
          data: { id: data._id, ...data },
        };
      })
      .catch((error) => {
        console.error("Error creating data:", error);
        return { data: {} }; // Return empty data in case of error
      });
  },

  update: (resource, params) => {
    const url = `${apiUrl}/${resource}/update/${params.id}`;
    return axios
      .put(url, params.data)
      .then((response) => {
        const data = response.data;
        return {
          data: { id: data._id, ...data },
        };
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        return { data: {} }; // Return empty data in case of error
      });
  },

  delete: (resource, params) => {
    const url = `${apiUrl}/${resource}/delete/${params.id}`;
    return axios
      .delete(url)
      .then((response) => {
        return {
          data: { id: params.id },
        };
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        return { data: {} }; // Return empty data in case of error
      });
  },
};

export default customDataProvider;
