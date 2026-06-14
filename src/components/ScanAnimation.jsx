export default function ScanAnimation({ image }) {
  return (
    <div className="scanner-container">

      <img
        src={image}
        alt="medicine"
        className="scanner-image"
      />

      <div className="scan-line"></div>

      <div className="ocr-box box1">
        BRAND NAME
      </div>

      <div className="ocr-box box2">
        ACTIVE INGREDIENT
      </div>

      <div className="ocr-box box3">
        DOSAGE
      </div>

    </div>
  );
}