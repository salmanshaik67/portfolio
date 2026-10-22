/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL PERSONAL CONTENT LIVES HERE.
 *
 *  Content is taken from Salman Shaik's LinkedIn profile
 *  (linkedin.com/in/salmanshaik7770). Edit anything below and the whole site
 *  updates. Lines marked "Draft copy" were written for the site, not copied
 *  from LinkedIn — review them before publishing.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  BellRing,
  Boxes,
  Braces,
  Cloud,
  Code2,
  Container,
  Database,
  FileCode2,
  FileText,
  GitBranch,
  Globe,
  KeyRound,
  Linkedin,
  Lock,
  Network,
  Search,
  Server,
  ServerCog,
  Shield,
  ShieldCheck,
  Terminal,
  Ticket,
  Users,
  Workflow,
  Wrench,
  Zap,
} from 'lucide-react';

/* ── Types ─────────────────────────────────────────────────────────────── */

export type NavItem = { id: SectionId; label: string };
export type SectionId = 'home' | 'about' | 'work' | 'skills' | 'experience' | 'contact';

export type Social = { label: string; href: string; icon: LucideIcon; handle: string };

export type Profile = {
  name: string;
  /** Short form used in the nav logo. */
  initials: string;
  role: string;
  location: string;
  email: string;
  /** Hero headline, one entry per line. Keep it short and bold. */
  headline: string[];
  intro: string;
  /** `open: true` shows a green "available" light; `false` shows a neutral cyan status light. */
  availability: { open: boolean; label: string };
  /** Small floating chips around the hero. */
  heroChips: { label: string; icon: LucideIcon }[];
  /** Optional path to a portrait in /public (e.g. "/portrait.jpg"). Leave empty to show the generated placeholder. */
  portrait?: string;
  portraitAlt: string;
  socials: Social[];
};

export type ProjectArt = 'aurora' | 'signal' | 'terminal' | 'orbit' | 'shield';

export type Project = {
  slug: string;
  title: string;
  /** One sentence shown on the card. */
  summary: string;
  /** Longer text shown in the detail view. */
  description: string;
  category: string;
  role: string;
  year: string;
  tech: string[];
  /** Primary external link. Omit when there is nothing public to link to. */
  link?: { label: string; href: string };
  sourceUrl?: string;
  /** Generated cover art. No external images, nothing can 404. */
  art: ProjectArt;
  /** Three colours used by the generated art. */
  palette: [string, string, string];
  artAlt: string;
  highlights: string[];
};

export type SkillGroup = {
  title: string;
  blurb: string;
  icon: LucideIcon;
  skills: { label: string; icon: LucideIcon }[];
};

export type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  summary: string;
  /** Marks entries that still need replacing. Rendered with a visible badge. */
  placeholder?: boolean;
};

export type ProcessStep = { title: string; text: string; icon: LucideIcon };

/* ── Content ───────────────────────────────────────────────────────────── */

const linkedinUrl = 'https://www.linkedin.com/in/salmanshaik7770/';

/** ✏️  Quick edits: change these two lines and the whole site updates. */
const LOCATION = 'Hebron, KY (Willing to Relocate)';
const EMAIL = 'salmanshaik7770@gmail.com';

