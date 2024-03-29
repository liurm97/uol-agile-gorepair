"use client";
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "../../views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "../../views/admin/dataTables/components/CheckTable";
import ColumnsTable from "../../views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "../../views/admin/dataTables/components/ComplexTable";
import { Button } from "@chakra-ui/react";
import tableDataDevelopment from "../../views/admin/dataTables/variables/tableDataDevelopment";
import tableDataCheck from "../../views/admin/dataTables/variables/tableDataCheck";
import tableDataColumns from "../../views/admin/dataTables/variables/tableDataColumns";
import tableDataComplex from "../../views/admin/dataTables/variables/tableDataComplex";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/admin";
import { firebaseObject } from "../../../config/firebaseConfig";

// export default async function Orders() {
export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getOrders = async () => {
      const _orders = await firebaseObject.retrieveOrders();
      console.log("setting orders");
      setOrders(_orders);
      setIsLoading(false);
    };
    getOrders();
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
            <ComplexTable tableData={orders} />
          </SimpleGrid>
        </Box>
      )}
    </>
  );
}
