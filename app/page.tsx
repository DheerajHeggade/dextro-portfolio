"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Section = "about" | "work" | "review";

const sections: {
  id: Section;
  label: string;
  number: string;
}[] = [
  {
    id: "about",
    label: "ABOUT ME",
    number: "01",
  },
  {
    id: "work",
    label: "WORK",
    number: "02",
  },
  {
    id: "review",
    label: "REVIEW",
    number: "03",
  },
];

export default function Home() {
  const [active, setActive] = useState<Section>("about");

  return (
    <main className="dextro-os">

      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div className="os-noise" aria-hidden="true" />

      <motion.div
        className="orb orb-one"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="orb orb-two"
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 60, -30, 0],
          scale: [1, 0.9, 1.12, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header className="os-topbar">

        <div className="dextro-mark">

          <span
            className="dextro-indicator"
            aria-hidden="true"
          />

          <span>DEXTRO</span>

        </div>

        <div className="system-readout">

          <span
            className="live-dot"
            aria-hidden="true"
          />

          ONLINE

          <span
            className="readout-divider"
            aria-hidden="true"
          />

          CREATIVE SYSTEM

        </div>

      </header>

      {/* =====================================================
          MAIN OS STAGE
      ===================================================== */}

      <section className="os-stage">

        <AnimatePresence mode="wait">

          {/* =================================================
              ABOUT ME
          ================================================= */}

          {active === "about" && (
            <OSWindow
              key="about"
              metaNumber="01"
              metaTitle="ABOUT ME"
              cornerId="DXT_001"
            >

              <div className="about-layout">

                {/* ABOUT TEXT */}

                <div className="about-copy">

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.15,
                      duration: 0.5,
                    }}
                  >

                    <p className="eyebrow">
                      CINEMATIC EDITOR / MOTION DESIGNER
                    </p>

                    <h1>
                      DEXTRO
                    </h1>

                    <p className="about-description">
                      Hey, I&apos;m Dheeraj — a creative editor
                      and visual designer who loves turning
                      simple ideas into visuals that feel
                      cinematic, meaningful and alive. I&apos;m
                      always experimenting with editing,
                      motion, sound and design to create work
                      that people actually remember.
                    </p>

                  </motion.div>

                  <motion.button
                    className="glass-action"
                    onClick={() => setActive("work")}
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >

                    <span>
                      EXPLORE MY WORK
                    </span>

                    <span className="arrow">
                      ↗
                    </span>

                  </motion.button>

                </div>

                {/* =================================================
                    PROFILE PHOTO
                ================================================= */}

                <motion.div
                  className="portrait-placeholder"
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.25,
                    duration: 0.7,
                  }}
                >

                  <div className="portrait-glass">

                    <img
                      src="/images/dextro-profile.jpg"
                      alt="Dheeraj Heggade"
                      className="dextro-profile-image"
                    />

                    <div className="portrait-overlay">

                      <span>
                        Dheeraj Heggade
                      </span>

                      <small>
                        CREATIVE / VISUALS
                      </small>

                    </div>

                  </div>

                </motion.div>

              </div>

              {/* ABOUT FOOTER */}

              <div className="about-footer">

                <span>EDITING</span>
                <span>MOTION</span>
                <span>COLOR</span>
                <span>DESIGN</span>

              </div>

            </OSWindow>
          )}

          {/* =================================================
              WORK
          ================================================= */}

          {active === "work" && (
            <OSWindow
              key="work"
              metaNumber="02"
              metaTitle="SELECTED WORK"
              cornerId="DXT_002"
            >

              <div className="work-header">

                <div>

                  <p className="eyebrow">
                    EDITING / MOTION / VISUAL DESIGN
                  </p>

                  <h2>
                    WORK
                  </h2>

                </div>

                <span className="work-count">
                  SELECTED / 2026
                </span>

              </div>

              <div className="project-grid">

                <ProjectCard
                  number="001"
                  title="TRP INDIA"
                  category="DOCUMENTARY / BRAND"
                />

                <ProjectCard
                  number="002"
                  title="WAY2ASK AI"
                  category="CINEMATIC EDIT"
                />

                <ProjectCard
                  number="003"
                  title="MOTION STUDIES"
                  category="AFTER EFFECTS"
                />

              </div>

            </OSWindow>
          )}

          {/* =================================================
              REVIEW
          ================================================= */}

          {active === "review" && (
            <OSWindow
              key="review"
              metaNumber="03"
              metaTitle="CLIENT FEEDBACK"
              cornerId="DXT_003"
            >

              <div className="review-layout">

                <div>

                  <p className="eyebrow">
                    YOUR EXPERIENCE MATTERS
                  </p>

                  <h2>
                    REVIEW
                  </h2>

                  <p className="review-description">
                    Rate the work and leave a short review.
                    Maximum 50 words.
                  </p>

                </div>

                <div className="review-box">

                  <div
                    className="stars"
                    style={{
                      display: "flex",
                      gap: "6px",
                      marginBottom: "25px",
                    }}
                  >

                    {[1, 2, 3, 4, 5].map((star) => (

                      <motion.span
                        key={star}
                        style={{
                          cursor: "pointer",
                        }}
                        whileHover={{
                          scale: 1.2,
                          color:
                            "rgba(255, 255, 255, 1)",
                        }}
                        whileTap={{
                          scale: 0.9,
                        }}
                      >
                        ★
                      </motion.span>

                    ))}

                  </div>

                  <textarea
                    placeholder="Write about your experience..."
                    maxLength={300}
                    spellCheck={false}
                  />

                  <div className="review-bottom">

                    <span>
                      0 / 50 WORDS
                    </span>

                    <motion.button
                      className="glass-action small"
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                    >

                      SUBMIT

                      <span>
                        ↗
                      </span>

                    </motion.button>

                  </div>

                </div>

              </div>

            </OSWindow>
          )}

        </AnimatePresence>

      </section>

      {/* =====================================================
          LIQUID GLASS NAVIGATION
      ===================================================== */}

      <nav className="liquid-nav">

        {sections.map((section) => {

          const isActive =
            active === section.id;

          return (
            <button
              key={section.id}
              className={`nav-button ${
                isActive ? "selected" : ""
              }`}
              onClick={() =>
                setActive(section.id)
              }
            >

              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="nav-liquid-highlight"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 0.8,
                  }}
                />
              )}

              <span className="nav-number">
                {section.number}
              </span>

              <span className="nav-label">
                {section.label}
              </span>

            </button>
          );

        })}

      </nav>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="os-footer">

        <span>
          DEXTRO / CREATIVE PORTFOLIO
        </span>

        <span>
          2026
        </span>

      </footer>

    </main>
  );
}