export const profile: Profile = {
  name: 'Salman Shaik',
  initials: 'SS',
  role: 'Systems & Infrastructure Engineer',
  location: LOCATION,
  email: EMAIL,
  headline: ['Engineering', "what's", 'next.'],
  intro:
    'I build, support and automate Linux and Windows Server environments across on-prem, AWS and Azure — with TLS/PKI automation, CI/CD and scripting that keep systems secure and running.',
  availability: { open: false, label: 'Server Support Engineer at Jabil' },
  heroChips: [
    { label: 'Linux · Windows Server', icon: Server },
    { label: 'AWS · Azure', icon: Cloud },
    { label: 'Ansible · Jenkins', icon: Workflow },
    { label: 'TLS / PKI automation', icon: ShieldCheck },
  ],
  portrait: '',
  portraitAlt: 'Portrait of Salman Shaik',
  socials: [
    { label: 'LinkedIn', handle: 'in/salmanshaik7770', href: linkedinUrl, icon: Linkedin },
  ],
};

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const about = {
  /** Draft copy. */
  statement: 'I automate the repetitive work so infrastructure stays secure, observable and quietly reliable.',
  paragraphs: [
    'Systems & Infrastructure Engineer with 3+ years building, supporting and automating Linux and Windows Server environments across on-prem, AWS and Azure.',
    'Currently a Server Support Engineer at Jabil (via Populus Group): enterprise server monitoring, log and alert triage, ServiceNow incident management, user access management and AWS/Azure operations. M.S. in Computer Science from Southern Illinois University.',
  ],
  /** Draft copy. */
  philosophy:
    'If I have to do it twice, I script it. If it can break silently, I monitor it. And if someone else will run it, I document it.',
  highlights: [
    { title: 'TLS / PKI automation', text: '50+ certificates automated across Windows and Linux — ~90% fewer manual renewals.', icon: Lock },
    { title: 'CI/CD pipelines', text: 'Groovy-based Jenkins pipelines with API triggers and Teams alerts — build time cut by 40%.', icon: GitBranch },
    { title: 'Reliability & support', text: '200+ ServiceNow incidents and changes, 99.9% uptime, VDI migration for 500+ users.', icon: Activity },
  ],
  /** Featured-project and skill counts are computed; these come from the LinkedIn profile. */
  stats: [
    { value: '3+', label: 'Years in infrastructure' },
    { value: '50+', label: 'TLS certificates automated' },
  ],
  floatingNotes: [
    { label: 'Currently', value: 'Server Support · Jabil' },
    { label: 'Based in', value: LOCATION },
  ],
};

const projectsPage = `${linkedinUrl}details/projects/`;
const experiencePage = `${linkedinUrl}details/experience/`;

