// src/components/topbar/ScenicStage/index.tsx
// Glue file that imports the scenic layer placeholders with correct relative paths.

import SkyLayer from "./SkyLayer/SkyLayer";
import SunMoon from "./SunMoon/SunMoon";
import Lighthouse from "./Lighthouse/Lighthouse";
import LightBeam from "./LightBeam/LightBeam";
import Birds from "./Birds/Birds";
import Waves from "./Waves/Waves";
import Weather from "./Weather/Weather";

export default function ScenicStage() {
  return (
    <div style={{ position: "relative" }}>
      <SkyLayer />
      <SunMoon />
      <Lighthouse />
      <LightBeam />
      <Birds />
      <Waves />
      <Weather />
    </div>
  );
}