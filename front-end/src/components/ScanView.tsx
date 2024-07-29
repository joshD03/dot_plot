import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Patient } from "./PatientCard";
import coordinatesImage from "../assets/coordinates.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";


const scanGrid = () => {
  const rows = 4;
  const columns = 8;
  const letters = "ABCDEFGH";

  const handleClick = (row: number, column: number) => {
    const coordinates = `${letters[column - 1]}${row}`;
    onCellClick(coordinates);
  };

  return (
    <div className="scan-grid">
      <img src="/coordinates.png" alt="Scan grid" className="grid-background" />
      <div className="grid-overlay">
        {Array.from({ length: rows }).map((_, rowIndex) =>
          Array.from({ length: columns }).map((_, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className="grid-cell"
              onClick={() => handleClick(rowIndex + 1, colIndex + 1)}
            >
              {letters[colIndex]}
              {rowIndex + 1}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

interface Scan {
  id: string; // scan id
  coordinates: string; // e.g., "A1", "B2"
  imageUrl: string; // URL to the patient's scan image
  Scan_Date: string,
  Diagnosis: string
}

interface ScanResponse{
    _id: string,
    US_scan_ID: string,
    Coordinates: string,
    Scan_Date: string,
    Diagnosis: string
}

// Fetches an image & returns the image url or comes up with an error.
const fetchImage = async (scan_id: string): Promise<Scan> => {
  
  try {
    const imageResponse = await axios.get(
      `http://127.0.0.1:8000/us_scans/images/${scan_id}`,
      {
        responseType: "blob",
        headers: {
          "Content-Type": "image/png",
        },
      }
    );
    const scanDetails = await axios.get(
      `http://127.0.0.1:8000/us_scans/id/${scan_id}`
    );

    const scanDetail: ScanResponse = scanDetails.data;
    const imageUrl = URL.createObjectURL(imageResponse.data);
    const scanObject = {
      id: scanDetail.US_scan_ID,
      coordinates: scanDetail.Coordinates,
      imageUrl: imageUrl,
      Scan_Date: scanDetail.Scan_Date,
      Diagnosis: scanDetail.Diagnosis,
    }

    return scanObject;
  } catch (err) {
    console.log(err);
    const unavailableScan:Scan = {
      id: "n/a",// scan id
      coordinates: "n/a", // e.g., "A1", "B2"
      imageUrl: "n/a", // URL to the patient's scan image
      Scan_Date: "n/a",
      Diagnosis: "n/a"
    };
    return unavailableScan;
  }
};

const ScanView = () => {
  const [scans, setScans] = useState<Scan[]>();
  const location = useLocation();
  const navigate = useNavigate();
  const patientFromLocation: Patient | undefined = location.state?.patientFromLocation;

  if (!patientFromLocation) {
    return <div>Error: Patient data not found.</div>;
  }

  const scan_id = patientFromLocation.scan_id;
  const scan_ids = scan_id.split(" ");

  useEffect(() => {
    const fetchImages = async () => {
      const scanObjects = await Promise.all(
        scan_ids.map(async (id) => {
          const scan = await fetchImage(id);
          return scan;
        })
      );

      setScans(scanObjects);
    };

    fetchImages();
  }, [scan_ids]);

  return (
    <Dialog>
      <Button onClick={()=>{
        navigate(`/patients/`);
      }}>Back</Button>
      <DialogTrigger>Open Scan</DialogTrigger>
      <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <h2>Scroll down to see scans</h2>
          <img src={coordinatesImage} alt="Scan" className="max-w-xs" />

          { scans ?
            scans?.map(({imageUrl, id, coordinates, Scan_Date, Diagnosis}) => (
            <div className="inline-grid grid-cols-2 grid-rows-1">
                <img key={id} src={imageUrl} alt={`Scan ${id}`} className="max-w-xxs pl-10 pr-5"/>
                <div className="max-w-sm :text-xs">
                  <h2>Scan ID: {id}</h2>
                  <h2>Coordinate: {coordinates}</h2>
                  <h2>Scan Date: {Scan_Date}</h2>
                  <h2>Diagnosis: {Diagnosis}</h2>
                </div>
              </div>
            )) : "No Scans Found"
          }
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ScanView;
function onCellClick(coordinates: string) {
  throw new Error("Function not implemented.");
}