export const projects: Project[] = [
  {
    slug: 'tls-lifecycle',
    title: 'TLS Certificate Lifecycle',
    summary: 'Automated TLS/SSL issuance and renewal across university Windows and Linux infrastructure.',
    description:
      'Automated TLS/SSL certificate issuance and renewal across university infrastructure: Ansible playbooks with win-acme for Windows servers, and Certbot with Bash for Linux servers.',
    category: 'Security',
    role: 'Southern Illinois University, Carbondale',
    year: '2023–25',
    tech: ['Ansible', 'Certbot', 'win-acme', 'Sectigo', 'OpenSSL', 'Apache'],
    link: { label: 'On LinkedIn', href: projectsPage },
    art: 'orbit',
    palette: ['#3fd8f0', '#9b7bff', '#5b8cff'],
    artAlt: 'Generated artwork: a glowing core ringed by orbit paths, suggesting a chain of trust.',
    highlights: [
      "Deployed and managed 50+ certificates (Sectigo, Let's Encrypt) securing all critical services",
      'Cut manual certificate renewals by ~90% and kept certificate-expiry incidents near zero',
      'Built an automated SSL SAN request form in the team wiki and documented the TLS/PKI process',
    ],
  },
  {
    slug: 'backup-restore-validation',
    title: 'Backup & Restore Validation',
    summary: 'Python + Jenkins automation that runs database backups and proves they actually restore.',
    description:
      'Built a Python automation, integrated with Selenium and Jenkins, that runs database backups and restore tests for client websites — turning manual backup testing into a repeatable Jenkins job.',
    category: 'Automation',
    role: 'Southern Illinois University, Carbondale',
    year: '2023–25',
    tech: ['Python', 'Selenium', 'Jenkins', 'MySQL', 'Bash', 'Linux'],
    link: { label: 'On LinkedIn', href: projectsPage },
    art: 'signal',
    palette: ['#3fd8f0', '#5b8cff', '#f072d6'],
    artAlt: 'Generated artwork: steady waveform lines on a dark grid with a floating uptime card.',
    highlights: [
      'Automated restore validation with scheduled test restores and file-integrity checks',
      'Cut system recovery time by 50% and reduced risk of data loss',
      'Improved disaster-recovery readiness with a repeatable Jenkins job',
    ],
  },
  {
    slug: 'jenkins-site-automation',
    title: 'Fleet Config Automation',
    summary: 'Jenkins-driven configuration and plugin-compatibility testing across 70+ websites.',
    description:
      'Automated configuration and testing across client WordPress websites using Python, Selenium and the Jenkins remote API.',
    category: 'CI/CD',
    role: 'Southern Illinois University, Carbondale',
    year: '2023–25',
    tech: ['Python', 'Selenium', 'Jenkins API', 'WordPress', 'Linux'],
    link: { label: 'On LinkedIn', href: projectsPage },
    art: 'aurora',
    palette: ['#5b8cff', '#9b7bff', '#3fd8f0'],
    artAlt: 'Generated artwork: a frosted dashboard window with status rings and bar charts over flowing gradients.',
    highlights: [
      'Rolled out WordPress 2FA plugin configuration to ~72 websites through Jenkins-triggered jobs',
      'Automated plugin compatibility testing across 50+ client sites to catch conflicts before updates',
      'Reduced plugin-related downtime incidents by 70% and cut manual testing effort by 50%',
    ],
  },
  {
    slug: 'jenkins-cicd',
    title: 'Jenkins CI/CD Pipelines',
    summary: 'Groovy pipelines with REST triggers, Teams alerts and a Selenium regression suite.',
    description:
      'As a Graduate Research Assistant, led automation for university IT infrastructure across 50+ internal services: CI/CD pipelines, regression testing and scripted server maintenance.',
    category: 'CI/CD',
    role: 'Graduate Research Assistant · SIU',
    year: '2023–25',
    tech: ['Jenkins', 'Groovy', 'Python', 'Selenium', 'Bash', 'REST APIs'],
    link: { label: 'On LinkedIn', href: experiencePage },
    art: 'terminal',
    palette: ['#3fd8f0', '#5b8cff', '#9b7bff'],
    artAlt: 'Generated artwork: a glass terminal window above a row of pipeline stages, all passing.',
    highlights: [
      'Groovy-based Jenkins pipelines with REST API triggers and Microsoft Teams alerts — release velocity up 40%',
      'Selenium + Python regression suite in the pipeline — regression testing time cut by 50%',
      '15+ Bash scripts for health checks, backups and patching — 20+ engineering hours recovered per week',
    ],
  },
  {
    slug: 'llm-security-research',
    title: 'Enterprise LLM Security',
    summary: 'Research on security and privacy risks in enterprise LLM, RAG and agentic AI deployments.',
    description:
      'Research internship on security and privacy in large language models for enterprise use, with a focus on safe deployment of retrieval-augmented generation and agentic AI.',
    category: 'Research',
    role: 'Research Intern · SIU',
    year: '2025–26',
    tech: ['Python', 'LLMs', 'RAG', 'Generative AI'],
    link: { label: 'On LinkedIn', href: experiencePage },
    art: 'shield',
    palette: ['#9b7bff', '#f072d6', '#3fd8f0'],
    artAlt: 'Generated artwork: a luminous shield outline connected to a network of nodes.',
    highlights: [
      'Analyzed security and privacy vulnerabilities in real-world enterprise LLM integrations',
      'Prototyped secure infrastructure components for sensitive customer workflows',
      'Proposed enterprise-grade LLM security strategies balancing privacy and usability',
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Systems',
    blurb: 'Linux and Windows Server, from build to patch.',
    icon: ServerCog,
    skills: [
      { label: 'Linux (RHEL · Fedora · Ubuntu)', icon: Terminal },
      { label: 'Windows Server', icon: Server },
      { label: 'Apache', icon: Globe },
      { label: 'TCP/IP · DNS · DHCP', icon: Network },
      { label: 'VDI', icon: Boxes },
    ],
  },
  {
    title: 'Cloud & identity',
    blurb: 'AWS and Azure operations with access done right.',
    icon: Cloud,
    skills: [
      { label: 'AWS (EC2)', icon: Cloud },
      { label: 'Azure (AZ-900)', icon: Cloud },
      { label: 'IAM & RBAC', icon: Users },
      { label: 'Terraform', icon: Container },
    ],
  },
  {
    title: 'Automation & CI/CD',
    blurb: 'Pipelines and playbooks instead of checklists.',
    icon: Workflow,
    skills: [
      { label: 'Ansible', icon: Workflow },
      { label: 'Jenkins', icon: Zap },
      { label: 'Groovy', icon: FileCode2 },
      { label: 'Git', icon: GitBranch },
      { label: 'Selenium', icon: Search },
    ],
  },
  {
    title: 'Scripting',
    blurb: 'Small tools that save hours every week.',
    icon: Braces,
    skills: [
      { label: 'Python', icon: Code2 },
      { label: 'Bash', icon: Terminal },
      { label: 'PowerShell', icon: Terminal },
      { label: 'SQL', icon: Database },
    ],
  },
  {
    title: 'Security & operations',
    blurb: 'Keep it encrypted, monitored and ticketed.',
    icon: Shield,
    skills: [
      { label: 'TLS/SSL & PKI', icon: KeyRound },
      { label: 'OpenSSL', icon: Lock },
      { label: 'ServiceNow', icon: Ticket },
      { label: 'Monitoring & alerting', icon: BellRing },
      { label: 'ITIL', icon: Wrench },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: 'Jun 2026 — Present',
    role: 'Server Support Engineer I',
    org: 'Jabil · Contract via Populus Group',
    summary:
      'Monitor and support Windows and Linux servers, troubleshoot OS, software and network issues, manage incidents in ServiceNow, and support AWS and Azure operations with Python and SQL automation.',
  },
  {
    period: 'Aug 2025 — Jun 2026',
    role: 'Research Intern',
    org: 'Southern Illinois University, Carbondale',
    summary:
      'Researched security and privacy in enterprise LLM integrations, prototyped secure infrastructure components and explored safe RAG and agentic AI deployment.',
  },
  {
    period: 'Jul 2025 — Aug 2025',
    role: 'Infrastructure Automation Engineer (Volunteer)',
    org: 'Southern Illinois University, Carbondale',
    summary:
      'Automated the end-to-end TLS certificate lifecycle with Ansible, Certbot and win-acme, co-built Python REST APIs for provisioning (40% faster spin-up) and enforced IAM and role-based access.',
  },
  {
    period: 'Sep 2023 — May 2025',
    role: 'Graduate Research Assistant – Systems Automation & CI/CD',
    org: 'Southern Illinois University, Carbondale',
    summary:
      'Led automation for 50+ internal services: Jenkins CI/CD pipelines, TLS/SSL deployment, Selenium regression testing, 15+ Bash automation scripts and secure PHP/CodeIgniter modules.',
  },
  {
    period: 'Jan 2022 — Jan 2023',
    role: 'Assistant System Engineer – Incident & Infrastructure Support',
    org: 'AKNEV Solutions · Hyderabad, India',
    summary:
      'L2/L3 support: resolved 200+ incidents and changes in ServiceNow (SLA compliance up 15%), sustained 99.9% availability and migrated monitoring to VDI for 500+ users.',
  },
];

export const credentials = [
  { title: 'M.S. Computer Science', issuer: 'Southern Illinois University · 3.9 GPA' },
  { title: 'Microsoft Certified: Azure Fundamentals (AZ-900)', issuer: 'Microsoft' },
  { title: 'DevOps Foundations', issuer: 'LinkedIn Learning · 2025' },
  { title: 'Agile Methodology', issuer: 'Cognizant · 2023' },
];

/** Draft copy. */
export const process: ProcessStep[] = [
  { title: 'Observe', text: 'Monitoring, logs and alerts first — know what normal looks like.', icon: Activity },
  { title: 'Diagnose', text: 'Follow the evidence to the root cause, not the loudest symptom.', icon: Search },
  { title: 'Automate', text: 'Script it, pipeline it, schedule it — remove the manual step.', icon: Workflow },
  { title: 'Harden', text: 'Certificates, access and patching handled before they become incidents.', icon: ShieldCheck },
  { title: 'Document', text: 'Runbooks and wikis so the next engineer is never starting from zero.', icon: FileText },
];

export const contact = {
  headline: ['Have something', 'extraordinary', 'in mind?'],
  blurb:
    "Hiring for systems, infrastructure, cloud/DevOps, SRE or IAM/PKI work — or need a hand automating something? Send a note and I'll get back to you.",
};
