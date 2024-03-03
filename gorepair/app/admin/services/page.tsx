"use client";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ServiceDevelopmentTable from "../../views/admin/dataTables/components/ServiceDevelopmentTable";
import CheckTable from "../../views/admin/dataTables/components/CheckTable";
import ColumnsTable from "../../views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "../../views/admin/dataTables/components/ComplexTable";
import { Button } from "@chakra-ui/react";
import ServiceTableDataDevelopment from "../../views/admin/dataTables/variables/ServiceTableDataDevelopment";
import tableDataCheck from "../../views/admin/dataTables/variables/tableDataCheck";
import tableDataColumns from "../../views/admin/dataTables/variables/tableDataColumns";
import tableDataComplex from "../../views/admin/dataTables/variables/tableDataComplex";
import AdminLayout from "../../layouts/admin";
import { firebaseObject } from "../../../config/firebaseConfig";
import React, { useEffect, useState } from "react";
export default function DataTables() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getServices = async () => {
      const _services = await firebaseObject.retrieveSpecificServiceCategory(
        "Electrical"
      );
      setServices(_services);
      setIsLoading(false);
    };
    getServices();
  }, []);
  return (
    <>
      {isLoading ? (
        <p>page is loading</p>
      ) : (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <SimpleGrid
            mb="20px"
            columns={{ sm: 1, md: 1 }}
            spacing={{ base: "20px", xl: "20px" }}
          >
            <ServiceDevelopmentTable tableData={services} />
            {/* <ServiceDevelopmentTable tableData={d} /> */}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
}
