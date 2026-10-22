/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL PERSONAL CONTENT LIVES HERE.
 *
 *  Content is taken from Salman Shaik's LinkedIn profile
 *  (linkedin.com/in/salmanshaik7770). Edit anything below and the whole site
 *  updates. Lines marked "Draft copy" were written for the site, not copied
 *  from LinkedIn — review them before publishing. Code snippets in the work
 *  section are illustrative and labelled as such on the page.
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
  Mail,
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

export type SectionId = 'home' | 'work' | 'about' | 'skills' | 'experience' | 'contact';
export type NavItem = { id: SectionId; label: string };
export type Social = { label: string; href: string; icon: LucideIcon; handle: string };
export type Chip = { label: string; icon: LucideIcon };

export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  /** Hero headline, one entry per line. */
  headline: string[];
  /** Hero sub-line: text before the chips, the chips, then text after. */
  introLead: string;
  introChips: Chip[];
  introTail: string;
  status: string;
  socials: Social[];
};

export type CodeLang = 'yaml' | 'python' | 'groovy' | 'bash';

export type Project = {
  slug: string;
  /** Short label used on the tab. */
  tab: string;
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
  context: string;
  year: string;
  tech: string[];
  link: { label: string; href: string };
  highlights: { title: string; text: string }[];
  /** Illustrative snippet shown in the editor panel. */
  file: string;
  lang: CodeLang;
  code: string[];
  /** Lines printed when the visitor presses Run. */
  output: string[];
  /** Accent colour for the tab and highlight cards. */
  accent: string;
};

export type Impact = { value: string; label: string; detail: string; tone: 'green' | 'pink' | 'blue' | 'teal' | 'amber' | 'violet' | 'ink' };

export type SkillGroup = { title: string; blurb: string; icon: LucideIcon; tone: 'violet' | 'teal' | 'blue' | 'green' | 'amber'; skills: Chip[] };

export type TimelineEntry = { period: string; role: string; org: string; summary: string; tile: 'lines' | 'ascii' | 'pattern' | 'bars' | 'grid'; tileLabel: string };

export type ProcessStep = { title: string; text: string; icon: LucideIcon };

/* ── Quick edits ───────────────────────────────────────────────────────── */

const linkedinUrl = 'https://www.linkedin.com/in/salmanshaik7770/';

/**
 * ✏️  Either change the defaults below, or — without touching code — set the GitHub
 * repository variables VITE_LOCATION / VITE_EMAIL
 * (Settings → Secrets and variables → Actions → Variables) and re-run the deploy.
 */
const LOCATION = import.meta.env.VITE_LOCATION?.trim() || 'Hebron, KY (Willing to Relocate)';
const EMAIL = import.meta.env.VITE_EMAIL?.trim() || 'salmanshaik7770@gmail.com';

/* ── Content ───────────────────────────────────────────────────────────── */

export const profile: Profile = {
  name: 'Salman Shaik',
  role: 'Systems & Infrastructure Engineer',
  location: LOCATION,
  email: EMAIL,
  headline: ['Automating the Infrastructure', 'Teams Rely On Every Day.'],
  introLead: 'Systems & Infrastructure Engineer building and automating',
  introChips: [
    { label: 'Linux', icon: Terminal },
    { label: 'Windows Server', icon: Server },
    { label: 'AWS', icon: Cloud },
    { label: 'Azure', icon: Cloud },
    { label: 'Ansible', icon: Workflow },
    { label: 'Jenkins', icon: Zap },
  ],
  introTail: 'and the TLS/PKI that keeps it all secure.',
  status: 'Server Support Engineer at Jabil',
  socials: [{ label: 'LinkedIn', handle: 'in/salmanshaik7770', href: linkedinUrl, icon: Linkedin }],
};

export const navItems: NavItem[] = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

/** Shown in the scrolling stack strip under the hero. */
export const stack: Chip[] = [
  { label: 'RHEL', icon: Terminal },
  { label: 'Ubuntu', icon: Terminal },
  { label: 'Windows Server', icon: Server },
  { label: 'AWS EC2', icon: Cloud },
  { label: 'Azure', icon: Cloud },
  { label: 'Ansible', icon: Workflow },
  { label: 'Terraform', icon: Container },
  { label: 'Jenkins', icon: Zap },
  { label: 'Python', icon: Code2 },
  { label: 'PowerShell', icon: Terminal },
  { label: 'OpenSSL', icon: Lock },
  { label: 'ServiceNow', icon: Ticket },
];

