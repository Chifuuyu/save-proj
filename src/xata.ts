// Generated by Xata Codegen 0.30.1. Please do not edit.
import { buildClient } from "npm:@xata.io/client@latest";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "npm:@xata.io/client@latest";

const tables = [
  {
    name: "Users",
    columns: [
      {
        name: "first_name",
        type: "text",
        notNull: true,
        defaultValue: "first",
      },
      { name: "last_name", type: "text", notNull: true, defaultValue: "last" },
      { name: "email", type: "text", notNull: true, defaultValue: "email.com" },
      { name: "password_hash", type: "text" },
      {
        name: "phone_number",
        type: "text",
        notNull: true,
        defaultValue: "9204102048",
      },
    ],
    revLinks: [
      { column: "user", table: "SavingsRecords" },
      { column: "user", table: "Expenses" },
      { column: "user", table: "LoanPayments" },
      { column: "user", table: "Goals" },
      { column: "user", table: "Notifications" },
      { column: "user", table: "Transactions" },
      { column: "user", table: "Categories" },
      { column: "user", table: "RecurringTransactionTemplates" },
      { column: "user", table: "RecurringGoalContributions" },
    ],
  },
  {
    name: "SavingsRecords",
    columns: [
      { name: "amount", type: "int", notNull: true, defaultValue: "0" },
      {
        name: "description",
        type: "text",
        notNull: true,
        defaultValue: "text",
      },
      {
        name: "is_recurring",
        type: "bool",
        notNull: true,
        defaultValue: "false",
      },
      { name: "user", type: "link", link: { table: "Users" } },
      { name: "date", type: "datetime", defaultValue: "now" },
    ],
  },
  {
    name: "Expenses",
    columns: [
      { name: "user", type: "link", link: { table: "Users" } },
      { name: "amount", type: "int", notNull: true, defaultValue: "0" },
      { name: "date", type: "datetime", notNull: true, defaultValue: "now" },
      {
        name: "is_recurring",
        type: "bool",
        notNull: true,
        defaultValue: "false",
      },
      {
        name: "description",
        type: "text",
        notNull: true,
        defaultValue: "text",
      },
      {
        name: "category",
        type: "link",
        link: { table: "Categories" },
        unique: true,
      },
    ],
  },
  {
    name: "LoanTypes",
    columns: [
      { name: "type", type: "text", notNull: true, defaultValue: "type" },
    ],
    revLinks: [{ column: "loan_type", table: "LoanPayments" }],
  },
  {
    name: "LoanPayments",
    columns: [
      { name: "user", type: "link", link: { table: "Users" } },
      { name: "amount", type: "int", notNull: true, defaultValue: "0" },
      {
        name: "start_date",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
      {
        name: "end_date",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
      { name: "loan_type", type: "link", link: { table: "LoanTypes" } },
      {
        name: "description",
        type: "text",
        notNull: true,
        defaultValue: "text",
      },
    ],
    revLinks: [{ column: "loan", table: "LoanInstallments" }],
  },
  {
    name: "Goals",
    columns: [
      { name: "title", type: "text", notNull: true, defaultValue: "title" },
      { name: "target_amount", type: "int", notNull: true, defaultValue: "0" },
      { name: "saved_amount", type: "int", notNull: true, defaultValue: "0" },
      { name: "image_url", type: "file[]" },
      {
        name: "description",
        type: "text",
        notNull: true,
        defaultValue: "text",
      },
      {
        name: "due_date",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
      {
        name: "status",
        type: "text",
        notNull: true,
        defaultValue: "in_progress",
      },
      { name: "priority_level", type: "int", notNull: true, defaultValue: "3" },
      {
        name: "goal_type",
        type: "text",
        notNull: true,
        defaultValue: "short_term",
      },
      { name: "user", type: "link", link: { table: "Users" } },
      { name: "category", type: "link", link: { table: "Categories" } },
    ],
    revLinks: [
      { column: "goal", table: "Milestones" },
      { column: "goal", table: "RecurringGoalContributions" },
    ],
  },
  {
    name: "Milestones",
    columns: [
      {
        name: "description",
        type: "text",
        notNull: true,
        defaultValue: "text",
      },
      { name: "target_amount", type: "int", notNull: true, defaultValue: "0" },
      {
        name: "achieved_amount",
        type: "int",
        notNull: true,
        defaultValue: "0",
      },
      {
        name: "milestone_date",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
      { name: "goal", type: "link", link: { table: "Goals" } },
    ],
  },
  {
    name: "Notifications",
    columns: [
      { name: "user", type: "link", link: { table: "Users" } },
      { name: "message", type: "text", notNull: true, defaultValue: "message" },
      { name: "is_read", type: "bool", notNull: true, defaultValue: "false" },
      { name: "transaction", type: "link", link: { table: "Transactions" } },
      {
        name: "reminder_type",
        type: "text",
        notNull: true,
        defaultValue: "goal_reached",
      },
      {
        name: "notification_type",
        type: "text",
        notNull: true,
        defaultValue: "general",
      },
    ],
  },
  {
    name: "Transactions",
    columns: [
      { name: "user", type: "link", link: { table: "Users" } },
      { name: "amount", type: "int", notNull: true, defaultValue: "0" },
      { name: "date", type: "datetime", notNull: true, defaultValue: "now" },
      { name: "type", type: "text", notNull: true, defaultValue: "savings" },
      {
        name: "description",
        type: "text",
        notNull: true,
        defaultValue: "description",
      },
      { name: "category", type: "link", link: { table: "Categories" } },
    ],
    revLinks: [{ column: "transaction", table: "Notifications" }],
  },
  {
    name: "Categories",
    columns: [
      { name: "name", type: "text", notNull: true, defaultValue: "name" },
      {
        name: "description",
        type: "text",
        notNull: true,
        defaultValue: "description",
      },
      { name: "purpose", type: "text", notNull: true, defaultValue: "expense" },
      { name: "user", type: "link", link: { table: "Users" } },
      { name: "type", type: "text", notNull: true, defaultValue: "income" },
    ],
    revLinks: [
      { column: "category", table: "Transactions" },
      { column: "category", table: "Expenses" },
      { column: "category", table: "Goals" },
    ],
  },
  {
    name: "RecurringGoalContributions",
    columns: [
      { name: "user", type: "link", link: { table: "Users" } },
      { name: "goal", type: "link", link: { table: "Goals" } },
      {
        name: "frequency",
        type: "text",
        notNull: true,
        defaultValue: "weekly",
      },
      {
        name: "next_execution_date",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
      { name: "last_execution_date", type: "datetime" },
      { name: "is_active", type: "bool", notNull: true, defaultValue: "true" },
    ],
  },
  {
    name: "LoanInstallments",
    columns: [
      { name: "loan", type: "link", link: { table: "LoanPayments" } },
      { name: "amount", type: "int", notNull: true, defaultValue: "0" },
      {
        name: "payment_date",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
    ],
  },
  {
    name: "RecurringTransactionTemplates",
    columns: [
      { name: "user", type: "link", link: { table: "Users" } },
      { name: "amount", type: "int", notNull: true, defaultValue: "0" },
      {
        name: "frequency",
        type: "text",
        notNull: true,
        defaultValue: "weekly",
      },
      {
        name: "description",
        type: "text",
        notNull: true,
        defaultValue: "description",
      },
      {
        name: "next_execution_date",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
      { name: "last_execution_date", type: "datetime" },
      { name: "is_active", type: "bool", notNull: true, defaultValue: "true" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Users = InferredTypes["Users"];
export type UsersRecord = Users & XataRecord;

export type SavingsRecords = InferredTypes["SavingsRecords"];
export type SavingsRecordsRecord = SavingsRecords & XataRecord;

export type Expenses = InferredTypes["Expenses"];
export type ExpensesRecord = Expenses & XataRecord;

export type LoanTypes = InferredTypes["LoanTypes"];
export type LoanTypesRecord = LoanTypes & XataRecord;

export type LoanPayments = InferredTypes["LoanPayments"];
export type LoanPaymentsRecord = LoanPayments & XataRecord;

export type Goals = InferredTypes["Goals"];
export type GoalsRecord = Goals & XataRecord;

export type Milestones = InferredTypes["Milestones"];
export type MilestonesRecord = Milestones & XataRecord;

export type Notifications = InferredTypes["Notifications"];
export type NotificationsRecord = Notifications & XataRecord;

export type Transactions = InferredTypes["Transactions"];
export type TransactionsRecord = Transactions & XataRecord;

export type Categories = InferredTypes["Categories"];
export type CategoriesRecord = Categories & XataRecord;

export type RecurringGoalContributions =
  InferredTypes["RecurringGoalContributions"];
export type RecurringGoalContributionsRecord = RecurringGoalContributions &
  XataRecord;

export type LoanInstallments = InferredTypes["LoanInstallments"];
export type LoanInstallmentsRecord = LoanInstallments & XataRecord;

export type RecurringTransactionTemplates =
  InferredTypes["RecurringTransactionTemplates"];
export type RecurringTransactionTemplatesRecord =
  RecurringTransactionTemplates & XataRecord;

export type DatabaseSchema = {
  Users: UsersRecord;
  SavingsRecords: SavingsRecordsRecord;
  Expenses: ExpensesRecord;
  LoanTypes: LoanTypesRecord;
  LoanPayments: LoanPaymentsRecord;
  Goals: GoalsRecord;
  Milestones: MilestonesRecord;
  Notifications: NotificationsRecord;
  Transactions: TransactionsRecord;
  Categories: CategoriesRecord;
  RecurringGoalContributions: RecurringGoalContributionsRecord;
  LoanInstallments: LoanInstallmentsRecord;
  RecurringTransactionTemplates: RecurringTransactionTemplatesRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Paul-Anthony-Ragsac-s-workspace-96i8v1.us-east-1.xata.sh/db/loan-database",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
