import Navbar from "../components/Navbar";

export default function History() {

  const scans =
    JSON.parse(
      localStorage.getItem(
        "scanHistory"
      )
    ) || [];

  return (
    <>
      <Navbar />

      <div className="page">

        <h1>
          Scan History
        </h1>

        {scans.length === 0 ? (

          <div className="history-card">
            <h3>
              No scans yet
            </h3>

            <p>
              Scan a medicine first.
            </p>
          </div>

        ) : (

          scans.map((scan) => (

            <div
              key={scan.id}
              className="history-card"
              style={{
                marginBottom: "20px"
              }}
            >
              <h3>
                {
                  scan.analysis
                    ?.medicine_name
                }
              </h3>

              <p>
                Scanned:
                {" "}
                {scan.scannedAt}
              </p>

              <p>
                {
                  scan.analysis
                    ?.ai_summary
                }
              </p>

            </div>

          ))

        )}

      </div>
    </>
  );
}