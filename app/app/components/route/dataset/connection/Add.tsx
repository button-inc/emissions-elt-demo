"use client";
import {
  BaseProvider,
  Box,
  Button,
  Select,
  Spacer,
  TextInput,
  Typography,
} from "@telus-uds/components-base";
import alliumTheme from "@telus-uds/theme-allium";
export default function Page() {
  return (
    <>
      <BaseProvider defaultTheme={alliumTheme}>
        <Box flex={0.5} variant={{ background: "lightest" }}>
          <Typography variant={{ size: "h3" }}>Add your connection</Typography>
          <Spacer space={6} />
          <Typography>
            <TextInput label="Connection ID" />
          </Typography>
          <Typography>
            <Select label="Connection Type">
              <Select.Item value="root-item-1"></Select.Item>
              <Select.Item value="root-item-2">Root item 2</Select.Item>
              <Select.Item value="root-item-3">Root item 3</Select.Item>
            </Select>
          </Typography>
          <Typography>
            <TextInput label="Project ID" />
          </Typography>
          <Typography>
            <TextInput label="Key File Path" />
          </Typography>
          <Typography>
            <TextInput label="Key File JSON" />
          </Typography>
          <Typography>
            <Spacer space={9} />
            <Spacer space={11} direction="row" />
            <Button onPress={() => alert("saved")}>Save</Button>
            <Spacer space={2} />
          </Typography>
        </Box>
      </BaseProvider>
    </>
  );
}
