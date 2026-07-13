/** Postgres unique_violation error code (slug/username vb. UNIQUE kısıtlaması ihlali). */
export function isUniqueViolation(err: unknown): boolean {
  return typeof err === "object" && err !== null && "code" in err && (err as { code?: unknown }).code === "23505";
}
