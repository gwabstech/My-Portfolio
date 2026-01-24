# Project Documentation: Gwabs Payment System (GPS)
## For Agency Banking & Merchant POS Collection

### 1. Executive Summary
Gwabs Payment System (GPS) is a high-performance, secure payment orchestration infrastructure designed to bridge the gap between Android Point of Sale (POS) hardware and multiple financial processors.

Engineered for both **Agency Banking Networks** and **High-Volume Merchant Operations**, GPS solves the critical industry challenge of transaction reliability. By integrating multiple payment rails—specifically **Zone (ISO8583)** and **Grup (REST)**—into a single, unified middleware, GPS ensures that if one route fails, the system dynamically re-routes transactions to alternative high-availability channels. This architecture guarantees superior uptime and seamless payment collection.

---

### 2. The Core Value Proposition
GPS is not just a gateway; it is an intelligent switching orchestration layer that unifies hardware and software.

#### A. For Agency Banking (The Super-Agent Network)
*   **Zero Downtime Strategy:** Agents no longer suffer from "Network Failure." The system intelligently switches between processors to find a successful route.
*   **Dynamic Commission Engine:** Flexible fee structures allow for real-time commission calculations, incentivizing high-performing agents.
*   **Automated Reconciliation:** The dedicated `SettlementService` automates the reconciliation process, ensuring agents receive value instantly.

#### B. For Merchant Collection (Retail & Business)
*   **Unified Dashboard:** Merchants can view sales across all branches and terminals in a single interface.
*   **Profit Analytics:** Granular breakdown of Total Revenue vs. Net Profit, and performance metrics by Card Type (Visa/Mastercard/Verve).
*   **ERP Integration:** Real-time Webhooks notify the merchant's accounting software instantly when a payment is received.

---

### 3. Hardware Ecosystem & Integration
GPS is designed to be hardware-agnostic but comes optimized for industry-leading devices.

#### 📱 Supported Hardware
*   **Topwise MP35P:** Fully optimized integration for this robust handheld terminal.
*   **Topwise K11:** Seamless support for this smart Android POS.
*   **Universal Android Support:** Any Android-based POS can be integrated easily.

#### 🔌 The GPS "Universal Bridge" API
We have developed a lightweight API layer that bridges the gap between hardware and the banking switch. This allows third-party developers or hardware vendors to integrate any Android POS into the Gwabs ecosystem without rewriting the core banking logic.

*   **Simple SDK:** Just plug in the GPS SDK to handle card reading and pin entry.
*   **Unified Protocol:** The SDK handles the translation between the hardware drivers and the GPS Switch.

#### [Video Showcase]
See the GPS in action on live hardware:
*   [Link: Topwise MP35P Live Transaction Demo]
*   [Link: Agency Banking Cash-Out Workflow Demo]

---

### 4. Technical Architecture: The "Multi-Homed" Switch
The system is built on a multi-processor architecture. A single physical terminal is "Multi-Homed," meaning it holds unique Terminal IDs (TIDs) for every configured processor simultaneously.

#### 4.1 Processor Integrations
**Zone Network (ISO8583):**
*   **Protocol:** Direct TCP/IP ISO8583 messaging (The Gold Standard).
*   **Capabilities:** High-speed Echo (0800), Purchase/Cashout (0200), and Reversals (0420).
*   **Use Case:** Ideal for high-volume Agency Banking cash-outs where speed is critical.

**Grup Charge (Modern REST):**
*   **Protocol:** Secure JSON-over-HTTP with payload encryption.
*   **Security:** Implements `EncryptionGrup` for payload integrity.
*   **Use Case:** Perfect fallback rail or for Merchant Collections requiring rich data.

**Secondary Rails:** Ready adapters for CoralPay and Unified Payments (UP).

#### 4.2 Intelligent Switching Logic
GPS monitors the health of upstream processors. If Zone reports high latency, the system can instantly route the next transaction through Grup without the agent needing to restart the device or change settings.

---

### 5. Security & Compliance
Security is woven into the fabric of the middleware, ensuring trust for the bank, the merchant, and the customer.

*   **Terminal Authentication:** Every terminal issues a unique, rotating `apiKey` upon registration. Unauthorized devices are instantly rejected.
*   **Enhanced Key Exchange:** The `EnhancedKeyExchangeService` manages cryptographic keys dynamically. Secure key exchanges are performed specifically for the active processor during session initialization.
*   **End-to-End Encryption:**
    *   **Grup Channel:** Session-based AES encryption.
    *   **Zone Channel:** Standard ISO PIN block and MACing security.
*   **Data Privacy:** Strict segregation of KYC data and transaction logs.

---

### 6. Business Management & Operations
The system provides a hierarchical structure to manage large fleets of devices efficiently.

#### Entity Structure
*   **Business Entity:** Represents the Merchant or Agent. Stores KYC data (RC Number, TIN), Settlement accounts, and Webhook configurations.
*   **Terminal Entity:** The physical POS device.
    *   **Master Serial Number:** The hardware identifier.
    *   **Internal TID (GWABS-xxxxx):** A unique system-wide identifier.
    *   **Processor TIDs:** The specific IDs mapped to upstream banks (Zone TID, Grup TID, etc.).

#### Fleet Tools
*   **Bulk Onboarding:** Excel-based bulk upload allows operations teams to onboard thousands of terminals and map them to their respective processor TIDs in minutes.
*   **Remote Configuration:** Push updates, change routing logic, or disable terminals remotely from the admin dashboard.

---

### 7. Technical Specifications Snapshot
*   **Backend:** Kotlin (Ktor Framework) – Selected for high concurrency and asynchronous I/O.
*   **Database:** Relational SQL – Optimized for transactional integrity and ACID compliance.
*   **Infrastructure:** Dockerized containers for rapid scaling on cloud infrastructure (AWS/GCP/Azure).
*   **API Architecture:** Modern REST/JSON frontend for the Admin Dashboard + ISO8583/TCP backend for Switching.

---

### Conclusion
Gwabs Payment System empowers Banks, Super-Agents, and large Merchants to dominate the market. By combining the speed of Zone, the flexibility of Grup, and the hardware versatility of Topwise, GPS delivers the reliability needed to scale a massive payment network.
