import AdSense from "react-adsense";
import "./AdSenseComp.css";

function AdSenseComp() {
  return (
    <div className="ad-container">
      <AdSense.Google
        client="ca-pub-5878196353426013"
        slot="6221557440"
        style={{ display: "block" }}
        format="auto"
        responsive="true"
        //   layoutKey="-gw-1+2a-9x+5c"
      />
    </div>
  );
}

export default AdSenseComp;
