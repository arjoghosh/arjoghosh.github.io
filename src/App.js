import { useEffect, useLayoutEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Divider,
  FluentProvider,
  Link,
  Switch,
  Tab,
  TabList,
  Tooltip,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";

import {
  ArrowDownload24Regular,
  ArrowRight20Regular,
  Calendar24Regular,
  Code24Regular,
  DesignIdeas24Regular,
  // Github24Regular,
  Globe24Regular,
  // LinkedIn24Regular,
  Location24Regular,
  Mail24Regular,
  Navigation24Regular,
  Open20Regular,
  Person24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from "@fluentui/react-icons";

import "./App.css";

const profile = {
  name: "Alex Morgan",
  initials: "AM",
  role: "Product designer and front-end engineer",
  location: "Seattle, Washington",
  availability: "Available for select projects",
  email: "hello@example.com",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  resume: `${process.env.PUBLIC_URL}/resume.pdf`,
};

const projects = [
  {
    id: 1,
    type: "Product design · Front-end",
    title: "Orbit financial workspace",
    description:
      "A collaborative financial planning workspace that turns complex account data into focused, understandable decisions.",
    tags: ["React", "Fluent UI", "TypeScript"],
    metric: "38% faster workflows",
    className: "project-orbit",
    href: "https://github.com/",
  },
  {
    id: 2,
    type: "Design systems",
    title: "Northstar design system",
    description:
      "A scalable component and token system shared across multiple products, teams, themes, and accessibility modes.",
    tags: ["Design systems", "Accessibility", "Figma"],
    metric: "60+ components",
    className: "project-northstar",
    href: "https://github.com/",
  },
  {
    id: 3,
    type: "Data visualization",
    title: "Pulse operations dashboard",
    description:
      "A responsive operational dashboard that helps distributed teams recognize risk and act before incidents escalate.",
    tags: ["React", "Data visualization", "UX"],
    metric: "24-hour visibility",
    className: "project-pulse",
    href: "https://github.com/",
  },
];

const experience = [
  {
    period: "2024 — Present",
    role: "Senior product designer",
    company: "Contoso",
    description:
      "Leading product design and front-end prototyping for AI-assisted productivity experiences used by distributed teams.",
  },
  {
    period: "2021 — 2024",
    role: "Product designer",
    company: "Fabrikam",
    description:
      "Designed enterprise workflows, established accessibility standards, and helped build a shared React component library.",
  },
  {
    period: "2019 — 2021",
    role: "UI/UX designer",
    company: "Northwind Studio",
    description:
      "Created websites and digital products for early-stage companies across finance, education, and developer tooling.",
  },
];

const posts = [
  {
    date: "August 28, 2026",
    readingTime: "6 min read",
    category: "Design systems",
    title: "Design systems should provide decisions, not just components",
    excerpt:
      "A component library becomes a design system when it helps teams make consistent product decisions.",
    href: "#blog",
  },
  {
    date: "July 14, 2026",
    readingTime: "8 min read",
    category: "Engineering",
    title: "Building interfaces that feel fast before they are fast",
    excerpt:
      "How visual continuity, optimistic feedback, and thoughtful loading states improve perceived performance.",
    href: "#blog",
  },
  {
    date: "June 2, 2026",
    readingTime: "5 min read",
    category: "Career",
    title: "The value of working between design and engineering",
    excerpt:
      "Why learning enough code to explore ideas can change how designers collaborate and communicate.",
    href: "#blog",
  },
];

function getInitialTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") {
    return true;
  }

  if (savedTheme === "light") {
    return false;
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

function App() {
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("work");

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
    } catch {
      // Theme switching still works if browser storage is unavailable.
    }
  }, [darkMode]);

  useEffect(() => {
    const sectionIds = ["work", "about", "experience", "blog", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setSelectedSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const navigateTo = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setSelectedSection(sectionId);
    setMenuOpen(false);
  };

  const handleTabSelect = (_, data) => {
    navigateTo(data.value);
  };

  return (
    <FluentProvider
      theme={darkMode ? webDarkTheme : webLightTheme}
      className="app-provider"
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="site-shell">
        <header className="site-header">
          <div className="header-content">
            <button
              type="button"
              className="brand"
              onClick={() => navigateTo("home")}
              aria-label="Go to homepage"
            >
              <span className="brand-mark">{profile.initials}</span>

              <span className="brand-copy">
                <strong>{profile.name}</strong>
                <span>Designer + Engineer</span>
              </span>
            </button>

            <nav className="desktop-navigation" aria-label="Main navigation">
              <TabList
                selectedValue={selectedSection}
                onTabSelect={handleTabSelect}
                appearance="subtle"
              >
                <Tab value="work">Work</Tab>
                <Tab value="about">About</Tab>
                <Tab value="experience">Experience</Tab>
                <Tab value="blog">Writing</Tab>
                <Tab value="contact">Contact</Tab>
              </TabList>
            </nav>

            <div className="header-actions">
            <span title={darkMode ? "Use light theme" : "Use dark theme"}>
              <Switch
                checked={darkMode}
                onChange={(_, data) => setDarkMode(data.checked)}
                aria-label="Dark mode"
                indicator={
                  darkMode ? (
                    <WeatherMoon24Regular />
                  ) : (
                    <WeatherSunny24Regular />
                  )
                }
              />
            </span>

              <Button
                className="desktop-contact-button"
                appearance="primary"
                icon={<Mail24Regular />}
                onClick={() => navigateTo("contact")}
              >
                Let’s talk
              </Button>

              <Button
                className="mobile-menu-button"
                appearance="subtle"
                icon={<Navigation24Regular />}
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((current) => !current)}
              />
            </div>
          </div>

          {menuOpen && (
            <nav className="mobile-navigation" aria-label="Mobile navigation">
              {["work", "about", "experience", "blog", "contact"].map(
                (section) => (
                  <Button
                    key={section}
                    appearance={
                      selectedSection === section ? "primary" : "subtle"
                    }
                    onClick={() => navigateTo(section)}
                  >
                    {section === "blog"
                      ? "Writing"
                      : section.charAt(0).toUpperCase() + section.slice(1)}
                  </Button>
                )
              )}
            </nav>
          )}
        </header>

        <main id="main-content">
          <section id="home" className="hero section">
            <div className="hero-background hero-background-one" />
            <div className="hero-background hero-background-two" />

            <div className="hero-layout">
              <div className="hero-content">
                <Badge
                  appearance="tint"
                  color="success"
                  size="large"
                  icon={<span className="availability-dot" />}
                >
                  {profile.availability}
                </Badge>

                <h1>
                  I design thoughtful
                  <span> digital products</span>
                  <br />
                  and bring them to life.
                </h1>

                <p className="hero-summary">
                  I’m {profile.name}, a product designer and front-end engineer
                  focused on accessible interfaces, design systems, and useful
                  human-centered software.
                </p>

                <div className="hero-buttons">
                  <Button
                    appearance="primary"
                    size="large"
                    icon={<DesignIdeas24Regular />}
                    onClick={() => navigateTo("work")}
                  >
                    View selected work
                  </Button>

                  <Button
                    appearance="secondary"
                    size="large"
                    icon={<ArrowDownload24Regular />}
                    as="a"
                    href={profile.resume}
                    download
                  >
                    Download résumé
                  </Button>
                </div>

                <div className="hero-meta">
                  <span>
                    <Location24Regular />
                    {profile.location}
                  </span>

                  <span>
                    <Code24Regular />
                    Design systems · React · Accessibility
                  </span>
                </div>
              </div>

              <div className="profile-visual" aria-label="Profile summary">
                <div className="profile-window">
                  <div className="window-toolbar">
                    <div className="window-dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span>Profile</span>
                  </div>

                  <div className="profile-window-content">
                    <div className="profile-avatar-ring">
                      <Avatar
                        name={profile.name}
                        initials={profile.initials}
                        size={96}
                        color="colorful"
                      />
                    </div>

                    <div>
                      <h2>{profile.name}</h2>
                      <p>{profile.role}</p>
                    </div>

                    <Divider />

                    <div className="profile-stat-grid">
                      <div>
                        <strong>7+</strong>
                        <span>Years designing</span>
                      </div>

                      <div>
                        <strong>30+</strong>
                        <span>Products shipped</span>
                      </div>

                      <div>
                        <strong>60+</strong>
                        <span>System components</span>
                      </div>
                    </div>

                    <div className="profile-chips">
                      <Badge appearance="outline">Product design</Badge>
                      <Badge appearance="outline">React</Badge>
                      <Badge appearance="outline">Fluent UI</Badge>
                    </div>
                  </div>
                </div>

                <div className="floating-card floating-card-left">
                  <DesignIdeas24Regular />
                  <span>
                    <strong>Design</strong>
                    Human-centered
                  </span>
                </div>

                <div className="floating-card floating-card-right">
                  <Code24Regular />
                  <span>
                    <strong>Build</strong>
                    Production-ready
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section id="work" className="section content-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Selected work</span>
                <h2>Products designed for clarity and momentum.</h2>
              </div>

              <p>
                A selection of product, design-system, and front-end projects
                created for real users and complex organizations.
              </p>
            </div>

            <div className="project-grid">
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  className={`project-card ${project.className}`}
                  appearance="outline"
                >
                  <div className="project-visual">
                    <div className="project-number">0{index + 1}</div>

                    <div className="project-browser">
                      <div className="project-browser-toolbar">
                        <span />
                        <span />
                        <span />
                      </div>

                      <div className="project-browser-content">
                        <div className="mock-sidebar" />

                        <div className="mock-main">
                          <div className="mock-title" />
                          <div className="mock-chart">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                          </div>

                          <div className="mock-cards">
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="project-content">
                    <span className="project-type">{project.type}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <Badge key={tag} appearance="tint">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Divider />

                    <div className="project-footer">
                      <span className="project-metric">{project.metric}</span>

                      <Button
                        appearance="subtle"
                        icon={<Open20Regular />}
                        iconPosition="after"
                        as="a"
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View case study
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="about" className="section content-section">
            <div className="about-layout">
              <div className="about-heading">
                <span className="eyebrow">About me</span>
                <h2>
                  Design thinking,
                  <br />
                  engineering discipline.
                </h2>
              </div>

              <div className="about-copy">
                <p className="about-lead">
                  I work where product design and front-end engineering meet.
                  That means I can move from research and interaction design to
                  accessible, production-quality interfaces.
                </p>

                <p>
                  I’m especially interested in reducing complexity: simplifying
                  difficult workflows, establishing reusable design patterns,
                  and making software feel understandable from the first
                  interaction.
                </p>

                <div className="principles-grid">
                  <div className="principle">
                    <span className="principle-icon">
                      <Person24Regular />
                    </span>
                    <div>
                      <h3>People first</h3>
                      <p>
                        Start with user context, accessibility, and actual
                        problems rather than assumptions.
                      </p>
                    </div>
                  </div>

                  <div className="principle">
                    <span className="principle-icon">
                      <DesignIdeas24Regular />
                    </span>
                    <div>
                      <h3>Clarity over decoration</h3>
                      <p>
                        Use visual design to establish hierarchy, meaning, and
                        confidence.
                      </p>
                    </div>
                  </div>

                  <div className="principle">
                    <span className="principle-icon">
                      <Code24Regular />
                    </span>
                    <div>
                      <h3>Design through building</h3>
                      <p>
                        Prototype in the real medium to understand behavior,
                        constraints, and edge cases.
                      </p>
                    </div>
                  </div>

                  <div className="principle">
                    <span className="principle-icon">
                      <Globe24Regular />
                    </span>
                    <div>
                      <h3>Systems that scale</h3>
                      <p>
                        Create reusable foundations that make future work
                        faster and more consistent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="experience" className="section content-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Résumé</span>
                <h2>Experience across design and engineering.</h2>
              </div>

              <Button
                appearance="secondary"
                icon={<ArrowDownload24Regular />}
                as="a"
                href={profile.resume}
                download
              >
                Download résumé
              </Button>
            </div>

            <div className="experience-layout">
              <div className="experience-timeline">
                {experience.map((item) => (
                  <article className="experience-item" key={item.period}>
                    <div className="timeline-marker" />

                    <div className="experience-period">{item.period}</div>

                    <div className="experience-content">
                      <h3>{item.role}</h3>
                      <span>{item.company}</span>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="skills-panel">
                <h3>Core capabilities</h3>

                <div className="skill-group">
                  <span>Design</span>
                  <div className="skill-list">
                    <Badge appearance="outline">Product strategy</Badge>
                    <Badge appearance="outline">Interaction design</Badge>
                    <Badge appearance="outline">Design systems</Badge>
                    <Badge appearance="outline">Prototyping</Badge>
                    <Badge appearance="outline">Accessibility</Badge>
                  </div>
                </div>

                <div className="skill-group">
                  <span>Engineering</span>
                  <div className="skill-list">
                    <Badge appearance="outline">React</Badge>
                    <Badge appearance="outline">JavaScript</Badge>
                    <Badge appearance="outline">TypeScript</Badge>
                    <Badge appearance="outline">HTML and CSS</Badge>
                    <Badge appearance="outline">Fluent UI</Badge>
                  </div>
                </div>

                <div className="skill-group">
                  <span>Tools</span>
                  <div className="skill-list">
                    <Badge appearance="outline">Figma</Badge>
                    <Badge appearance="outline">GitHub</Badge>
                    <Badge appearance="outline">Storybook</Badge>
                    <Badge appearance="outline">VS Code</Badge>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section id="blog" className="section content-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Writing</span>
                <h2>Notes on design, code, and product work.</h2>
              </div>

              <p>
                Short articles about building better interfaces and working
                effectively across disciplines.
              </p>
            </div>

            <div className="posts-grid">
              {posts.map((post) => (
                <Card
                  key={post.title}
                  className="post-card"
                  appearance="outline"
                >
                  <CardHeader
                    header={
                      <Badge appearance="tint" color="informative">
                        {post.category}
                      </Badge>
                    }
                  />

                  <div className="post-card-content">
                    <div className="post-meta">
                      <span>
                        <Calendar24Regular />
                        {post.date}
                      </span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>

                    <Link href={post.href}>
                      Read article <ArrowRight20Regular />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="contact" className="section contact-section">
            <div className="contact-card">
              <div className="contact-visual" aria-hidden="true">
                <div className="contact-orbit contact-orbit-one" />
                <div className="contact-orbit contact-orbit-two" />
                <div className="contact-center">
                  <Mail24Regular />
                </div>
              </div>

              <div className="contact-content">
                <Badge appearance="tint" color="success">
                  Open to new opportunities
                </Badge>

                <h2>Have an interesting problem to solve?</h2>

                <p>
                  I’m always happy to talk about product design, design systems,
                  front-end development, or potential collaborations.
                </p>

                <div className="contact-actions">
                  <Button
                    appearance="primary"
                    size="large"
                    icon={<Mail24Regular />}
                    as="a"
                    href={`mailto:${profile.email}`}
                  >
                    Send me an email
                  </Button>

                  // <Button
                  //   appearance="secondary"
                  //   size="large"
                  //   icon={<LinkedIn24Regular />}
                  //   as="a"
                  //   href={profile.linkedin}
                  //   target="_blank"
                  //   rel="noreferrer"
                  // >
                  //   Connect on LinkedIn
                  // </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div>
            <span className="brand-mark footer-brand">{profile.initials}</span>

            <p>
              Designed and built by {profile.name}.
              <br />
              Powered by React and Fluent UI.
            </p>
          </div>

          <div className="footer-links">
            // <Tooltip content="GitHub" relationship="label">
            //   <Button
            //     appearance="subtle"
            //     icon={<Github24Regular />}
            //     as="a"
            //     href={profile.github}
            //     target="_blank"
            //     rel="noreferrer"
            //     aria-label="GitHub profile"
            //   />
            // </Tooltip>

            // <Tooltip content="LinkedIn" relationship="label">
            //   <Button
            //     appearance="subtle"
            //     icon={<LinkedIn24Regular />}
            //     as="a"
            //     href={profile.linkedin}
            //     target="_blank"
            //     rel="noreferrer"
            //     aria-label="LinkedIn profile"
            //   />
            // </Tooltip>

            <Tooltip content="Email" relationship="label">
              <Button
                appearance="subtle"
                icon={<Mail24Regular />}
                as="a"
                href={`mailto:${profile.email}`}
                aria-label="Send email"
              />
            </Tooltip>
          </div>

          <span className="footer-copyright">
            © {new Date().getFullYear()} {profile.name}
          </span>
        </footer>
      </div>
    </FluentProvider>
  );
}

export default App;
