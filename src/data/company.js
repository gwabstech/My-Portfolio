export const company = {
  legalName: "GWABS TECHNOLOGY LIMITED",
  shortName: "GWABS",
  formerName: "Gwabstech Solutions",
  rc: "9482405",
  tin: "2623758929985",
  incorporated: "13 April 2026",
  tagline: "Fintech infrastructure, engineered to settle.",
  whatWeDo:
    "Fintech solutions & consultancy, POS solutions, and device & hardware SDK development.",
  email: "info@gwabs.com",
  phone: "+234 903 086 3146",
  address: "No 32 Gilbert Lodge, Back of Abbatua, Karu, Abuja, FCT, Nigeria",
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const trustBadges = [
  "NIBSS",
  "Interswitch",
  "ISO 8583",
  "EMV",
  "PCI DSS",
  "Topwise",
  "Urovo",
  "Blumen",
  "Otech MFB",
  "Regent MFB",
];

export const trustCategories = [
  {
    label: "Payment Rails & Standards",
    items: ["NIBSS", "Interswitch", "ISO 8583", "EMV"],
  },
  {
    label: "Security & Terminal Hardware",
    items: ["PCI DSS", "Topwise", "Urovo", "Blumen"],
  },
  {
    label: "Production Banking Partners",
    items: ["Otech MFB", "Regent MFB", "Bellbank MFB", "TeasyPay"],
  },
];

export const stats = [
  { value: "3+", label: "POS device platforms", detail: "Topwise, Urovo & Blumen HAL" },
  { value: "8+", label: "Processor integrations", detail: "NIBSS, Interswitch, CoralPay & more" },
  { value: "PCI DSS", label: "Certified expertise", detail: "DUKPT, AES-256-GCM & CBN compliance" },
  { value: "Live", label: "Production deployments", detail: "11+ shipped banking & SaaS systems" },
];

export const media = {
  explainerVideo: "/media/engineered-to-settle.mp4",
  capabilityStatement: "/docs/GWABS_Capability_Statement.pdf",
};

export const howItWorksSteps = [
  {
    step: "Step 1",
    title: "Connect & Abstract",
    subtitle: "Hardware HAL & Rail Onboarding",
    description:
      "Integrate POS terminals (Topwise, Urovo, Blumen, Horizon) or merchant apps through one unified EMV and ISO 8583 abstraction layer.",
    link: "/solutions#sdks",
    linkLabel: "Explore Device SDKs",
  },
  {
    step: "Step 2",
    title: "Route & Isolate",
    subtitle: "BIN Switching & Tenant Vaults",
    description:
      "Route transactions dynamically by card BIN across NIBSS, Interswitch, CoralPay, and Zone with automatic failover and isolated per-POS ledgers.",
    link: "/solutions#switching",
    linkLabel: "Explore Payment Switching",
  },
  {
    step: "Step 3",
    title: "Deploy & Settle",
    subtitle: "Real-Time TMS & Auto-Reconciliation",
    description:
      "Manage terminal fleets over-the-air with CBN geofence kill-switches, sub-millisecond WebSocket alerts, and automated T+0 settlement.",
    link: "/solutions#software",
    linkLabel: "Explore TMS & SaaS",
  },
];

export const institutionalFeatures = [
  {
    id: "isolated-switching",
    badge: "HIGH-AVAILABILITY SWITCHING",
    title: "Multi-Processor BIN Failover",
    description:
      "Each processor route operates with independent health checks, automatic key exchange (TMK/TPK/TSK), and instant BIN-based fallback so terminal cashout never stalls.",
    metricValue: "99.98%",
    metricLabel: "Target routing availability",
    secondaryValue: "< 450ms",
    secondaryLabel: "Median ISO 8583 turnaround",
    caseStudySlug: "bellbank-cashout-middleware",
    caseStudyTitle: "Bellbank Cashout Middleware",
    pillarId: "switching",
    routes: [
      { bin: "539983 •••• Mastercard", processor: "NIBSS / CoralPay", status: "HEALTHY", latency: "180ms" },
      { bin: "506099 •••• Verve", processor: "Interswitch Direct", status: "ACTIVE", latency: "210ms" },
      { bin: "418742 •••• Visa", processor: "Zone / UP Fallback", status: "STANDBY", latency: "195ms" },
    ],
  },
  {
    id: "unified-hal",
    badge: "DEVICE & HARDWARE ABSTRACTION",
    title: "One EMV SDK Across All Vendors",
    description:
      "Write payment logic once. Our Hardware Abstraction Layer normalizes card readers, PIN pads, DUKPT encryption, and thermal printers across Topwise, Urovo, and Blumen terminals.",
    metricValue: "3x Faster",
    metricLabel: "New terminal certification",
    secondaryValue: "v1.4.2",
    secondaryLabel: "Production verified HAL",
    caseStudySlug: "teasypay-pos-sdk",
    caseStudyTitle: "TeasyPay POS SDK",
    pillarId: "sdks",
    routes: [
      { bin: "Topwise MP35 / T1", processor: "EMV L1/L2 + Contactless", status: "CERTIFIED", latency: "Native + Flutter" },
      { bin: "Urovo i5300 / i9000S", processor: "Offline & Online PIN", status: "CERTIFIED", latency: "Native + Flutter" },
      { bin: "Blumen & Horizon S60", processor: "Key Exchange & Printer", status: "CERTIFIED", latency: "Native + Flutter" },
    ],
  },
  {
    id: "fleet-tms",
    badge: "FLEET & COMPLIANCE CONTROL",
    title: "Live Geofence & OTA Terminal Control",
    description:
      "Enforce CBN geographic boundaries with automatic terminal lockouts, push canary APK updates over the air, and stream real-time device heartbeats across thousands of agents.",
    metricValue: "100%",
    metricLabel: "CBN geofence enforcement",
    secondaryValue: "< 15ms",
    secondaryLabel: "WebSocket push latency",
    caseStudySlug: "blumen-tms",
    caseStudyTitle: "BlumenTMS — Terminal Management",
    pillarId: "software",
    routes: [
      { bin: "Geofence Radius Buffer", processor: "CBN Compliance Engine", status: "ENFORCED", latency: "Auto Kill-Switch" },
      { bin: "Canary APK Rollout", processor: "Staged Fleet OTA", status: "VERIFIED", latency: "Zero Downtime" },
      { bin: "Ktor Alert Gateway", processor: "WebSocket + Offline Queue", status: "STREAMING", latency: "Sub-ms Push" },
    ],
  },
  {
    id: "saas-reconciliation",
    badge: "MULTI-TENANT SAAS & LENDING",
    title: "Automated Ledger & Virtual Accounts",
    description:
      "From microfinance POS-as-a-Service to automated loan lifecycle and commercial fleet telematics, every tenant gets isolated ledgers, RBAC, and instant virtual account settlement.",
    metricValue: "T+0",
    metricLabel: "Automated reconciliation",
    secondaryValue: "AES-256",
    secondaryLabel: "Field-level PII encryption",
    caseStudySlug: "regent-mfb-merchant-platform",
    caseStudyTitle: "Regent MFB — Merchant Platform",
    pillarId: "software",
    routes: [
      { bin: "Per-POS Virtual Account", processor: "Auto-Sweep & Fee Split", status: "SETTLED", latency: "Instant DVA" },
      { bin: "Multi-Tenant RBAC", processor: "Super Admin → Cashier", status: "ISOLATED", latency: "JWT + 2FA TOTP" },
      { bin: "Automated Reconciliation", processor: "Ledger Integrity Engine", status: "AUDITED", latency: "Flyway Schema" },
    ],
  },
];

export const developerSnippets = [
  {
    id: "pos-sdk",
    label: "Unified POS SDK",
    subtitle: "One Kotlin / Flutter API across Topwise, Urovo & Blumen",
    fileName: "GwabsPosTerminal.kt",
    version: "GWABS HAL v1.4.2",
    caseStudySlug: "teasypay-pos-sdk",
    code: `// Initialize unified EMV & ISO 8583 terminal session
val terminal = GwabsPosSdk.initialize(
    context = applicationContext,
    vendor = DeviceVendor.AUTO_DETECT, // Topwise, Urovo, Blumen
    routingPolicy = RoutingPolicy.BIN_INTELLIGENT_FAILOVER
)

val result = terminal.chargeCard(
    amountKobo = 250_000_00L, // ₦250,000.00
    accountType = AccountType.SAVINGS,
    geofenceGuard = CbnGeofenceConfig(enforceRadiusMeters = 50)
)

when (result) {
    is TxResult.Approved -> terminal.printReceipt(result.stan, result.rrn)
    is TxResult.FailoverTriggered -> logger.info("Re-routed via \${result.backupRail}")
}`,
  },
  {
    id: "iso-switch",
    label: "ISO 8583 Switch API",
    subtitle: "High-availability BIN routing, key exchange & signed webhooks",
    fileName: "IsoSwitchRouter.kt",
    version: "GWABS Switch Engine v2.1",
    caseStudySlug: "bellbank-cashout-middleware",
    code: `// Configure multi-processor ISO 8583 & REST failover pipeline
val switchRouter = IsoSwitchEngine.builder()
    .registerRail("NIBSS_EPMS", Iso8583Channel(host = "196.6.103.10", port = 5043))
    .registerRail("CORALPAY", Iso8583Channel(host = "switch.coralpay.com", tls = true))
    .registerRail("INTERSWITCH", KimonoRestChannel(keyRotation = KeySchedule.HOURLY))
    .withHmacWebhook(secret = env.webhookSigningKey, algorithm = "HmacSHA256")
    .build()

// Route cashout request with automatic reversal on timeout
val settlement = switchRouter.routeCashout(isoMsg0200) {
    onProcessorTimeout { failedRail -> failoverToNextHealthy(failedRail) }
}`,
  },
  {
    id: "alert-gateway",
    label: "WebSocket Alert SDK",
    subtitle: "Sub-millisecond terminal push notifications with offline replay",
    fileName: "TerminalAlertStream.kt",
    version: "GWABS Gateway v1.8",
    caseStudySlug: "ktor-notification-gateway",
    code: `// Subscribe POS terminal to encrypted real-time transfer & cashout alerts
val alertClient = GwabsAlertGateway.connect(
    endpoint = "wss://alerts.gwabs.com/v1/terminal-stream",
    terminalSerial = Build.getSerial(),
    tokenStore = TinkEncryptedTokenStore(context)
)

alertClient.onTransactionSettled { event ->
    // Guaranteed delivery even after 3G/4G drop via in-memory replay queue
    PosAudio.announceApproval(event.amountFormatted)
    ReceiptPrinter.printInstantTransferSlip(event)
}`,
  },
];
