import Navbar from "../components/Navbar";
import translations from "../data/translations";
export default function Analytics() {


const language =

  localStorage.getItem("language") ||

  "English";

const t =

  translations[language] ||

  translations.English;
  return (
    <>
      <Navbar />

      <div className="page">

        <h1>Analytics</h1>

        <div className="chart-card">

          OCR Accuracy

          <h2>99.2%</h2>

        </div>

      </div>
    </>
  );
}