export const about = {
  title: 'Meet Salman',
  body: [
    'Systems & Infrastructure Engineer with 3+ years building, supporting and automating Linux and Windows Server environments across on-prem, AWS and Azure.',
    'Currently a Server Support Engineer at Jabil (via Populus Group): enterprise server monitoring, log and alert triage, ServiceNow incident management, user access management and AWS/Azure operations. M.S. in Computer Science from Southern Illinois University · authorized to work in the U.S.',
  ],
  openTo: ['Systems Engineer', 'Infrastructure Engineer', 'Cloud / DevOps Engineer', 'SRE', 'IAM / PKI Engineer'],
};

const projectsPage = `${linkedinUrl}details/projects/`;
const experiencePage = `${linkedinUrl}details/experience/`;

export const projects: Project[] = [
  {
    slug: 'tls-lifecycle',
    tab: 'TLS / PKI',
    icon: ShieldCheck,
    title: 'TLS Certificate Lifecycle',
    description:
      'Automated TLS/SSL certificate issuance and renewal across university infrastructure: Ansible playbooks with win-acme for Windows servers, and Certbot with Bash for Linux servers.',
    category: 'Security',
    context: 'Southern Illinois University, Carbondale',
    year: '2023–25',
    tech: ['Ansible', 'Certbot', 'win-acme', 'Sectigo', 'OpenSSL', 'Apache'],
    link: { label: 'On LinkedIn', href: projectsPage },
    highlights: [
      { title: '50+ certificates', text: "Sectigo and Let's Encrypt, securing all critical services." },
      { title: '~90% fewer renewals', text: 'Manual renewal work removed; expiry incidents near zero.' },
      { title: 'Self-serve SAN requests', text: 'Automated request form and TLS/PKI docs in the team wiki.' },
    ],
    file: 'renew-certs.yml',
    lang: 'yaml',
    code: [
      '# Illustrative — renew every certificate, Linux and Windows',
      '- hosts: web_linux',
      '  become: true',
      '  tasks:',
      '    - name: Renew with Certbot',
      '      command: certbot renew --quiet --deploy-hook "systemctl reload apache2"',
      '',
      '- hosts: web_windows',
      '  tasks:',
      '    - name: Renew with win-acme',
      '      win_command: wacs.exe --renew --notaskupdate',
    ],
    output: [
      '$ ansible-playbook renew-certs.yml',
      'PLAY [web_linux] ************************',
      'TASK [Renew with Certbot] ............ ok',
      'PLAY [web_windows] **********************',
      'TASK [Renew with win-acme] ...... changed',
      'PLAY RECAP ........... failed=0  unreachable=0',
      '✓ no certificates expiring in the next 30 days',
    ],
    accent: '#77dddd',
  },
  {
    slug: 'backup-restore-validation',
    tab: 'Backup & Restore',
    icon: Database,
    title: 'Backup & Restore Validation',
    description:
      'A Python automation, integrated with Selenium and Jenkins, that runs database backups and restore tests for client websites — turning manual backup testing into a repeatable Jenkins job.',
    category: 'Automation',
    context: 'Southern Illinois University, Carbondale',
    year: '2023–25',
    tech: ['Python', 'Selenium', 'Jenkins', 'MySQL', 'Bash', 'Linux'],
    link: { label: 'On LinkedIn', href: projectsPage },
    highlights: [
      { title: 'Restores, proven', text: 'Scheduled test restores with file-integrity checks.' },
      { title: '50% faster recovery', text: 'System recovery time cut in half; less risk of data loss.' },
      { title: 'DR-ready', text: 'Disaster-recovery testing became a repeatable Jenkins job.' },
    ],
    file: 'validate_restore.py',
    lang: 'python',
    code: [
      '# Illustrative — a backup only counts if it restores',
      'def validate_restore(db: str) -> bool:',
      '    dump = backup(db)                      # timestamped mysqldump',
      '    restore(dump, target=f"{db}_verify")',
      '    return checksum(db) == checksum(f"{db}_verify")',
      '',
      'for site in client_sites():',
      '    assert validate_restore(site.db), f"restore failed: {site.name}"',
    ],
    output: [
      '$ python validate_restore.py',
      'backup   site_db ............... ok',
      'restore  site_db_verify ........ ok',
      'checksum match ................. ok',
      '✓ every backup restored and verified',
    ],
    accent: '#00bbff',
  },
  {
    slug: 'jenkins-site-automation',
    tab: 'Fleet Config',
    icon: Globe,
    title: 'Fleet Config Automation',
    description:
      'Automated configuration and testing across client WordPress websites using Python, Selenium and the Jenkins remote API.',
    category: 'CI/CD',
    context: 'Southern Illinois University, Carbondale',
    year: '2023–25',
    tech: ['Python', 'Selenium', 'Jenkins API', 'WordPress', 'Linux'],
    link: { label: 'On LinkedIn', href: projectsPage },
    highlights: [
      { title: '~72 sites', text: '2FA plugin configuration rolled out through Jenkins-triggered jobs.' },
      { title: '50+ sites tested', text: 'Plugin compatibility checked before every update.' },
      { title: '70% fewer incidents', text: 'Plugin-related downtime down; manual testing halved.' },
    ],
    file: 'rollout.py',
    lang: 'python',
    code: [
      '# Illustrative — fan a job out across the whole fleet',
      'import jenkins',
      '',
      'server = jenkins.Jenkins(JENKINS_URL, username=USER, password=TOKEN)',
      'for site in sites:',
      '    server.build_job("plugin-compat-test", {"SITE": site})',
      '    server.build_job("wp-2fa-rollout", {"SITE": site})',
    ],
    output: [
      '$ python rollout.py',
      'queued plugin-compat-test for every site',
      'compat: no blocking conflicts ......... ok',
      'queued wp-2fa-rollout for every site',
      '✓ rollout complete',
    ],
    accent: '#bb88ff',
  },
  {
    slug: 'jenkins-cicd',
    tab: 'CI/CD',
    icon: GitBranch,
    title: 'Jenkins CI/CD Pipelines',
    description:
      'As a Graduate Research Assistant, led automation for university IT infrastructure across 50+ internal services: Groovy pipelines, regression testing and scripted server maintenance.',
    category: 'CI/CD',
    context: 'Graduate Research Assistant · SIU',
    year: '2023–25',
    tech: ['Jenkins', 'Groovy', 'Python', 'Selenium', 'Bash', 'REST APIs'],
    link: { label: 'On LinkedIn', href: experiencePage },
    highlights: [
      { title: '40% faster releases', text: 'Groovy pipelines with REST triggers and Teams alerts.' },
      { title: '50% less regression time', text: 'Selenium + Python suite running inside the pipeline.' },
      { title: '20+ hrs/week back', text: '15+ Bash scripts for health checks, backups and patching.' },
    ],
    file: 'Jenkinsfile',
    lang: 'groovy',
    code: [
      '// Illustrative — test, deploy, tell the team',
      'pipeline {',
      '  agent any',
      '  stages {',
      "    stage('Test')   { steps { sh 'pytest tests/selenium' } }",
      "    stage('Deploy') { steps { sh './deploy.sh' } }",
      '  }',
      '  post {',
      '    failure { office365ConnectorSend message: "Build failed: ${env.JOB_NAME}" }',
      '  }',
      '}',
    ],
    output: [
      '[Pipeline] stage (Test)',
      'tests/selenium ........................ passed',
      '[Pipeline] stage (Deploy)',
      './deploy.sh ........................... done',
      'Finished: SUCCESS',
    ],
    accent: '#ffcc66',
  },
  {
    slug: 'llm-security-research',
    tab: 'LLM Security',
    icon: Shield,
    title: 'Enterprise LLM Security',
    description:
      'Research internship on security and privacy in large language models for enterprise use, focused on safe deployment of retrieval-augmented generation and agentic AI.',
    category: 'Research',
    context: 'Research Intern · SIU',
    year: '2025–26',
    tech: ['Python', 'LLMs', 'RAG', 'Generative AI'],
    link: { label: 'On LinkedIn', href: experiencePage },
    highlights: [
      { title: 'Threat analysis', text: 'Security and privacy gaps in real enterprise LLM integrations.' },
      { title: 'Secure prototypes', text: 'Infrastructure components for sensitive customer workflows.' },
      { title: 'Practical strategy', text: 'LLM security approaches balancing privacy and usability.' },
    ],
    file: 'guarded_rag.py',
    lang: 'python',
    code: [
      '# Illustrative — access-aware retrieval with guardrails',
      'def guarded_answer(query: str, user: User) -> str:',
      '    docs = retriever.search(query, acl=user.groups)',
      '    context = redact_pii(docs)',
      '    answer = llm.generate(query, context)',
      '    return policy_check(answer)',
    ],
    output: [
      '$ python guarded_rag.py',
      'retrieve (acl filtered) ............ ok',
      'redact pii ......................... ok',
      'policy check ....................... ok',
      '✓ answer returned within policy',
    ],
    accent: '#f07a8a',
  },
];

