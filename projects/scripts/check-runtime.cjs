// Official security releases: https://nodejs.org/en/blog/vulnerability/october-2026-security-releases
// Runtime provenance/version is needed for the intermediate-key blocklist too;
// inspecting roots alone cannot prove that upstream TLS fix is installed.
const { X509Certificate } = require("node:crypto");
const { readFileSync } = require("node:fs");
const tls = require("node:tls");

if (!/^\d+\.\d+\.\d+$/.test(process.versions.node)) {
  throw new Error("Use patched Node stable releases; prerelease or malformed versions are not supported.");
}
const [major, minor, patch] = process.versions.node.split(".").map(Number);
const floors = { 22: [23, 4], 24: [22, 1] };
const floor = floors[major];
if (!floor || minor < floor[0] || (minor === floor[0] && patch < floor[1])) {
  throw new Error("Use patched Node 22.23.4+ (22.x) or 24.22.1+ (24.x).");
}
if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0") {
  throw new Error("TLS certificate verification must remain enabled.");
}
const removedRoots = new Set([
  "CN=emSign ECC Root CA - G3",
  "CN=emSign Root CA - C1",
  "CN=emSign ECC Root CA - C3",
  "CN=AAA Certificate Services",
]);
// Debian's incident fix retains C1/C3; those two removals are a separate NSS policy change.
const incidentRoots = new Set(["CN=emSign ECC Root CA - G3", "CN=AAA Certificate Services"]);
function verifyRoots(pems, label, forbidden = incidentRoots) {
  if (!pems.length) throw new Error(`${label}: empty CA store`);
  for (const pem of pems) {
    const cert = new X509Certificate(pem);
    if (cert.subject.split("\n").some(part => forbidden.has(part))) {
      throw new Error(`${label}: contains a removed CA root`);
    }
  }
}
verifyRoots(tls.rootCertificates, "Node bundled CA store", removedRoots);
verifyRoots(tls.getCACertificates("default"), "Node effective default CA store");
if (process.argv[2]) {
  const bundle = readFileSync(process.argv[2], "utf8");
  verifyRoots(bundle.match(/-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g) || [], "OS CA bundle");
}
console.log(`Node ${process.versions.node}: security version and CA-store checks passed`);
