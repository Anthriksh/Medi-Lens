export default function ConfidenceRing({
  value = 99
}) {

  const radius = 70;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (value / 100) *
    circumference;

  return (

    <div className="ring-container">

      <svg
        width="180"
        height="180"
      >
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth="12"
        />

        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
        />
      </svg>

      <div className="ring-text">

        {value}%

        <span>
          AI Confidence
        </span>

      </div>

    </div>
  );
}