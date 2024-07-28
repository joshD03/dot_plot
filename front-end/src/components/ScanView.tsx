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
import coordinatesImage from '../assets/coordinates.png'
import axios from "axios";

interface Scan {
  id: string;
  coordinates: string; // e.g., "A1", "B2"
  imageUrl: string; // URL to the patient's scan image
}

const scans: Scan[] = [
  { id: "1", coordinates: "A1", imageUrl: "/scans/scan1.jpg" },
  { id: "2", coordinates: "B2", imageUrl: "/scans/scan2.jpg" },
  // Add more scans here
];

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

interface scanProp{
    patient : Patient
}

const ScanView = ({scan_id} : Patient) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    
    const scan_ids = scan_id.split(" ");
    let images: any = [];
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            let scans = [];
            for(let i = 0; i<scan_ids.length; i++){
                let reqString = `http://127.0.0.1:8000//images/${scan_ids[i]}`;
                const response = await axios.get(reqString, {
                    responseType: 'blob'
                  });
                scans.push(response);
            }
            return scans;
          } catch (err) {

          }
        };
        images = fetchData();
        displayImages()
    }, []);


  return (
    <Dialog>
      <DialogTrigger>Open Scan</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <img src={coordinatesImage} alt="Scan"/>
          
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ScanView;
function onCellClick(coordinates: string) {
    throw new Error("Function not implemented.");
}

function displayImages() {
    throw new Error("Function not implemented.");
}

