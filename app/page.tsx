"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { supabase } from "../lib/supabase";

/* =========================================================
   TYPES
========================================================= */

type Section = "about" | "work" | "review";

type Project = {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  youtubeUrl: string;
  start: number;
  glowOne: string;
  glowTwo: string;
  glowThree: string;
};

/* =========================================================
   NAVIGATION
========================================================= */

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

/* =========================================================
   PROJECT DATA

   Add future projects here.

   Example:

   {
     id: "002",
     title: "TRP INDIA",
     category: "DOCUMENTARY / BRAND FILM",
     youtubeId: "YOUR_ID",
     youtubeUrl: "https://www.youtube.com/watch?v=YOUR_ID",
     start: 0,
     glowOne: "#7b5cff",
     glowTwo: "#ff6b35",
     glowThree: "#3f8cff",
   }
========================================================= */


/* =========================================================
   SOFTWARE I USE
========================================================= */

const software = [
  {
    name: "Premiere Pro",
    short: "PR",
    image: "/Images/software-premiere-pro.png",
  },
  {
    name: "After Effects",
    short: "AE",
    image: "/Images/software-after-effects.png",
  },
  {
    name: "Audacity",
    short: "AU",
    image: "/Images/software-audacity.png",
  },
];

const projects: Project[] = [
  {
    id: "001",
    title: "STRANGER THINGS IS REAL",
    category: "DOCUMENTARY / CINEMATIC EDIT",
    youtubeId: "7ACJBmh-8mA",
    youtubeUrl:
      "https://www.youtube.com/watch?v=7ACJBmh-8mA",
    start: 125,
    glowOne: "#7b5cff",
    glowTwo: "#ff6b35",
    glowThree: "#3f8cff",
  },
  {
    id: "002",
    title: "CINEMATIC EDIT",
    category: "VIDEO EDITING / MOTION DESIGN",
    youtubeId: "xXtvlg5Lm7U",
    youtubeUrl:
      "https://www.youtube.com/watch?v=xXtvlg5Lm7U",
    start: 71,
    glowOne: "#ff5c7a",
    glowTwo: "#6b7cff",
    glowThree: "#ffb35c",
  },
  {
    id: "003",
    title: "SELECTED WORK 003",
    category: "CINEMATIC EDIT / VISUAL DESIGN",
    youtubeId: "9geUbo1LNpQ",
    youtubeUrl:
      "https://www.youtube.com/watch?v=9geUbo1LNpQ",
    start: 437,
    glowOne: "#6d5cff",
    glowTwo: "#ff4f81",
    glowThree: "#4fc3ff",
  },
  {
    id: "004",
    title: "SELECTED WORK 004",
    category: "CINEMATIC EDIT / VISUAL STORYTELLING",
    youtubeId: "QgBInVjh-SQ",
    youtubeUrl:
      "https://www.youtube.com/watch?v=QgBInVjh-SQ",
    start: 507,
    glowOne: "#ff6a3d",
    glowTwo: "#725cff",
    glowThree: "#45d4ff",
  },
  {
    id: "005",
    title: "SELECTED WORK 005",
    category: "CINEMATIC EDIT / VISUAL DESIGN",
    youtubeId: "qsnb_nXeTWk",
    youtubeUrl:
      "https://www.youtube.com/watch?v=qsnb_nXeTWk",
    start: 0,
    glowOne: "#5c8cff",
    glowTwo: "#ff5c9d",
    glowThree: "#7bffcf",
  },
  {
    id: "006",
    title: "SELECTED WORK 006",
    category: "CINEMATIC EDIT / MOTION DESIGN",
    youtubeId: "LVZt3D8Jels",
    youtubeUrl:
      "https://www.youtube.com/watch?v=LVZt3D8Jels",
    start: 378,
    glowOne: "#ff7b4d",
    glowTwo: "#5f6cff",
    glowThree: "#f4c95d",
  },
  {
    id: "007",
    title: "SELECTED WORK 007",
    category: "CINEMATIC EDIT / VISUAL STORYTELLING",
    youtubeId: "5p3PzDxbbWw",
    youtubeUrl:
      "https://www.youtube.com/watch?v=5p3PzDxbbWw",
    start: 51,
    glowOne: "#ff536f",
    glowTwo: "#5c7cff",
    glowThree: "#ffb35c",
  },
  {
    id: "008",
    title: "SELECTED WORK 008",
    category: "CINEMATIC EDIT / VISUAL DESIGN",
    youtubeId: "PO_JQbayYbE",
    youtubeUrl:
      "https://www.youtube.com/watch?v=PO_JQbayYbE",
    start: 0,
    glowOne: "#7b6cff",
    glowTwo: "#ff5f7a",
    glowThree: "#4dd9ff",
  },
  {
    id: "009",
    title: "SELECTED WORK 009",
    category: "CINEMATIC EDIT / MOTION DESIGN",
    youtubeId: "tk7u-nr0wdo",
    youtubeUrl:
      "https://www.youtube.com/watch?v=tk7u-nr0wdo",
    start: 0,
    glowOne: "#ff704d",
    glowTwo: "#5c7cff",
    glowThree: "#d6ff63",
  },
];

