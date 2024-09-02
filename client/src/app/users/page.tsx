"use client"

import SharedHeader from "@/components/shared/SharedHeader";
import { userColumns } from "@/contants";
import { useGetUsersQuery } from "@/redux/state/api"
import { DataGrid } from "@mui/x-data-grid";

const Users = () => {
  const {data:Users,isLoading,isError} = useGetUsersQuery();

if(isLoading) {
    return <div className="py-4">Loading...</div>;
}
if (isError || !Users) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch Users
      </div>
    );
}
  return (
    <div className="flex flex-col">
      <SharedHeader name="Users" />
      <DataGrid
        rows={Users}
        columns={userColumns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};



export default Users