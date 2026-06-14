import {
  Brain,
  Pill,
  ClipboardList,
  AlertTriangle,
  ShieldAlert,
  Siren,
  Thermometer,
  Dna,
} from "lucide-react";

export default function MedicineReport({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="report-section">

      <div className="summary-banner">
        <h2>{analysis.medicine_name}</h2>

        <p
          style={{
            marginTop: "15px",
            fontSize: "1.1rem",
            lineHeight: "1.8",
          }}
        >
          {analysis.ai_summary}
        </p>
      </div>

      <div className="report-grid">

        {/* WHAT IT DOES */}

        <div className="report-card green">
          <Pill size={22} />
          <h3>What This Medicine Does</h3>
          <p>{analysis.what_it_does}</p>
        </div>

        {/* HOW TO TAKE */}

        <div className="report-card blue">
          <ClipboardList size={22} />
          <h3>How To Take It</h3>
          <p>{analysis.how_to_take}</p>
        </div>

        {/* SIDE EFFECTS */}

        <div className="report-card orange">
          <AlertTriangle size={22} />
          <h3>Possible Side Effects</h3>

          <ul>
            {analysis.side_effects?.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

        {/* WARNINGS */}

        <div className="report-card red">
          <ShieldAlert size={22} />
          <h3>Important Warnings</h3>

          <ul>
            {analysis.important_warnings?.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

        {/* WHO SHOULD BE CAREFUL */}

        <div className="report-card purple">
          <Brain size={22} />
          <h3>Who Should Be Careful?</h3>

          <ul>
            {analysis.who_should_be_careful?.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

        {/* SEEK MEDICAL HELP */}

        <div className="report-card orange">
          <Siren size={22} />
          <h3>Seek Medical Help If</h3>

          <ul>
            {analysis.seek_medical_help_if?.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

        {/* STORAGE */}

        <div className="report-card blue">
          <Thermometer size={22} />
          <h3>Storage Instructions</h3>
          <p>{analysis.storage}</p>
        </div>

        {/* INGREDIENTS */}

        <div className="report-card purple">
          <Dna size={22} />
          <h3>Ingredients Explained</h3>

          {analysis.ingredients?.map(
            (ingredient, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "15px",
                }}
              >
                <strong>
                  {ingredient.name}
                </strong>

                <p>
                  {ingredient.purpose}
                </p>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
}