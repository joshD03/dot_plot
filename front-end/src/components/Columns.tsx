import { ColumnDef } from "@tanstack/react-table"
import { Patient } from "./PatientCard"
import { Button } from "./ui/button";

import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useState } from "react";




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
            <ManagePatientButton patient={row.original} />
        )
    }
];

const ManagePatientButton: React.FC<{ patient: Patient }> = ({ patient }) => {
    const navigate = useNavigate();
  
    const handleButtonClick = () => {
      navigate(`/patients/${patient.patient_id}`, { state: { patient } });
    };
  
    return <Button onClick={handleButtonClick}>View</Button>;
  };
