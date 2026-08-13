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

  useEffect(() => {
    let mounted = true;

    const restoreReviewAfterAuth = async () => {
      const returnSection =
        window.sessionStorage.getItem(
          "dextro-review-return"
        );

      /*
       * If Google returned a PKCE authorization code,
       * exchange it explicitly. This makes the OAuth flow
       * reliable even when the browser does not automatically
       * finish the callback before React mounts.
       */
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        const { error } =
          await supabase.auth.exchangeCodeForSession(
            code
          );

        if (error) {
          console.error(
            "OAuth callback error:",
            error
          );
        } else {
          url.searchParams.delete("code");
          window.history.replaceState(
            {},
            document.title,
            url.pathname +
              url.search +
              url.hash
          );
        }
      }

      if (!mounted) {
        return;
      }

      if (returnSection === "review" || code) {
        window.sessionStorage.removeItem(
          "dextro-review-return"
        );

        setActive("review");
      }
    };

    void restoreReviewAfterAuth();

    /*
     * Catch the SIGNED_IN event at page level so Review is
     * restored even if Supabase finishes OAuth after the
     * initial render.
     */
    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        (event) => {
          if (
            mounted &&
            event === "SIGNED_IN"
          ) {
            window.sessionStorage.removeItem(
              "dextro-review-return"
            );

            setActive("review");
          }
        }
      );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

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
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.12,
                      duration: 0.55,
                    }}
                  >

                    <p className="eyebrow">
                      CINEMATIC EDITOR / MOTION DESIGNER
                    </p>

                    <h1>
                      DEXTRO
                    </h1>

                    <p className="about-description">
                      Hey, I&apos;m Dheeraj — a
                      creative editor and visual
                      designer who loves turning
                      simple ideas into visuals
                      that feel cinematic,
                      meaningful and alive.
                      I&apos;m always experimenting
                      with editing, motion,
                      sound and design to create
                      work that people actually
                      remember.
                    </p>

                  </motion.div>

                  <motion.div
                    className="creative-collaboration"
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.22,
                      duration: 0.5,
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

                  </motion.div>

                  <motion.button
                    type="button"
                    className="glass-action"
                    onClick={() =>
                      setActive("work")
                    }
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

                    <span aria-hidden="true">
                      ↗
                    </span>
                  </motion.button>

                </div>

                {/* =================================================
                    PROFILE
                ================================================= */}

                <motion.div
                  className="portrait-placeholder"
                  onMouseMove={handlePortraitMove}
                  onMouseLeave={handlePortraitLeave}
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.2,
                    duration: 0.7,
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
  const [rating, setRating] =
    useState(0);

  const [review, setReview] =
    useState("");

  const [reviews, setReviews] =
    useState<{
      id: string;
      user_id: string;
      user_name: string;
      user_avatar: string;
      rating: number;
      review: string;
      created_at: string;
    }[]>([]);

  const [user, setUser] =
    useState<{
      id: string;
      name: string;
      avatar: string;
    } | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const words =
    review
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  const wordCount =
    review.trim()
      ? words.length
      : 0;

  const canSubmit =
    !!user &&
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
        "id, user_id, user_name, user_avatar, rating, review, created_at"
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Supabase review load error:",
        error
      );

      setMessage(
        `Could not load reviews: ${error.message}`
      );

      return;
    }

    setReviews(data ?? []);
  };

  useEffect(() => {
    let mounted = true;

    const applySession = (
      session: Awaited<
        ReturnType<
          typeof supabase.auth.getSession
        >
      >["data"]["session"]
    ) => {
      if (!mounted) {
        return;
      }

      if (!session?.user) {
        setUser(null);
        return;
      }

      const metadata =
        session.user.user_metadata ?? {};

      setUser({
        id: session.user.id,
        name:
          metadata.full_name ||
          metadata.name ||
          session.user.email?.split("@")[0] ||
          "Google User",
        avatar:
          metadata.avatar_url ||
          metadata.picture ||
          "",
      });
    };

    const initialize = async () => {
      setLoading(true);

      const {
        data,
        error,
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (error) {
        console.error(
          "Session error:",
          error
        );

        setMessage(
          `Could not load your Google session: ${error.message}`
        );

        setLoading(false);
        return;
      }

      applySession(data.session);
      await loadReviews();

      if (mounted) {
        setLoading(false);
      }
    };

    void initialize();

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        (event, session) => {
          if (!mounted) {
            return;
          }

          applySession(session);

          if (
            event === "SIGNED_IN" ||
            event === "SIGNED_OUT"
          ) {
            setTimeout(() => {
              if (!mounted) {
                return;
              }

              void loadReviews();
              setLoading(false);
            }, 0);
          }
        }
      );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleGoogleLogin = async () => {
    setMessage("");

    window.sessionStorage.setItem(
      "dextro-review-return",
      "review"
    );

    const {
      data,
      error,
    } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          window.location.origin,
        queryParams: {
          access_type: "offline",
          prompt: "select_account",
        },
      },
    });

    if (error) {
      window.sessionStorage.removeItem(
        "dextro-review-return"
      );

      console.error(
        "Google OAuth error:",
        error
      );

      setMessage(
        error.message ||
          "Google sign-in could not be started."
      );

      return;
    }

    if (!data?.url) {
      window.sessionStorage.removeItem(
        "dextro-review-return"
      );

      setMessage(
        "Google sign-in could not be started."
      );
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setRating(0);
    setReview("");
    setMessage("");
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

  const handleSubmit = async () => {
    if (!canSubmit || !user) {
      return;
    }

    setSubmitting(true);
    setMessage("");

    const { error } =
      await supabase
        .from("reviews")
        .insert({
          user_id: user.id,
          user_name: user.name,
          user_avatar: user.avatar,
          rating,
          review: review.trim(),
        });

    if (error) {
      console.error(
        "Supabase review insert error:",
        error
      );

      setMessage(
        `Could not post your review: ${error.message}`
      );

      setSubmitting(false);
      return;
    }

    setRating(0);
    setReview("");
    setMessage("Review posted successfully.");

    await loadReviews();
    setSubmitting(false);
  };

  return (
    <OSWindow
      metaNumber="03"
      metaTitle="CLIENT FEEDBACK"
      cornerId="DXT_003"
    >

      <div className="review-layout">

        <div>

          <p className="eyebrow">
            CLIENT FEEDBACK
          </p>

          <h2>
            YOUR TAKE.
          </h2>

          <p className="review-description">
            Seen the work? Tell me what
            you think. A quick rating and
            a short note is all it takes.
          </p>

        </div>

        <div className="review-box">

          {!user ? (
            <div className="review-login-state">
              <div className="review-login-icon">
                G
              </div>

              <div>
                <p className="review-login-title">
                  LEAVE A REVIEW
                </p>

                <p className="review-login-copy">
                  Sign in securely with Google to share your feedback.
                </p>
              </div>

              <motion.button
                type="button"
                className="google-review-button"
                onClick={handleGoogleLogin}
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <span className="google-g-mark">
                  G
                </span>

                <span>
                  Continue with Google
                </span>

                <span aria-hidden="true">
                  ↗
                </span>
              </motion.button>
            </div>
          ) : (
            <>
              <div className="review-user-bar">
                <div className="review-user-info">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt=""
                      className="review-avatar"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="review-avatar review-avatar-fallback">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <strong>
                      {user.name}
                    </strong>

                    <span>
                      GOOGLE ACCOUNT
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="review-signout"
                  onClick={handleLogout}
                >
                  SIGN OUT
                </button>
              </div>

              <div className="review-field-label">
                YOUR RATING
              </div>

              <div
                className="stars"
                aria-label="Select rating"
              >

                {[1, 2, 3, 4, 5].map(
                  (star) => {
                    const selected =
                      star <= rating;

                    return (
                      <motion.button
                        key={star}
                        type="button"
                        className={`star-button ${
                          selected
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setRating(star)
                        }
                        whileHover={{
                          scale: 1.15,
                        }}
                        whileTap={{
                          scale: 0.9,
                        }}
                        aria-label={`${star} star${
                          star > 1
                            ? "s"
                            : ""
                        }`}
                        aria-pressed={
                          selected
                        }
                      >
                        ★
                      </motion.button>
                    );
                  }
                )}

              </div>

              <div className="review-field-label review-message-label">
                YOUR MESSAGE
              </div>

              <textarea
                value={review}
                onChange={(event) =>
                  handleReviewChange(
                    event.target.value
                  )
                }
                placeholder="Write about your experience..."
                maxLength={400}
                spellCheck
                aria-label="Your review"
              />

              <div className="review-bottom">
                <span
                  className={
                    wordCount >= 50
                      ? "word-limit"
                      : ""
                  }
                >
                  {wordCount} / 50 WORDS
                </span>

                <motion.button
                  type="button"
                  className="glass-action small"
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                  whileHover={
                    canSubmit
                      ? { scale: 1.04 }
                      : undefined
                  }
                  whileTap={
                    canSubmit
                      ? { scale: 0.96 }
                      : undefined
                  }
                >
                  <span>
                    {submitting
                      ? "POSTING..."
                      : "PUBLISH REVIEW"}
                  </span>

                  <span aria-hidden="true">
                    ↗
                  </span>
                </motion.button>
              </div>
            </>
          )}

          {message && (
            <p className="review-status">
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

          <span className="review-count">
            {reviews.length.toString().padStart(2, "0")} REVIEWS
          </span>
        </div>

        {loading ? (
          <div className="review-empty-state">
            LOADING REVIEWS...
          </div>
        ) : reviews.length === 0 ? (
          <div className="review-empty-state">
            <span>
              ★★★★★
            </span>
            <p>
              Be the first to leave a review.
            </p>
          </div>
        ) : (
          <div className="review-list">
            {reviews.map((item) => (
              <motion.article
                key={item.id}
                className="review-comment-card"
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <div className="review-comment-top">
                  <div className="review-comment-user">
                    {item.user_avatar ? (
                      <img
                        src={item.user_avatar}
                        alt=""
                        className="review-comment-avatar"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="review-comment-avatar review-avatar-fallback">
                        {item.user_name
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}

                    <div>
                      <strong>
                        {item.user_name}
                      </strong>

                      <span>
                        {new Date(
                          item.created_at
                        ).toLocaleDateString(
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
                    {Array.from(
                      { length: 5 },
                      (_, index) => (
                        <span
                          key={index}
                          className={
                            index < item.rating
                              ? "filled"
                              : ""
                          }
                        >
                          ★
                        </span>
                      )
                    )}
                  </div>
                </div>

                <p className="review-comment-text">
                  {item.review}
                </p>
              </motion.article>
            ))}
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