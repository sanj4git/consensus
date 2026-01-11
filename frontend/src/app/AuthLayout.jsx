import { Outlet } from "react-router-dom";
import Antigravity from "../components/ui/Antigravity";

export default function AuthLayout() {
  return (
    <div className="auth-page-wrapper">
      
      {/* 🌌 BACKGROUND LAYER (Defined Once) */}
      <div className="auth-background-layer">
        <div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
          <Antigravity
            count={300}
            magnetRadius={10}
            ringRadius={10}
            waveSpeed={0.4}
            waveAmplitude={1}
            particleSize={2}
            lerpSpeed={0.1}
            color="#f98639"
            autoAnimate={false}
            particleVariance={1}
            rotationSpeed={0}
            depthFactor={1.6}
            pulseSpeed={3}
            particleShape="capsule"
            fieldStrength={10}
          />
        </div>
      </div>

      {/* 🔒 CONTENT LAYER (Login/Register goes here) */}
      <div className="auth-content-layer">
        <Outlet />
      </div>

    </div>
  );
}