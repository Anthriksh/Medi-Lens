import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import UploadCenter from "../components/UploadCenter";
import ScanAnimation from "../components/ScanAnimation";
import TerminalLogs from "../components/TerminalLogs";
import ConfidenceRing from "../components/ConfidenceRing";
import SafetyGrid from "../components/SafetyGrid";
import MedicineReport from "../components/MedicineReport";
import translations from "../data/translations";

import { db, auth } from "../firebase";

import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

export default function Home() {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const language =

    localStorage.getItem("language") || "English";

  const t =

    translations[language] || translations.English;
  const analyzeMedicine = async () => {
    if (!file) {
      alert("Please select a medicine image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post(
        "http://127.0.0.1:8000/scan",
        formData
      );

      setResult(response.data);

      console.log("Current User:", auth.currentUser);
      console.log("Analysis:", response.data.analysis);

      if (auth.currentUser) {
        try {
          console.log("Attempting Firestore Save...");
          const docRef = await addDoc(collection(db, "scans"), {
            userId: auth.currentUser.uid,
            scannedAt: serverTimestamp(),
            analysis: response.data.analysis,
          });
          console.log("SUCCESSFULLY SAVED:", docRef.id);
        } catch (e) {
          console.error("FIRESTORE ERROR:", e);
          alert(JSON.stringify({ code: e.code, message: e.message }, null, 2));
        }
      } else {
        console.log("NO AUTH USER FOUND");
      }
    } catch (err) {

  console.error(
    "FULL ERROR:",
    err
  );

  console.error(
    "RESPONSE:",
    err.response
  );

  console.error(
    "DATA:",
    err.response?.data
  );

  alert(
    JSON.stringify(
      err.response?.data ||
      err.message,
      null,
      2
    )
  );

      const mockResult = {
        analysis: {
          medicine_name: "Unknown Medicine",
          ai_summary: "Unable to reach the AI service.",
          what_it_does: "Information unavailable",
          how_to_take: "Follow your doctor's instructions.",
          side_effects: [],
          important_warnings: [],
          who_should_be_careful: [],
          seek_medical_help_if: [],
          storage: "Not available.",
          ingredients: [],
        },
      };

      setResult(mockResult);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page">

        {/* HERO */}

        <section className="hero">

          <div className="hero-badge">
            AI Powered Medicine Analysis
          </div>

          <h1>{t.appName}</h1>

          <h2>
          {t.heroTitle}
          </h2>
          <h2>
          {t.howItWorks}
          </h2>
          <p>
            Upload medicine bottles, strips, syrups,
            prescriptions, or packaging images and let
            AI explain ingredients, side effects,
            storage instructions, dosage information,
            and important safety warnings.
          </p>

        </section>

        {/* UPLOAD CENTER */}

        <UploadCenter
          file={file}
          preview={preview}
          setFile={(selected) => {
            setFile(selected);

            if (selected) {
              setPreview(
                URL.createObjectURL(selected)
              );
            }
          }}
          onAnalyze={analyzeMedicine}
          loading={loading}
        />

        {/* OCR SCANNER */}

        {preview && (
          <ScanAnimation image={preview} />
        )}

        {/* TERMINAL LOGS */}

        {loading && (
          <TerminalLogs />
        )}

        {/* RESULTS */}

        {result?.analysis && (
          <>
            <div
              style={{
                marginTop: "60px",
                marginBottom: "40px"
              }}
            >
              <ConfidenceRing value={99.2} />
            </div>

            <SafetyGrid />

            <MedicineReport
              analysis={result.analysis}
            />
          </>
        )}

        {/* WHY MEDILENS */}

        <section
          style={{
            marginTop: "100px"
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "50px",
              fontSize: "2.5rem"
            }}
          >
            Why MediLens AI?
          </h2>

          <div className="report-grid">

            <div className="report-card green">
              <h3>Medicine Identification</h3>
              <p>
                Detect medicine names directly from
                bottles, strips, syrups and packaging.
              </p>
            </div>

            <div className="report-card purple">
              <h3>Ingredient Analysis</h3>
              <p>
                Extract active ingredients and explain
                their medical significance.
              </p>
            </div>

            <div className="report-card orange">
              <h3>Side Effect Awareness</h3>
              <p>
                Understand common and important side
                effects before taking medicines.
              </p>
            </div>

            <div className="report-card red">
              <h3>Safety Warnings</h3>
              <p>
                Receive allergy, pregnancy and dosage
                related precautions.
              </p>
            </div>

            <div className="report-card blue">
              <h3>Storage Guidance</h3>
              <p>
                Learn proper medicine storage methods
                to preserve effectiveness.
              </p>
            </div>

            <div className="report-card green">
              <h3>Instant Results</h3>
              <p>
                Get comprehensive medicine insights
                within seconds.
              </p>
            </div>

          </div>
        </section>

        {/* HOW IT WORKS */}

        <section
          style={{
            marginTop: "100px"
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              marginBottom: "50px"
            }}
          >
            How It Works
          </h2>

          <div className="safety-grid">

            <div className="safety-card">
              <h3>1. Upload</h3>
              <p>
                Upload medicine packaging image.
              </p>
            </div>

            <div className="safety-card">
              <h3>2. OCR Scan</h3>
              <p>
                AI extracts text and packaging data.
              </p>
            </div>

            <div className="safety-card">
              <h3>3. Analysis</h3>
              <p>
                Clinical NLP interprets medicine
                information.
              </p>
            </div>

            <div className="safety-card">
              <h3>4. Report</h3>
              <p>
                Receive a complete medicine report.
              </p>
            </div>

          </div>
        </section>

        {/* DISCLAIMER */}

        <div
          className="report-card"
          style={{
            marginTop: "100px"
          }}
        >
          <h2>Medical Disclaimer</h2>

          <p>
            MediLens AI is intended for informational
            and educational purposes only. It does not
            replace medical advice, diagnosis, or
            treatment from qualified healthcare
            professionals. Always consult a licensed
            physician before making medical decisions.
          </p>
        </div>
<section
  className="report-card"
  style={{
    marginTop: "80px",
    textAlign: "center"
  }}
>
  <h2>About The Creator</h2>

  <p
    style={{
      marginTop: "20px",
      color: "#94a3b8",
      lineHeight: "1.8"
    }}
  >
    Developed by Anthriksh
    <br />
    AI & Machine Learning Engineer
    <br />
    Creator of MediLens AI
  </p>
</section>
        {/* FOOTER */}

        <footer
          style={{
            marginTop: "100px",
            textAlign: "center",
            paddingBottom: "60px"
          }}
        >
          <h2>MediLens AI</h2>

          <p
            style={{
              marginTop: "10px",
              color: "#94a3b8"
            }}
          >
            Understand Medicines Instantly
          </p>

          <p
            style={{
              marginTop: "20px",
              color: "#64748b"
            }}
          >
            © 2026 MediLens AI. All Rights Reserved.
          </p>

        </footer>

      </div>
    </>
  );
}