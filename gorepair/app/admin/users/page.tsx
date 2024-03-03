"use client";
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "../../views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "../../views/admin/dataTables/components/CheckTable";
import ColumnsTable from "../../views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "../../views/admin/dataTables/components/ComplexTable";
import { Button } from "@chakra-ui/react";
import ServiceTableDataDevelopment from "../../views/admin/dataTables/variables/ServiceTableDataDevelopment";
import tableDataCheck from "../../views/admin/dataTables/variables/tableDataCheck";
import tableDataColumns from "../../views/admin/dataTables/variables/tableDataColumns";
import tableDataComplex from "../../views/admin/dataTables/variables/tableDataComplex";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/admin";
import { firebaseObject } from "../../../config/firebaseConfig";

export default function DataTables() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUsers = async () => {
      const _users = await firebaseObject.retrieveUsers();
      setUsers(_users);
      setIsLoading(false);
    };
    getUsers();
  }, []);
  return (
    <>
      {isLoading ? (
        <p>Loading Content</p>
      ) : (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <SimpleGrid
            mb="20px"
            columns={{ sm: 1, md: 1 }}
            spacing={{ base: "20px", xl: "20px" }}
          >
            <DevelopmentTable tableData={users} />
          </SimpleGrid>
        </Box>
      )}
    </>
  );
}