/* =========================================================
   YOUTUBE TYPES
========================================================= */

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  seekTo: (
    seconds: number,
    allowSeekAhead: boolean
  ) => void;
  destroy: () => void;
};

type YouTubeEvent = {
  target: YouTubePlayer;
  data: number;
};

type YouTubePlayerConstructor = new (
  element: string | HTMLElement,
  options: {
    videoId: string;

    playerVars?: Record<
      string,
      number | string
    >;

    events?: {
      onReady?: (
        event: YouTubeEvent
      ) => void;

      onStateChange?: (
        event: YouTubeEvent
      ) => void;

      onError?: (
        event: unknown
      ) => void;
    };
  }
) => YouTubePlayer;

declare global {
  interface Window {
    YT?: {
      Player: YouTubePlayerConstructor;

      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };

    onYouTubeIframeAPIReady?: () => void;
  }
}

/* =========================================================
   YOUTUBE API LOADER

   One shared loader prevents multiple components from
   overwriting YouTube's global callback.
========================================================= */

let youtubeApiPromise:
  | Promise<void>
  | null = null;

function loadYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error(
        "YouTube API can only load in the browser."
      )
    );
  }

  if (
    window.YT &&
    window.YT.Player
  ) {
    return Promise.resolve();
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise =
    new Promise<void>((resolve, reject) => {
      const existingScript =
        document.querySelector(
          'script[src="https://www.youtube.com/iframe_api"]'
        );

      const previousCallback =
        window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady =
        () => {
          previousCallback?.();

          if (
            window.YT &&
            window.YT.Player
          ) {
            resolve();
          } else {
            reject(
              new Error(
                "YouTube API failed to initialize."
              )
            );
          }
        };

      if (existingScript) {
        return;
      }

      const script =
        document.createElement("script");

      script.src =
        "https://www.youtube.com/iframe_api";

      script.async = true;

      script.onerror = () => {
        youtubeApiPromise = null;

        reject(
          new Error(
            "Unable to load YouTube API."
          )
        );
      };

      document.body.appendChild(script);
    });

  return youtubeApiPromise;
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Home() {
  const [active, setActive] =
    useState<Section>("about");

  const [portraitIntensity, setPortraitIntensity] =
    useState(0);

  const handlePortraitMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const centerX =
      rect.left + rect.width / 2;

    const centerY =
      rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(event.clientX - centerX, 2) +
        Math.pow(event.clientY - centerY, 2)
    );

    const maxDistance =
      Math.max(rect.width, rect.height) * 0.9;

    const intensity = Math.max(
      0,
      Math.min(
        1,
        1 - distance / maxDistance
      )
    );

    setPortraitIntensity(intensity);
  };

  const handlePortraitLeave = () => {
    setPortraitIntensity(0);
  };

  return (
    <main className="dextro-os">

      {/* =====================================================
          ATMOSPHERE
      ===================================================== */}

      <div
        className="os-noise"
        aria-hidden="true"
      />

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
          MAIN STAGE
      ===================================================== */}

      <section className="os-stage">

        <AnimatePresence mode="wait">

          {/* =================================================
              ABOUT
          ================================================= */}

          {active === "about" && (
            <OSWindow
              key="about"
              metaNumber="01"
              metaTitle="ABOUT ME"
              cornerId="DXT_001"
            >

              <div className="about-layout">

                <div className="about-copy">

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >

                    <div className="about-kicker">
                      <span className="about-kicker-dot" />
                      <span>01 / CREATIVE PROFILE</span>
                    </div>

                    <p className="eyebrow about-role">
                      CINEMATIC EDITOR / MOTION DESIGNER
                    </p>

                    <h1 className="about-title">
                      DEXTRO<span>.</span>
                    </h1>

                    <div className="about-rule" />

                    <p className="about-description">
                      Hey, I&apos;m Dheeraj — a creative editor and visual designer
                      focused on turning simple ideas into visuals that feel
                      cinematic, meaningful and alive.
                    </p>

                    <p className="about-description about-description-secondary">
                      I work across editing, motion, sound, colour and visual
                      design to create work that feels intentional, polished
                      and memorable.
                    </p>

                    <div className="about-specialties">
                      <span>EDITING</span>
                      <span>MOTION</span>
                      <span>COLOR</span>
                      <span>DESIGN</span>
                    </div>

                  </motion.div>

                  <motion.div
                    className="creative-collaboration"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.18,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >

                    <div className="company-mark">
                      <img
                        src="/Images/motion-mix-media-logo.png"
                        alt="Motion Mix Media"
                      />
                    </div>

                    <div className="company-copy">
                      <span className="company-label">
                        CURRENTLY WORKING AT
                      </span>

                      <strong>
                        Motion Mix Media
                      </strong>

                      <span className="team-label">
                        TEAMMATE&nbsp; / &nbsp;Chandan S
                      </span>
                    </div>

                    <div className="company-status">
                      <span className="company-status-dot" />
                      ACTIVE
                    </div>

                  </motion.div>

                  <motion.button
                    type="button"
                    className="glass-action about-work-button"
                    onClick={() => setActive("work")}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>
                      EXPLORE SELECTED WORK
                    </span>
                    <span
                      aria-hidden="true"
                      className="about-button-arrow"
                    >
                      ↗
                    </span>
                  </motion.button>

                </div>

                <motion.div
                  className="portrait-placeholder about-portrait"
                  onMouseMove={handlePortraitMove}
                  onMouseLeave={handlePortraitLeave}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.12,
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >

                  <div className="portrait-glass">

                    <img
                      src="/Images/dextro-profile.jpg"
                      alt="Dheeraj Heggade"
                      className="dextro-profile-image"
                      style={{
                        filter: `grayscale(${100 - portraitIntensity * 100}%) contrast(1.04)`,
                      }}
                    />

                    <div className="portrait-topline">
                      <span>DXT / 001</span>
                      <span>PROFILE</span>
                    </div>

                    <div className="portrait-overlay">
                      <span>
                        Dheeraj Heggade
                      </span>
                      <small>
                        CREATIVE / VISUALS
                      </small>
                    </div>

                    <div className="portrait-corner">
                      AVAILABLE FOR CREATIVE WORK
                    </div>

                  </div>

                </motion.div>

              </div>

              <div className="about-footer">
                <span>EDITING</span>
                <span>MOTION DESIGN</span>
                <span>COLOR</span>
                <span>VISUAL DESIGN</span>
                <span>DEXTRO / 001</span>
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
                  {String(
                    projects.length
                  ).padStart(2, "0")}{" "}
                  PROJECT
                  {projects.length !== 1
                    ? "S"
                    : ""}
                </span>

              </div>

              <div className="project-grid">

                {projects.map(
                  (project) => (
                    <YouTubeProject
                      key={project.id}
                      project={project}
                    />
                  )
                )}

              </div>

              {/* =================================================
                  SOFTWARE I USE
              ================================================= */}

              <section className="software-section">

                <div className="software-heading">

                  <div>
                    <p className="eyebrow">
                      TOOLS / CREATIVE WORKFLOW
                    </p>

                    <h3>
                      The Software I Use
                    </h3>
                  </div>

                  <span className="software-count">
                    03 TOOLS
                  </span>

                </div>

                <div className="software-strip">

                  {software.map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      className="software-card"
                      initial={{
                        opacity: 0,
                        y: 18,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          0.08 * index,
                        duration: 0.45,
                      }}
                      whileHover={{
                        y: -6,
                        scale: 1.025,
                      }}
                    >

                      <div className="software-icon-wrap">

                        <img
                          src={tool.image}
                          alt={`${tool.name} icon`}
                          className="software-icon-image"
                        />

                        <div
                          className="software-icon-shine"
                          aria-hidden="true"
                        />

                      </div>

                      <div className="software-label">

                        <span className="software-short">
                          {tool.short}
                        </span>

                        <span className="software-name">
                          {tool.name}
                        </span>

                      </div>

                    </motion.div>
                  ))}

                </div>

                <p className="software-note">
                  EDITING / MOTION / COLOR / SOUND / DESIGN
                </p>

              </section>

            </OSWindow>
          )}

          {/* =================================================
              REVIEW
          ================================================= */}

          {active === "review" && (
            <ReviewSection
              key="review"
            />
          )}

        </AnimatePresence>

      </section>

      {/* =====================================================
          LIQUID GLASS NAVIGATION
      ===================================================== */}

      <nav
        className="liquid-nav"
        aria-label="Main navigation"
      >

        {sections.map(
          (section) => {

            const isActive =
              active === section.id;

            return (
              <button
                key={section.id}
                type="button"
                className={`nav-button ${
                  isActive
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setActive(
                    section.id
                  )
                }
                aria-current={
                  isActive
                    ? "page"
                    : undefined
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
          }
        )}

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
   OS WINDOW
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
  children: ReactNode;
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
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
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
   REVIEW SECTION
========================================================= */

function ReviewSection() {
  const [name, setName] =
    useState("");

  const [rating, setRating] =
    useState(0);

  const [review, setReview] =
    useState("");

  const [reviews, setReviews] =
    useState<{
      id: string;
      user_id: string | null;
      user_name: string;
      user_avatar: string | null;
      rating: number;
      review: string;
      created_at: string;
      is_edited: boolean;
      heart_count: number;
      broken_heart_count: number;
      my_reaction: "heart" | "broken_heart" | null;
    }[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [ownedReviewIds, setOwnedReviewIds] =
    useState<string[]>([]);

  const words =
    review
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  const wordCount =
    review.trim()
      ? words.length
      : 0;

  const cleanName =
    name.trim();

  const canSubmit =
    cleanName.length >= 2 &&
    cleanName.length <= 40 &&
    rating > 0 &&
    wordCount > 0 &&
    wordCount <= 50 &&
    !submitting;

  const loadReviews = async () => {
    const {
      data,
      error,
    } = await supabase
      .from("reviews")
      .select(
        "id, user_id, user_name, user_avatar, rating, review, created_at, is_edited"
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Supabase review load error:",
        {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        }
      );

      setMessage(
        "Could not load reviews right now."
      );

      setReviews([]);
      return;
    }

    if (data) {
      const visitorId = getVisitorId();

      let reactionRows: {
        review_id: string;
        heart_count: number;
        broken_heart_count: number;
        my_reaction: "heart" | "broken_heart" | null;
      }[] = [];

      if (visitorId) {
        const { data: reactions, error: reactionError } =
          await supabase.rpc("get_review_reactions", {
            p_visitor_id: visitorId,
          });

        if (reactionError) {
          console.error("Supabase reaction load error:", {
            code: reactionError.code,
            message: reactionError.message,
            details: reactionError.details,
            hint: reactionError.hint,
          });
        } else if (reactions) {
          reactionRows = reactions as typeof reactionRows;
        }
      }

      const reactionMap = new Map(
        reactionRows.map((row) => [row.review_id, row])
      );

      setReviews(
        data.map((item) => {
          const reaction = reactionMap.get(item.id);

          return {
            ...item,
            heart_count: Number(reaction?.heart_count ?? 0),
            broken_heart_count: Number(
              reaction?.broken_heart_count ?? 0
            ),
            my_reaction: reaction?.my_reaction ?? null,
          };
        })
      );
    }
  };

  useEffect(() => {
    let mounted = true;

    const initialise =
      async () => {
        await loadReviews();

        const token = getEditToken();

        if (token) {
          const { data } = await supabase.rpc(
            "get_owned_review_ids",
            { p_edit_token: token }
          );

          if (mounted && data) {
            setOwnedReviewIds(data as string[]);
          }
        }

        if (mounted) {
          setLoading(false);
        }
      };

    initialise();

    return () => {
      mounted = false;
    };
  }, []);

  const handleReaction = async (
    reviewId: string,
    reaction: "heart" | "broken_heart"
  ) => {
    const visitorId = getVisitorId();

    if (!visitorId) {
      return;
    }

    const current = reviews.find(
      (item) => item.id === reviewId
    );

    if (!current) {
      return;
    }

    const previousReaction = current.my_reaction;

    setReviews((items) =>
      items.map((item) => {
        if (item.id !== reviewId) {
          return item;
        }

        let heartCount = item.heart_count;
        let brokenCount = item.broken_heart_count;

        if (previousReaction === "heart") {
          heartCount -= 1;
        }

        if (previousReaction === "broken_heart") {
          brokenCount -= 1;
        }

        const nextReaction =
          previousReaction === reaction
            ? null
            : reaction;

        if (nextReaction === "heart") {
          heartCount += 1;
        }

        if (nextReaction === "broken_heart") {
          brokenCount += 1;
        }

        return {
          ...item,
          heart_count: Math.max(0, heartCount),
          broken_heart_count: Math.max(0, brokenCount),
          my_reaction: nextReaction,
        };
      })
    );

    const { data, error } = await supabase.rpc(
      "toggle_review_reaction",
      {
        p_review_id: reviewId,
        p_visitor_id: visitorId,
        p_reaction: reaction,
      }
    );

    if (error || !data?.[0]) {
      console.error("Supabase reaction update error:", {
        code: error?.code,
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
      });

      await loadReviews();
      return;
    }

    const result = data[0];

    setReviews((items) =>
      items.map((item) =>
        item.id === reviewId
          ? {
              ...item,
              heart_count: Number(result.heart_count ?? 0),
              broken_heart_count: Number(
                result.broken_heart_count ?? 0
              ),
              my_reaction: result.my_reaction ?? null,
            }
          : item
      )
    );
  };

  const handleReviewChange = (
    value: string
  ) => {
    const nextWords =
      value
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (nextWords.length > 50) {
      return;
    }

    setReview(value);
    setMessage("");
  };

  const handleNameChange = (
    value: string
  ) => {
    if (value.length > 40) {
      return;
    }

    setName(value);
    setMessage("");
  };

  const getVisitorId = () => {
    if (typeof window === "undefined") {
      return null;
    }

    const key = "dextro-review-visitor-id";
    let existing = window.localStorage.getItem(key);

    if (!existing) {
      existing = crypto.randomUUID();
      window.localStorage.setItem(key, existing);
    }

    return existing;
  };

  const getEditToken = () => {
    if (typeof window === "undefined") {
      return null;
    }

    const key = "dextro-review-edit-token";
    let existing = window.localStorage.getItem(key);

    if (!existing) {
      existing = crypto.randomUUID();
      window.localStorage.setItem(key, existing);
    }

    return existing;
  };

  const resetReviewForm = () => {
    setEditingId(null);
    setName("");
    setRating(0);
    setReview("");
  };

  const handleEdit = (item: typeof reviews[number]) => {
    setEditingId(item.id);
    setName(item.user_name);
    setRating(item.rating);
    setReview(item.review);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (deletingId) {
      return;
    }

    const confirmed = window.confirm(
      "Delete your review? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    const token = getEditToken();
    if (!token) {
      setMessage("Could not verify review ownership.");
      return;
    }

    setDeletingId(id);
    setMessage("");

    const { error } = await supabase.rpc(
      "delete_review",
      {
        p_review_id: id,
        p_edit_token: token,
      }
    );

    if (error) {
      console.error("Supabase review delete error:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      setMessage("Could not delete your review. Please try again.");
      setDeletingId(null);
      return;
    }

    setReviews((current) =>
      current.filter((item) => item.id !== id)
    );

    setOwnedReviewIds((current) =>
      current.filter((reviewId) => reviewId !== id)
    );

    if (editingId === id) {
      resetReviewForm();
    }

    setMessage("Review deleted successfully.");
    setDeletingId(null);
  };

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }

    setSubmitting(true);
    setMessage("");

    const visitorId = getVisitorId();
    const editToken = getEditToken();

    if (!visitorId || !editToken) {
      setMessage("Could not prepare your review. Please try again.");
      setSubmitting(false);
      return;
    }

    if (editingId) {
      const { error } = await supabase.rpc(
        "update_review",
        {
          p_review_id: editingId,
          p_edit_token: editToken,
          p_user_name: cleanName,
          p_rating: rating,
          p_review: review.trim(),
        }
      );

      if (error) {
        console.error("Supabase review update error:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        setMessage("Could not update your review. Please try again.");
        setSubmitting(false);
        return;
      }

      resetReviewForm();
      setMessage("Review updated successfully.");
      await loadReviews();
      setSubmitting(false);
      return;
    }

    const {
      error,
    } = await supabase.rpc(
      "create_review",
      {
        p_edit_token: editToken,
        p_user_id: visitorId,
        p_user_name: cleanName,
        p_rating: rating,
        p_review: review.trim(),
      }
    );

    if (error) {
      console.error(
        "Supabase review submit error:",
        {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        }
      );

      setMessage(
        "Could not post your review. Please try again."
      );

      setSubmitting(false);
      return;
    }

    resetReviewForm();
    setMessage(
      "Review posted successfully."
    );

    await loadReviews();

    if (editToken) {
      const { data: ownedIds } = await supabase.rpc(
        "get_owned_review_ids",
        { p_edit_token: editToken }
      );

      if (ownedIds) {
        setOwnedReviewIds(ownedIds as string[]);
      }
    }

    setSubmitting(false);
  };

  return (
    <OSWindow
      metaNumber="03"
      metaTitle="CLIENT FEEDBACK"
      cornerId="DXT_003"
    >

      <div className="review-layout">

        <div className="review-intro">

          <div className="review-section-index">
            <span>03</span>
            <span>CLIENT FEEDBACK</span>
          </div>

          <div className="review-logo-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" role="presentation">
              <rect
                x="8"
                y="8"
                width="48"
                height="48"
                rx="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M19 25h26M19 32h18M19 39h12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="45"
                cy="40"
                r="3"
                fill="currentColor"
              />
            </svg>
          </div>

          <p className="eyebrow">
            CLIENT FEEDBACK
          </p>

          <h2 className="review-title">
            YOUR
            <br />
            TAKE<span>.</span>
          </h2>

          <p className="review-description">
            Seen the work? Tell me what you think.
            A quick rating and a short note is all
            it takes.
          </p>

          <div className="review-intro-meta">
            <span>01</span><span>RATE</span>
            <span>02</span><span>WRITE</span>
            <span>03</span><span>SHARE</span>
          </div>

        </div>

        <div className="review-box">

          <div className="review-form-header">

            <div className="review-login-icon review-brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" role="presentation">
                <path
                  d="M7 8.5A4.5 4.5 0 0 1 11.5 4h9A4.5 4.5 0 0 1 25 8.5v7A4.5 4.5 0 0 1 20.5 20H15l-5.7 5.2a.8.8 0 0 1-1.3-.6V20.5A4.5 4.5 0 0 1 7 16.5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12.5h8M12 16h5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <p className="review-login-title">
                {editingId ? "EDIT YOUR REVIEW" : "SHARE YOUR EXPERIENCE"}
              </p>
              <p className="review-login-copy">
                {editingId
                  ? "Update your rating or review below."
                  : "Leave a quick review directly. No login required."}
              </p>
            </div>

          </div>

          <div className="review-field-group review-name-group">

            <label
              htmlFor="review-name"
              className="review-field-label"
            >
              <span className="review-field-number">01</span>
              YOUR NAME
            </label>

            <input
              id="review-name"
              type="text"
              value={name}
              onChange={(event) =>
                handleNameChange(event.target.value)
              }
              placeholder="Enter your name"
              maxLength={40}
              autoComplete="name"
              className="review-name-input"
            />

          </div>

          <div className="review-rating-header">
            <span className="review-field-label">
              <span className="review-field-number">02</span>
              YOUR RATING
            </span>
            <span className="review-rating-value">
              {rating > 0 ? `${rating} / 5` : "SELECT"}
            </span>
          </div>

          <div className="stars" aria-label="Select rating">
            {[1, 2, 3, 4, 5].map((star) => {
              const selected = star <= rating;

              return (
                <motion.button
                  key={star}
                  type="button"
                  className={`star-button ${selected ? "active" : ""}`}
                  onClick={() => setRating(star)}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  aria-pressed={selected}
                >
                  ★
                </motion.button>
              );
            })}
          </div>

          <div className="review-field-group review-message-group">

            <label
              htmlFor="review-message"
              className="review-field-label"
            >
              <span className="review-field-number">03</span>
              YOUR REVIEW
            </label>

            <div className="review-textarea-wrap">
              <textarea
                id="review-message"
                value={review}
                onChange={(event) =>
                  handleReviewChange(event.target.value)
                }
                placeholder="Write something about your experience..."
                maxLength={400}
                spellCheck
                aria-label="Your review"
              />

              <span className="textarea-corner">
                MAX 50 WORDS
              </span>
            </div>

          </div>

          <div className="review-submit-row">

            <div className="review-submit-note">
              <span className="review-submit-dot" />
              <span>
                {wordCount} / 50 WORDS
              </span>
            </div>

            <div className="review-action-group">

              <motion.button
                type="button"
                className="review-publish-button"
                disabled={!canSubmit}
                onClick={handleSubmit}
                whileHover={
                  canSubmit ? { y: -2 } : undefined
                }
                whileTap={
                  canSubmit ? { scale: 0.98 } : undefined
                }
              >
                <span>
                  {submitting
                    ? editingId
                      ? "SAVING..."
                      : "POSTING..."
                    : editingId
                      ? "SAVE CHANGES"
                      : "POST REVIEW"}
                </span>
                <span aria-hidden="true">↗</span>
              </motion.button>

              {editingId && (
                <button
                  type="button"
                  className="review-cancel-button"
                  onClick={() => {
                    resetReviewForm();
                    setMessage("");
                  }}
                  disabled={submitting}
                >
                  CANCEL
                </button>
              )}

            </div>

          </div>

          {message && (
            <p
              className={`review-status ${
                message.includes("successfully") ? "success" : ""
              }`}
            >
              {message}
            </p>
          )}

        </div>

      </div>

      <div className="review-list-section">

        <div className="review-list-heading">

          <div>
            <p className="eyebrow">
              COMMUNITY FEEDBACK
            </p>
            <h3>
              What people say
            </h3>
          </div>

          <div className="review-list-meta">
            <span className="review-count">
              {reviews.length.toString().padStart(2, "0")} REVIEWS
            </span>
            <span className="review-list-line" />
            <span>DXT / 003</span>
          </div>

        </div>

        {loading ? (
          <div className="review-empty-state review-loading-state">
            <span className="review-loading-dot" />
            LOADING COMMUNITY FEEDBACK
          </div>
        ) : reviews.length === 0 ? (
          <div className="review-empty-state">
            <div className="empty-stars">★★★★★</div>
            <p>
              Be the first to leave a review.
            </p>
            <span>
              YOUR FEEDBACK STARTS THE CONVERSATION.
            </span>
          </div>
        ) : (
          <div className="review-list">

            {reviews.map((item) => {
              const isOwner = ownedReviewIds.includes(item.id);

              return (
                <motion.article
                  key={item.id}
                  className="review-comment-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                >

                  <div className="review-comment-top">

                    <div className="review-comment-user">

                      <div className="review-comment-avatar review-avatar-fallback">
                        {item.user_name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <strong>
                          {item.user_name}
                        </strong>
                        <span>
                          {new Date(item.created_at).toLocaleDateString(
                            undefined,
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>

                    </div>

                    <div
                      className="review-comment-stars"
                      aria-label={`${item.rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <span
                          key={index}
                          className={index < item.rating ? "filled" : ""}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                  </div>

                  <p className="review-comment-text">
                    {item.review}
                    {item.is_edited && (
                      <span className="review-edited-label">
                        (Edited)
                      </span>
                    )}
                  </p>

                  <div
                    className="review-reactions"
                    aria-label="React to this review"
                  >

                    <button
                      type="button"
                      className={`review-reaction-button ${
                        item.my_reaction === "heart"
                          ? "selected heart-selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleReaction(item.id, "heart")
                      }
                      aria-label={
                        item.my_reaction === "heart"
                          ? "Remove heart reaction"
                          : "React with heart"
                      }
                      aria-pressed={item.my_reaction === "heart"}
                    >
                      <span
                        className="review-reaction-icon heart-icon"
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 16 16" role="presentation">
                          <path
                            d="M4 2H2v2H0v4h2v2h2v2h2v2h2v-2h2v-2h2V8h2V4h-2V2h-4v2H6V2H4Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      {item.heart_count > 0 && (
                        <span className="review-reaction-count">
                          {item.heart_count}
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      className={`review-reaction-button ${
                        item.my_reaction === "broken_heart"
                          ? "selected broken-selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleReaction(item.id, "broken_heart")
                      }
                      aria-label={
                        item.my_reaction === "broken_heart"
                          ? "Remove broken heart reaction"
                          : "React with broken heart"
                      }
                      aria-pressed={
                        item.my_reaction === "broken_heart"
                      }
                    >
                      <span
                        className="review-reaction-icon broken-heart-icon"
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 16 16" role="presentation">
                          <path
                            d="M2 2H6v2h2v3h2V5h2V2h2v2h2v4h-2v2h-2v2h-2v2H8v-2H6v-2H4V8H2V4H0V2h2Z"
                            fill="currentColor"
                          />
                          <path
                            d="M8 7 6.5 5.5 8 4l1.5 1.5L8 7Zm0 2 1.5 1.5L8 12l-1.5-1.5L8 9Z"
                            fill="rgba(5,5,5,.72)"
                          />
                        </svg>
                      </span>
                      {item.broken_heart_count > 0 && (
                        <span className="review-reaction-count">
                          {item.broken_heart_count}
                        </span>
                      )}
                    </button>

                  </div>

                  {isOwner && (
                    <div className="review-comment-actions">

                      <button
                        type="button"
                        className="review-edit-button"
                        onClick={() => handleEdit(item)}
                        disabled={deletingId === item.id}
                      >
                        EDIT
                      </button>

                      <button
                        type="button"
                        className="review-delete-button"
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                      >
                        {deletingId === item.id ? "DELETING..." : "DELETE"}
                      </button>

                    </div>
                  )}

                </motion.article>
              );
            })}

          </div>
        )}

      </div>

    </OSWindow>
  );

}

