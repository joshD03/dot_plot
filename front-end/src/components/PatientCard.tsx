import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTable } from "./DataTable"
import { columns } from "./Columns";
import { Button } from "./ui/button";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";


export type Patient = {
  id: string,
  patient_id: number,
  patient_name: string,
  age: number,
  height: number,
  weight: number,
  history: string,
  scan_id: string,
}

// async function getPatients(): Promise<Payment[]> {

// }

interface patientData{
  data: Patient[];
}


const PatientCard = ({data} : patientData) => {
  return (
    <div className="container mx-auto py-10">
    <DataTable columns={columns} data={data}/>
    </div>
  );
};

export default PatientCard;
