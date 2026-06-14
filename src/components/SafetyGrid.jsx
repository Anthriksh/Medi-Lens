import {
  ShieldCheck,
  TriangleAlert,
  Baby,
  Pill
} from "lucide-react";

export default function SafetyGrid() {
  return (

    <div className="safety-grid">

      <div className="safety-card">
        <ShieldCheck />
        <h4>Verified</h4>
        <p>Medicine Identified</p>
      </div>

      <div className="safety-card">
        <Pill />
        <h4>Rx Status</h4>
        <p>Prescription Required</p>
      </div>

      <div className="safety-card">
        <Baby />
        <h4>Pregnancy</h4>
        <p>Consult Doctor</p>
      </div>

      <div className="safety-card">
        <TriangleAlert />
        <h4>Allergy Risk</h4>
        <p>Check Ingredients</p>
      </div>

    </div>
  );
}