/* =========================================================
   YOUTUBE PROJECT
========================================================= */


function YouTubeProject({
  project,
}: {
  project: Project;
}) {
  const playerRef =
    useRef<YouTubePlayer | null>(
      null
    );

  const playerContainerId =
    `youtube-player-${project.id}`;

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [isLoaded, setIsLoaded] =
    useState(false);

  const [hasError, setHasError] =
    useState(false);

  /* =======================================================
     YOUTUBE PLAYER
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (
        cancelled ||
        !window.YT ||
        !window.YT.Player ||
        playerRef.current
      ) {
        return;
      }

      playerRef.current =
        new window.YT.Player(
          playerContainerId,
          {
            videoId:
              project.youtubeId,

            playerVars: {
              autoplay: 1,
              controls: 0,
              disablekb: 1,
              fs: 0,
              playsinline: 1,
              rel: 0,
              modestbranding: 1,
              iv_load_policy: 3,

              start:
                project.start,

              loop: 1,

              playlist:
                project.youtubeId,

              origin:
                window.location.origin,
            },

            events: {

              /* =========================================
                 READY
              ========================================= */

              onReady: (
                event
              ) => {
                if (cancelled) {
                  return;
                }

                setIsLoaded(true);
                setHasError(false);

                /*
                 * Muted autoplay is required
                 * for browser autoplay policies.
                 */

                event.target.mute();

                event.target.seekTo(
                  project.start,
                  true
                );

                event.target.playVideo();
              },

              /* =========================================
                 STATE CHANGE
              ========================================= */

              onStateChange: (
                event
              ) => {
                if (
                  cancelled ||
                  !window.YT
                ) {
                  return;
                }

                if (
                  event.data ===
                  window.YT.PlayerState
                    .PLAYING
                ) {
                  setIsPlaying(true);
                  setHasError(false);
                }

                if (
                  event.data ===
                  window.YT.PlayerState
                    .PAUSED
                ) {
                  setIsPlaying(false);
                }

                if (
                  event.data ===
                  window.YT.PlayerState
                    .ENDED
                ) {
                  event.target.mute();

                  event.target.seekTo(
                    project.start,
                    true
                  );

                  event.target.playVideo();
                }
              },

              /* =========================================
                 ERROR
              ========================================= */

              onError: () => {
                if (cancelled) {
                  return;
                }

                setHasError(true);
                setIsPlaying(false);
                setIsLoaded(true);
              },

            },
          }
        );
    };

    loadYouTubeAPI()
      .then(() => {
        if (!cancelled) {
          createPlayer();
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsLoaded(true);
          setHasError(true);
        }
      });

    return () => {
      cancelled = true;

      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [
    playerContainerId,
    project.youtubeId,
    project.start,
  ]);

  /* =======================================================
     MANUAL PLAY
  ======================================================= */

  const handleManualPlay =
    () => {
      if (!playerRef.current) {
        return;
      }

      setHasError(false);

      playerRef.current.mute();

      playerRef.current.seekTo(
        project.start,
        true
      );

      playerRef.current.playVideo();
    };

  return (
    <motion.article
      className="project-card youtube-project-card"

      whileHover={{
        y: -6,
        scale: 1.008,
      }}

      transition={{
        type: "spring",
        stiffness: 280,
        damping: 24,
      }}
    >

      {/* ===================================================
          VIDEO
      =================================================== */}

      <div
        className="project-image youtube-project-image"
        style={
          {
            "--glow-one": project.glowOne,
            "--glow-two": project.glowTwo,
            "--glow-three": project.glowThree,
          } as CSSProperties
        }
      >

        {/* =================================================
            CINEMATIC AMBIENT GLOW
        ================================================= */}

        <div
          className="video-ambient-glow"
          aria-hidden="true"
        >
          <div className="ambient-orb ambient-orb-one" />
          <div className="ambient-orb ambient-orb-two" />
          <div className="ambient-orb ambient-orb-three" />
        </div>

        {/* =================================================
            YOUTUBE PLAYER
        ================================================= */}

        <div
          id={playerContainerId}
          className="youtube-player"
        />

        {/* =================================================
            GLASS VISUAL LAYER
        ================================================= */}

        <div
          className="youtube-glass-overlay"
          aria-hidden="true"
        />

        {/* =================================================
            PROJECT NUMBER
        ================================================= */}

        <div className="youtube-project-number">
          {project.id}
        </div>

        {/* =================================================
            MUTED INDICATOR
        ================================================= */}

        <div className="youtube-muted-indicator">
          ● MUTED
        </div>

        {/* =================================================
            AUTOPLAY FALLBACK
        ================================================= */}

        {!isPlaying && !hasError && (
          <div className="youtube-autoplay-cover">

            <button
              type="button"
              className="custom-video-play"
              onClick={
                handleManualPlay
              }
              aria-label="Play project"
            >
              <span aria-hidden="true">
                ▶
              </span>
            </button>

          </div>
        )}

        {/* =================================================
            VIDEO ERROR
        ================================================= */}

        {hasError && (
          <div className="youtube-error-cover">

            <div className="youtube-error-content">

              <span>
                VIDEO UNAVAILABLE
              </span>

              <button
                type="button"
                className="youtube-error-play"
                onClick={
                  handleManualPlay
                }
              >
                RETRY ↻
              </button>

            </div>

          </div>
        )}

        {/* =================================================
            YOUTUBE LINK
        ================================================= */}

        <a
          href={project.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="youtube-open-button"
          aria-label={`Watch ${project.title} on YouTube`}
        >

          <span className="youtube-icon">
            ▶
          </span>

          <span>
            YOUTUBE
          </span>

          <span aria-hidden="true">
            ↗
          </span>

        </a>

        {/* =================================================
            LOADING
        ================================================= */}

        {!isLoaded && (
          <div className="youtube-loading">
            LOADING
          </div>
        )}

      </div>

      {/* ===================================================
          PROJECT INFORMATION
      =================================================== */}

      <div className="project-info">

        <div>

          <span className="project-number">
            {project.id}
          </span>

          <h3>
            {project.title}
          </h3>

          <p>
            {project.category}
          </p>

        </div>

        <span
          className="project-arrow"
          aria-hidden="true"
        >
          ↗
        </span>

      </div>

    </motion.article>
  );
}