import { UploadCloud, ImageIcon, ScanSearch } from "lucide-react";

export default function UploadCenter({
  file,
  preview,
  setFile,
  onAnalyze,
  loading,
}) {
  return (
    <section
      style={{
        marginBottom: "80px",
      }}
    >
      <div
        className="glass"
        style={{
          padding: "50px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <UploadCloud
            size={60}
            color="#67e8f9"
          />

          <h2
            style={{
              fontSize: "2rem",
              marginTop: "15px",
            }}
          >
            Upload Medicine Package
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "10px",
            }}
          >
            Upload medicine bottles, strips,
            syrup labels, prescriptions,
            or packaging images.
          </p>
        </div>

        <label
          htmlFor="medicine-upload"
          style={{
            display: "block",
            border: "2px dashed rgba(6,182,212,.35)",
            borderRadius: "25px",
            padding: "60px",
            textAlign: "center",
            cursor: "pointer",
            background:
              "rgba(6,182,212,.03)",
            transition: ".3s",
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              style={{
                maxWidth: "350px",
                width: "100%",
                borderRadius: "20px",
              }}
            />
          ) : (
            <>
              <ImageIcon
                size={55}
                color="#67e8f9"
              />

              <h3
                style={{
                  marginTop: "20px",
                }}
              >
                Drag & Drop Medicine Image
              </h3>

              <p
                style={{
                  color: "#94a3b8",
                  marginTop: "10px",
                }}
              >
                JPG • PNG • WEBP
              </p>
            </>
          )}

          <input
            id="medicine-upload"
            type="file"
            accept="image/*"
            style={{
              display: "none",
            }}
            onChange={(e) => {
              const selected =
                e.target.files[0];

              if (selected) {
                setFile(selected);
              }
            }}
          />
        </label>

        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <button
            onClick={onAnalyze}
            disabled={loading}
            style={{
              padding:
                "18px 40px",
              fontSize: "17px",
              borderRadius: "15px",
              background:
                "linear-gradient(135deg,#06b6d4,#3b82f6)",
              border: "none",
              color: "white",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {loading
              ? "Analyzing..."
              : "Analyze Medicine"}
          </button>
        </div>
      </div>
    </section>
  );
}