/** Numbers from the LinkedIn profile. */
export const impact: Impact[] = [
  { value: '50+', label: 'TLS certificates automated', detail: '~90% fewer manual renewals', tone: 'green' },
  { value: '200+', label: 'Incidents & changes resolved', detail: 'SLA compliance up 15% in ServiceNow', tone: 'pink' },
  { value: '99.9%', label: 'Platform availability', detail: '24/7 server health monitoring', tone: 'blue' },
  { value: '40%', label: 'Faster releases', detail: 'Groovy-based Jenkins pipelines', tone: 'teal' },
  { value: '20+', label: 'Hours saved every week', detail: '15+ Bash/Python automation scripts', tone: 'amber' },
  { value: '500+', label: 'Users migrated to VDI', detail: 'Hardware overhead down 20%', tone: 'violet' },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Systems',
    blurb: 'Linux and Windows Server, from build to patch.',
    icon: ServerCog,
    tone: 'violet',
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
    tone: 'teal',
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
    tone: 'blue',
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
    tone: 'green',
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
    tone: 'amber',
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
    tile: 'lines',
    tileLabel: 'ONLINE',
  },
  {
    period: 'Aug 2025 — Jun 2026',
    role: 'Research Intern',
    org: 'Southern Illinois University, Carbondale',
    summary:
      'Researched security and privacy in enterprise LLM integrations, prototyped secure infrastructure components and explored safe RAG and agentic AI deployment.',
    tile: 'ascii',
    tileLabel: 'LLM SEC',
  },
  {
    period: 'Jul 2025 — Aug 2025',
    role: 'Infrastructure Automation Engineer (Volunteer)',
    org: 'Southern Illinois University, Carbondale',
    summary:
      'Automated the end-to-end TLS certificate lifecycle with Ansible, Certbot and win-acme, co-built Python REST APIs for provisioning (40% faster spin-up) and enforced IAM and role-based access.',
    tile: 'pattern',
    tileLabel: 'TLS',
  },
  {
    period: 'Sep 2023 — May 2025',
    role: 'Graduate Research Assistant – Systems Automation & CI/CD',
    org: 'Southern Illinois University, Carbondale',
    summary:
      'Led automation for 50+ internal services: Jenkins CI/CD pipelines, TLS/SSL deployment, Selenium regression testing, 15+ Bash automation scripts and secure PHP/CodeIgniter modules.',
    tile: 'bars',
    tileLabel: 'CI/CD',
  },
  {
    period: 'Jan 2022 — Jan 2023',
    role: 'Assistant System Engineer – Incident & Infrastructure Support',
    org: 'AKNEV Solutions · Hyderabad, India',
    summary:
      'L2/L3 support: resolved 200+ incidents and changes in ServiceNow (SLA compliance up 15%), sustained 99.9% availability and migrated monitoring to VDI for 500+ users.',
    tile: 'grid',
    tileLabel: '99.9%',
  },
];

