import React from "react";
import TableUsers from "@/src/app/components/TableUsers";
import { getAllUsers } from "@/src/utils/action";

const page = async () => {
  const users = await getAllUsers();
  return (
    <>
      <TableUsers users={users} />
    </>
  );
};

export default page;
