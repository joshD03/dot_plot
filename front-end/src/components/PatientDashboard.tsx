import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import PatientCard, { Patient } from "./PatientCard";
import { SheetDemo } from "./Settings";
import { PatientDetails } from "./PatientDetails";
import { useEffect, useRef, useState } from "react";
import { Link, Navigate, NavigateFunction, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import ScanView from "./ScanView";




const Dashboard = () => {
  
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null >(null);
  const [inputValue, setInputValue] = useState<string>('');

  const hasLetters = (str: string) => {
    const regex = /[a-zA-Z]/;
    return regex.test(str);
  };
  
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        let reqString = `http://127.0.0.1:8000/patients/${inputValue}`;
        if(hasLetters(inputValue)) reqString = `http://127.0.0.1:8000/patients/patient_name/${inputValue}`;
        const response = await axios.get<Patient[]>(reqString);
        setPatients(response.data);
        console.log(patients);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, [inputValue]); // Dependency array is empty to run only once

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };




  
  // state management will go here
  const navigate = useNavigate();
  
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">MediVisual</span>
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="/patients"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Manage Patients
              </Link>
              <Link
                to="/patients"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                Scan Visualisation
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
              <SheetDemo>
                      <a
                        href="#"
                        className="font-medium text-primary hover:underline"
                      >
                        Settings
                      </a>
                    </SheetDemo>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button onClick={() => {
                  navigate("/login");
                }} size="sm" className="w-full">
                  Log Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <a
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">MediVisual</span>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Manage Patients
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Scan Visualisation
                  {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge> */}
                </a>
              </nav>
              {/* Quote can be in the bottom! */}
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    {/* add sheetdemo here */}
                    <SheetDemo>
                      <a
                        href="#"
                        className="font-medium text-primary hover:underline"
                      >
                        Settings
                      </a>
                    </SheetDemo>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Log Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  onChange={handleInputChange}
                  type="search"
                  placeholder="Search Patients by ID or Name"
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-2/5"
                />
              </div>
            </form>
          </div>
        </header>
        {/* This is where the state logic can be used to conditionally render items */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Patient Search
            </h1>
          </div>
          <PatientCard /> */}
          
          {/* <ProfileForm patient={patient} /> */}
            
          <Routes>
              <Route path ="/" element={<PatientCard data={patients}  />} />
              <Route path="/:patientId" element={<PatientDetails  />} />
              <Route path="*" element={<Navigate to="/patients" />} />
              <Route path="/:patientId/scan/" element={<ScanView />}/>
          </Routes>

          
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
