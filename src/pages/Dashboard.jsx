import { useState } from "react";
import Navbar from "../components/Navbar";
import generatePdf from "../utils/generatePdf";
import {
  Pill,
  AlertTriangle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";

export default function Dashboard() {
  const [expanded, setExpanded] = useState(null);

  const scans =
    JSON.parse(
      localStorage.getItem("scanHistory")
    ) || [];

  const warningCount = scans.reduce(
    (total, scan) =>
      total +
      (
        scan.analysis?.important_warnings?.length || 0
      ),
    0
  );

  return (
    <>
      <Navbar />

      <div className="page">

        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "40px",
          }}
        >
          Dashboard
        </h1>

        {/* STATS */}

        <div
          className="report-grid"
          style={{
            marginBottom: "50px",
          }}
        >
          <div className="report-card blue">
            <h3>Total Scans</h3>
            <h1>{scans.length}</h1>
          </div>

          <div className="report-card red">
            <h3>Warning Flags</h3>
            <h1>{warningCount}</h1>
          </div>

          <div className="report-card green">
            <h3>System Status</h3>
            <h1>Live</h1>
          </div>
        </div>

        {/* RECENT SCANS */}

        <h2
          style={{
            marginBottom: "25px",
          }}
        >
          Recent Medicine Scans
        </h2>

        {scans.length === 0 ? (

          <div className="report-card">
            <h3>No scans yet</h3>

            <p>
              Upload and analyze a medicine
              to see your scan history here.
            </p>
          </div>

        ) : (

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {scans.map((item) => {

              const open =
                expanded === item.id;

              const analysis =
                item.analysis;

              return (
                <div
                  key={item.id}
                  className="report-card"
                >
                  <div
                    onClick={() =>
                      setExpanded(
                        open
                          ? null
                          : item.id
                      )
                    }
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      cursor: "pointer",
                    }}
                  >
                    <div>

                      <h3>
                        {
                          analysis?.medicine_name ||
                          "Unknown Medicine"
                        }
                      </h3>

                      <p>
                        {item.scannedAt}
                      </p>

                    </div>

                    {open ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </div>

                  {open && (
                    <div
                      style={{
                        marginTop: "25px",
                      }}
                    >
                      <div className="report-grid">

                        <div className="report-card green">
                          <h3>AI Summary</h3>

                          <p>
                            {
                              analysis?.ai_summary ||
                              "No summary available."
                            }
                          </p>
                        </div>

                        <div className="report-card purple">
                          <h3>Ingredients</h3>

                          <p>
                            {
                              Array.isArray(analysis?.ingredients)
                              ? analysis.ingredients
                              .map((i) => i.name)
                              .join(", ")
                              : analysis?.ingredients ||
                              "Unknown"
                            }
                          </p>
                        </div>

                        <div className="report-card blue">
                          <h3>Storage</h3>

                          <p>
                            {
                              analysis?.storage ||
                              "Not available"
                            }
                          </p>
                        </div>

                        <div className="report-card red">
                          <h3>Warnings</h3>

                          <p>
                            {
                              analysis?.important_warnings
                                ?.join(", ") ||
                              "No warnings"
                            }
                          </p>
                        </div>

                      </div>

                    <div
  style={{
    marginTop: "20px",
    display: "flex",
    gap: "15px",
  }}
>
  <button
    onClick={() => generatePdf(item)}
    style={{
      padding: "12px 18px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }}
  >
    <Download size={18} />
    Download PDF
  </button>
</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        )}

        {/* SYSTEM STATUS */}

        <h2
          style={{
            marginTop: "70px",
            marginBottom: "25px",
          }}
        >
          System Status
        </h2>

        <div className="report-grid">

          <div className="report-card green">
            <ShieldCheck size={35} />

            <h3
              style={{
                marginTop: "15px",
              }}
            >
              Gemini AI
            </h3>

            <p>Operational</p>
          </div>

          <div className="report-card blue">
            <Pill size={35} />

            <h3
              style={{
                marginTop: "15px",
              }}
            >
              OCR Engine
            </h3>

            <p>Connected</p>
          </div>

          <div className="report-card red">
            <AlertTriangle size={35} />

            <h3
              style={{
                marginTop: "15px",
              }}
            >
              Safety Engine
            </h3>

            <p>Active</p>
          </div>

        </div>

      </div>
    </>
  );
}