/* =========================================================
   REUSABLE OS WINDOW
========================================================= */

function OSWindow({
  metaNumber,
  metaTitle,
  cornerId,
  children,
}: {
  metaNumber: string;
  metaTitle: string;
  cornerId: string;
  children: React.ReactNode;
}) {

  return (

    <motion.section
      className="os-window"

      initial={{
        opacity: 0,
        scale: 0.96,
        y: 20,
        filter: "blur(12px)",
      }}

      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
      }}

      exit={{
        opacity: 0,
        scale: 1.02,
        y: -15,
        filter: "blur(8px)",
      }}

      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >

      <div
        className="glass-highlight"
        aria-hidden="true"
      />

      <div
        className="window-grid"
        aria-hidden="true"
      />

      <div className="window-content">

        <div className="section-meta">

          <span>
            {metaNumber}
          </span>

          <span>
            {metaTitle}
          </span>

        </div>

        {children}

      </div>

      <div
        className="window-corner"
        aria-hidden="true"
      >
        {cornerId}
      </div>

    </motion.section>

  );
}


/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  number,
  title,
  category,
}: {
  number: string;
  title: string;
  category: string;
}) {

  return (

    <motion.article
      className="project-card"

      whileHover={{
        y: -8,
        scale: 1.015,
      }}

      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
      }}
    >

      <div className="project-image">

        <div className="project-placeholder">

          <span>
            PROJECT {number}
          </span>

          <small>
            VIDEO / IMAGE
          </small>

        </div>

        <div className="project-play">
          ▶
        </div>

      </div>

      <div className="project-info">

        <div>

          <span className="project-number">
            {number}
          </span>

          <h3>
            {title}
          </h3>

          <p>
            {category}
          </p>

        </div>

        <span className="project-arrow">
          ↗
        </span>

      </div>

    </motion.article>

  );
}