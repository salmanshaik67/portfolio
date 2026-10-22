/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional JSON POST endpoint for the contact form (e.g. a Formspree URL). */
  readonly VITE_CONTACT_ENDPOINT?: string;
  /** Overrides the location shown on the site. */
  readonly VITE_LOCATION?: string;
  /** Overrides the contact email. */
  readonly VITE_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
