import React from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from 'react-router-dom';
import { Patient } from './PatientCard';

const formSchema = z.object({
  id: z.string(),
  patient_id: z.number(),
  patient_name: z.string().min(1, "Patient name must not be empty").max(50),
  age: z.number().min(1, "Patient must have an age").max(150).positive().int("Age cannot be decimal"),
  height: z.number().positive().max(250),
  weight: z.number().positive(),
  history: z.string(),
  scan_id: z.string()
});

type FormValues = z.infer<typeof formSchema>;

export function PatientDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const patientFromLocation: Patient = location.state?.patient;

  if (!patientFromLocation) {
    return <div>Error: Patient data not found.</div>;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...patientFromLocation,
      patient_id: Number(patientFromLocation.patient_id),
      age: Number(patientFromLocation.age),
      height: Number(patientFromLocation.height),
      weight: Number(patientFromLocation.weight),
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("Form values:", values);
    // Handle form submission, e.g., send a request to update patient data
  };

  return (
    <>
      <Button onClick={() => navigate("/patients")}>Back</Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="patient_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>This is the patient's full name.</FormDescription>
                <FormMessage>{form.formState.errors.patient_name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="patient_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient ID</FormLabel>
                <FormControl>
                  <Input {...field} type="number" disabled />
                </FormControl>
                <FormDescription>This is the patient's ID.</FormDescription>
                <FormMessage>{form.formState.errors.patient_id?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Age</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription>This is the patient's age.</FormDescription>
                <FormMessage>{form.formState.errors.age?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Height (cm)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription>This is the patient's height.</FormDescription>
                <FormMessage>{form.formState.errors.height?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Weight (kg)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription>This is the patient's weight.</FormDescription>
                <FormMessage>{form.formState.errors.weight?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="history"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Has the patient had breast cancer previously?</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>This is if the patient has had breast cancer before.</FormDescription>
                <FormMessage>{form.formState.errors.history?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scan_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scan ID</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription>This is the patient's Scan ID.</FormDescription>
                <FormMessage>{form.formState.errors.scan_id?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button onClick={() => navigate(`/patients/${patientFromLocation.patient_id}/scan/`, { state: { patientFromLocation } })}>View Scans</Button>
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </>
  );
}
