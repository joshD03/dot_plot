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

export type Patient = {
  id: string
  patient_id: number
  patient_name: string
  age: number
  height: number
  weight: number
  history: string
  scan_id: string
}

// async function getPatients(): Promise<Payment[]> {

// }

const examplePatientArray: Patient[] = [
  {
  id: '66a38e19e31b38b257a32f49',
  patient_id: 1301,
  patient_name: "Raja Prescott",
  age: 35,
  height: 162,
  weight: 65,
  history: "yes",
  scan_id: "233",
  },
  {
    id: '66a38e19e31b38b257a32f49',
    patient_id: 1301,
    patient_name: "Raja Prescott",
    age: 35,
    height: 162,
    weight: 65,
    history: "yes",
    scan_id: "233",
    }
]

const PatientCard = () => {
  return (
    <div className="container mx-auto py-10">
    <DataTable columns={columns} data={examplePatientArray}/>
    </div>
  );
};

export default PatientCard;
