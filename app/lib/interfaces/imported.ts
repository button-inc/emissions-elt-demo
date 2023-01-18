import { gql } from "graphql-request";
import { IColumnType } from "@/components/table/Table";

// 👇️ data definition of imported data
export interface IData {
  email: string;
  role: string;
}

// 👇️ column definition of imported data
export const columns: IColumnType<IData>[] = [
  {
    key: "email",
    title: "Email",
    width: 200,
  },
  {
    key: "userrole",
    title: "Role",
    width: 200,
  },
];

export const query = gql`
  {
    allPermissions {
      nodes {
        email
        userrole
      }
    }
  }
`;
