"use client";
import DataTable from "@/components/table/DataTable";
import DatasetAdd from "@/components/route/dataset/connection/Add";
import { BaseProvider, Box, StackView } from "@telus-uds/components-base";
import alliumTheme from "@telus-uds/theme-allium";
export default function Page({ lng, rows, columns }) {
  return (
    <>
      <BaseProvider defaultTheme={alliumTheme}>
        <Box variant={{ background: "light" }} space={4}>
          <StackView direction={{ xs: "column", md: "row" }} space={4}>
            <Box flex={1} variant={{ background: "lightest" }} space={4}>
              <DataTable
                lng={lng}
                rows={rows}
                columns={columns}
                cntx="connection"
              />
            </Box>
            <Box flex={0.5} variant={{ background: "lightest" }} space={4}>
              <DatasetAdd lng={lng} />
            </Box>
          </StackView>
        </Box>
      </BaseProvider>
    </>
  );
}
