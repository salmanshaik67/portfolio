/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional JSON POST endpoint for the contact form (e.g. a Formspree URL). */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
