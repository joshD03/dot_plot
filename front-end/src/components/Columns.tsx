import { ColumnDef } from "@tanstack/react-table"
import { Patient } from "./PatientCard"
import { Button } from "./ui/button";

export const columns: ColumnDef<Patient>[] = [
    {
        accessorKey: "patient_name",
        header: "Name",
    },
    {
        accessorKey: "patient_id",
        header: "Patient ID",
    },
    {
        accessorKey: "edit",
        header: "Manage Patient",
        cell: ({ row }) => (
            <Button onClick={() => handleButtonClick(row.original)}>View</Button>
        )
    }
];


function handleButtonClick(original: any): void {
    throw new Error("Function not implemented.");
}

