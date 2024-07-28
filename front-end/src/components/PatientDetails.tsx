import React from 'react'
import { Patient } from './PatientCard'
import z from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useLocation, useNavigate, useParams } from 'react-router-dom';


interface patientProps{
    patient: Patient
}

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
    id: z.string(),
    patient_id: z.number(),
    patient_name: z.string().min(1, 
        "Patient name must not be empty"
    ).max(50),
    age:z.number().min(1, "Patient must have an age")
    .max(150).positive().int("Age cannot be decimal"),
    height: z.number().positive().max(250),
    weight: z.number().positive(),
    history: z.string(),
    scan_id: z.string()
});

//get patient via information


export function PatientDetails() {
    const navigate = useNavigate();

    const location = useLocation();
    const patientFromLocation: Patient = location.state?.patient;
    // 1. Define your form.
    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: patientFromLocation,
    });
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      // send axios request to post to update 
      console.log("");
    };

    return (
      <>
      <Button onClick={() => {
        navigate("/patients")
      }}>Back</Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="patient_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Name</FormLabel>
                <FormControl>
                  <Input placeholder={patientFromLocation.patient_name} {...field} />
                </FormControl>
                <FormDescription>
                  This is the patient's full name.
                </FormDescription>
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
                  <Input disabled placeholder={(""+patientFromLocation.patient_id)} {...field} />
                </FormControl>
                <FormDescription>
                  This is the patient's ID.
                </FormDescription>
                <FormMessage>{form.formState.errors.patient_name?.message}</FormMessage>
                
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
                  <Input placeholder={(""+patientFromLocation.age)} {...field} />
                </FormControl>
                <FormDescription>
                  This is the patient's age.
                </FormDescription>
                <FormMessage>{form.formState.errors.patient_name?.message}</FormMessage>
                
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Patient Height (cm)"}</FormLabel>
                <FormControl>
                  <Input placeholder={(""+patientFromLocation.height)} {...field} />
                </FormControl>
                <FormDescription>
                  This is the patient's height.
                </FormDescription>
                <FormMessage>{form.formState.errors.patient_name?.message}</FormMessage>
                
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
                  <Input placeholder={(""+patientFromLocation.weight)} {...field} />
                </FormControl>
                <FormDescription>
                  This is the patient's weight.
                </FormDescription>
                <FormMessage>{form.formState.errors.patient_name?.message}</FormMessage>
                
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
                  <Input placeholder={(patientFromLocation.history)} {...field} />
                </FormControl>
                <FormDescription>
                  This is if the patient has had breast cancer before.
                </FormDescription>
                <FormMessage>{form.formState.errors.patient_name?.message}</FormMessage>
                
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
                  <Input disabled placeholder={(patientFromLocation.scan_id?patientFromLocation.scan_id : "N/A")} {...field} />
                </FormControl>
                <FormDescription>
                  This is the patient's Scan ID.
                </FormDescription>
                <FormMessage>{form.formState.errors.patient_name?.message}</FormMessage>
                
              </FormItem>
            )}
          />
          {/* // submit */}
          <Button type="submit" >Save</Button>
        </form>
      </Form>
      </>
    );
  };

