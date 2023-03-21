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

import { useTranslation } from "@/i18n/client";

export default function Page({ lng }) {
  // 👇️ language management
  let { t } = useTranslation(lng, "dataset");

  return (
    <>
      <BaseProvider defaultTheme={alliumTheme}>
        <Box flex={0.5} variant={{ background: "lightest" }}>
          <Typography variant={{ size: "h3" }}>
            {t("connection.add.tag")}
          </Typography>
          <Spacer space={6} />
          <Typography>
            <TextInput label={t("connection.add.fields.connection")} />
          </Typography>
          <Typography>
            <Select label={t("connection.add.fields.type")}>
              <Select.Item value="root-item-1"></Select.Item>
              <Select.Item value="root-item-2">Root item 2</Select.Item>
              <Select.Item value="root-item-3">Root item 3</Select.Item>
            </Select>
          </Typography>
          <Typography>
            <TextInput label={t("connection.add.fields.project")} />
          </Typography>
          <Typography>
            <TextInput label={t("connection.add.fields.keypath")} />
          </Typography>
          <Typography>
            <TextInput label={t("connection.add.fields.keyjson")} />
          </Typography>
          <Typography>
            <Spacer space={9} />
            <Spacer space={11} direction="row" />
            <Button onPress={() => alert("saved")}>
              {t("connection.add.save")}
            </Button>
            <Spacer space={2} />
          </Typography>
        </Box>
      </BaseProvider>
    </>
  );
}