export const credentials = [
  { title: 'M.S. Computer Science', issuer: 'Southern Illinois University · 3.9 GPA', code: 'M.S.' },
  { title: 'Azure Fundamentals', issuer: 'Microsoft Certified · AZ-900', code: 'AZ-900' },
  { title: 'DevOps Foundations', issuer: 'LinkedIn Learning · 2025', code: 'DEVOPS' },
  { title: 'Agile Methodology', issuer: 'Cognizant · 2023', code: 'AGILE' },
];

/** Draft copy. */
export const process: ProcessStep[] = [
  { title: 'Observe', text: 'Monitoring, logs and alerts first.', icon: Activity },
  { title: 'Diagnose', text: 'Follow evidence to the root cause.', icon: Search },
  { title: 'Automate', text: 'Script it, pipeline it, schedule it.', icon: Workflow },
  { title: 'Harden', text: 'Certificates, access and patching.', icon: ShieldCheck },
  { title: 'Document', text: 'Runbooks the next engineer can trust.', icon: FileText },
];

/** Draft copy. */
export const manifesto =
  'If I have to do it twice, I script it. If it can break silently, I monitor it. If someone else will run it, I document it. Infrastructure should be the quietest part of everyone’s day.';

/** Chips in the gradient banner. */
export const bannerChips: Chip[] = [
  { label: 'Linux', icon: Terminal },
  { label: 'Cloud', icon: Cloud },
  { label: 'CI/CD', icon: GitBranch },
  { label: 'PKI', icon: KeyRound },
];

export const contact = {
  headline: "Let's build infrastructure that just works",
  blurb:
    "Hiring for systems, infrastructure, cloud/DevOps, SRE or IAM/PKI work — or need a hand automating something? Send a note and I'll get back to you.",
  emailIcon: Mail,
};
