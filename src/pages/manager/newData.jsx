"use client";
import React from "react";
import ProductForm from "../../components/ProductForm";
import UserForm from "../../components/UserForm";

const Manage = () => {
  return (
    <div>
      <h1>New User And Product Page</h1>
      <UserForm />
      <ProductForm />
    </div>
  );
};

export default Manage;
