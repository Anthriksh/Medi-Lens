import { useEffect, useState } from "react";

export default function TerminalLogs() {

  const logs = [
    "Initializing OCR Engine...",
    "Detecting Brand Name...",
    "Extracting Active Ingredients...",
    "Cross Referencing Drug Database...",
    "Parsing Side Effects...",
    "Generating Report...",
    "Analysis Complete."
  ];

  const [visible,setVisible] = useState([]);

  useEffect(()=>{

    logs.forEach((log,index)=>{

      setTimeout(()=>{

        setVisible(prev=>[
          ...prev,
          log
        ]);

      },index*800);

    });

  },[]);

  return (

    <div className="terminal">

      {visible.map((log,index)=>(

        <div
          key={index}
          className="terminal-line"
        >
          ✓ {log}
        </div>

      ))}

    </div>
  );
}