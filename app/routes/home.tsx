import Navbar from "components/Navbar";
import type { Route } from "./+types/home";
import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import { Button } from "components/ui/Button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>
          </div>
          <p>Introducing Roomify 2.0</p>
        </div>
        <h1>Build beautiful spaces at the speed of thought with Roomify</h1>
        <p className="subtitle">
          Roomify converts architectural floor plans into real, buildable layouts —
          automatically scaling dimensions, adding accurate measurements, and
          producing construction-ready plans and 3D previews. Upload a 2D floor
          plan (image or drawing) and receive a detailed, scaled plan ready for
          visualization, furniture layout suggestions, and export to common
          formats for builders and designers.
        </p>
        <div className="actions">
          <a href="#upload" className="cta">
            Start Building <ArrowRight className="icon" />
          </a>
          <Button variant="outline" size="lg" className="demo">Watch Demo</Button>
        </div>
        <div id="upload" className="upload-shell">
          <div className="grid-overlay" />
          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers className="icon" />
              </div>
              <h3>Upload the floor plan</h3>
              <p>Supports Jpg, Png formats upto 10Mb</p>
            </div>
            <p>Upload Images</p>
          </div>
        </div>
      </section>
      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p>Your latest work and shared community projects, all in one place</p>
            </div>
          </div>
          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
                <img src="https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png" alt="Project" />
                <div className="badge">
                  <span>Community</span>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <h3>Project  Manhattan</h3>
                  <div className="meta">
                    <Clock size={12} />
                    <span>{new Date('01.01.2027').toLocaleDateString()}</span>
                    <span>By Sahan Weerakoon</span>
                  </div>
                </div>
                <div className="arrow">
                  <ArrowUpRight size={16} /> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
