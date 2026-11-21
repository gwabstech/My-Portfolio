import { useEffect, useState } from 'react'

const POS_SUB_PHASES = [
  {
    key: 'insert',
    step: '1/4',
    badge: 'CARD INSERTED',
    screenTitle: 'EMV CHIP DETECTED',
    screenSub: 'READING AID A0000000041010...',
    amount: '₦250,000.00',
    pinCount: 0,
    activeKey: null,
    cardInserted: true,
    charged: false,
    receiptOut: false,
  },
  {
    key: 'authorize',
    step: '2/4',
    badge: 'PIN AUTHORIZED',
    screenTitle: 'CUSTOMER PIN VERIFIED',
    screenSub: 'DUKPT 3DES/AES PIN BLOCK OK',
    amount: '₦250,000.00',
    pinCount: 4,
    activeKey: 'OK',
    cardInserted: true,
    charged: false,
    receiptOut: false,
  },
  {
    key: 'charge',
    step: '3/4',
    badge: 'ACCOUNT CHARGED',
    screenTitle: '✓ CHARGED & APPROVED',
    screenSub: 'ISO 8583 (0210) · RRN 6329048192',
    amount: '₦250,000.00',
    pinCount: 4,
    activeKey: null,
    cardInserted: true,
    charged: true,
    receiptOut: false,
  },
  {
    key: 'receipt',
    step: '4/4',
    badge: 'RECEIPT PRINTED',
    screenTitle: '✓ TRANSACTION COMPLETE',
    screenSub: 'CUSTOMER COPY PRINTED · T+0',
    amount: '₦250,000.00',
    pinCount: 4,
    activeKey: 'PRINT',
    cardInserted: false,
    charged: true,
    receiptOut: true,
  },
]

const KEYPAD_SEQUENCE = ['4', '8', '2', '9']

/**
 * 1. Physical 3D POS Device Animation:
 *    Customer Card physically slides into bottom EMV slot -> Keypad lights up & PIN dots fill ->
 *    Charged & Approved splash -> Thermal receipt physically unrolls out of top printer roller!
 */
export function PosDevice3DMotion({
  vendor = 'Topwise MP35',
  failover = false,
  compact = false,
  forcedPhaseIndex = null,
}) {
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [pinStep, setPinStep] = useState(0)

  useEffect(() => {
    if (forcedPhaseIndex !== null) {
      setPhaseIdx(forcedPhaseIndex % POS_SUB_PHASES.length)
      return
    }
    const timer = setInterval(() => {
      setPhaseIdx((prev) => (prev + 1) % POS_SUB_PHASES.length)
    }, 1750)
    return () => clearInterval(timer)
  }, [forcedPhaseIndex])

  // Animate individual keypad button presses during phase 1 (authorize)
  useEffect(() => {
    if (phaseIdx !== 1) {
      setPinStep(phaseIdx > 1 ? 4 : 0)
      return
    }
    setPinStep(1)
    const t1 = setTimeout(() => setPinStep(2), 320)
    const t2 = setTimeout(() => setPinStep(3), 640)
    const t3 = setTimeout(() => setPinStep(4), 960)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [phaseIdx])

  const phase = POS_SUB_PHASES[phaseIdx]
  const activeDigit = phaseIdx === 1 && pinStep > 0 ? KEYPAD_SEQUENCE[pinStep - 1] : phase.activeKey

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-4">
      {/* 3D Orbital Circle Halo behind POS Device */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-dashed border-teal/35 animate-orbit-ring"
      >
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-teal shadow-[0_0_14px_#00C2A8]" />
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyber-blue shadow-[0_0_12px_#0256CD]" />
      </div>

      {/* Top 4-Step Flow Indicator Pill */}
      <div className="relative z-30 mb-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#040C1E]/95 border border-teal/40 shadow-lg">
        {POS_SUB_PHASES.map((p, idx) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setPhaseIdx(idx)}
            className={`text-[9px] font-mono px-2 py-0.5 rounded-full transition-all ${
              idx === phaseIdx
                ? 'bg-teal text-teal-ink font-extrabold shadow-[0_0_10px_#00C2A8]'
                : idx < phaseIdx
                ? 'text-teal font-semibold'
                : 'text-[#9FB2D0]/60'
            }`}
          >
            {p.badge}
          </button>
        ))}
      </div>

      {/* PAPER THERMAL RECEIPT PHYSICALLY UNROLLING FROM TOP PRINTER SLOT */}
      <div className="relative z-20 w-52 sm:w-56 h-28 flex items-end justify-center overflow-hidden -mb-3">
        <div
          className={`w-full bg-[#F8FAFC] text-[#06122B] rounded-t-lg px-3.5 pt-2.5 pb-3 font-mono text-[9px] shadow-2xl border-x border-t border-slate-300 transition-all duration-700 ease-out ${
            phase.receiptOut
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-28 opacity-0 scale-95'
          }`}
        >
          <div className="flex items-center justify-between font-extrabold text-[10px] border-b border-dashed border-slate-300 pb-1">
            <span>GWABS POS RECEIPT</span>
            <span className="px-1.5 py-0.2 bg-emerald-600 text-white rounded text-[8px]">
              PAID
            </span>
          </div>
          <div className="mt-1 space-y-0.5 text-[8.5px] text-slate-600">
            <div className="flex justify-between">
              <span>TERMINAL: {vendor}</span>
              <span>STAN: 492810</span>
            </div>
            <div className="flex justify-between">
              <span>CARD: 5399 •••• 8842</span>
              <span>AUTH: DUKPT</span>
            </div>
            <div className="flex justify-between">
              <span>SWITCH: {failover ? 'CORALPAY (FO)' : 'NIBSS EPMS'}</span>
              <span>CODE: 00</span>
            </div>
            <div className="flex justify-between font-extrabold text-[10px] text-[#06122B] pt-1 border-t border-dashed border-slate-300">
              <span>CHARGED:</span>
              <span className="text-emerald-700">{phase.amount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D ANDROID SMART POS TERMINAL BODY */}
      <div
        className={`relative z-20 w-64 sm:w-72 rounded-[2rem] bg-gradient-to-b from-[#1A3566] via-[#0B1A38] to-[#040B1A] p-3.5 border-2 transition-all duration-500 shadow-[0_25px_70px_-12px_rgba(0,194,168,0.4)] ${
          phase.charged ? 'border-emerald-400 shadow-[0_0_45px_rgba(16,185,129,0.45)]' : 'border-teal/55'
        }`}
      >
        {/* Top Thermal Printer Roller Slot */}
        <div className="mx-auto w-48 h-2.5 rounded-full bg-[#02060F] border border-white/15 shadow-inner mb-2 flex items-center justify-center">
          <div className="w-36 h-0.5 bg-teal/40 rounded-full" />
        </div>

        {/* NFC Contactless Reader Header */}
        <div className="flex items-center justify-between px-3 py-1 mb-2 rounded-xl bg-[#040A18]/90 border border-white/10 text-[9px] font-mono">
          <span className="text-teal font-bold">{vendor}</span>
          <span className="text-[#9FB2D0] flex items-center gap-1">
            <span>EMV / NFC</span>
            <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
          </span>
        </div>

        {/* POS Illuminated LCD Touchscreen */}
        <div
          className={`rounded-2xl p-3.5 border transition-all duration-500 relative overflow-hidden ${
            phase.charged
              ? 'bg-gradient-to-b from-[#062E28] to-[#031815] border-emerald-400/70'
              : 'bg-gradient-to-b from-[#071938] to-[#030B1A] border-teal/45'
          }`}
        >
          <div className="flex items-center justify-between text-[8.5px] font-mono text-[#9FB2D0] pb-1.5 border-b border-white/10">
            <span>STEP {phase.step} · LIVE POS</span>
            <span className="text-teal">4G ●●● CBN GPS OK</span>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-extrabold font-outfit text-white">
              {phase.amount}
            </span>
            <span
              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                phase.charged
                  ? 'bg-emerald-500 text-[#02201A]'
                  : 'bg-teal/20 text-teal border border-teal/40'
              }`}
            >
              {phase.badge}
            </span>
          </div>

          <div
            className={`mt-1.5 text-[11px] font-bold font-mono ${
              phase.charged ? 'text-emerald-300' : 'text-teal'
            }`}
          >
            {phase.screenTitle}
          </div>
          <div className="text-[9px] font-mono text-[#9FB2D0] truncate">
            {phase.screenSub}
          </div>

          {/* Animated Customer PIN Dots Box */}
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-[9px] font-mono text-[#9FB2D0]">CUSTOMER PIN:</span>
            <div className="flex items-center gap-1.5 bg-[#020712] px-2.5 py-1 rounded-lg border border-white/10">
              {[0, 1, 2, 3].map((dotIdx) => {
                const filled = dotIdx < (phaseIdx === 1 ? pinStep : phase.pinCount)
                return (
                  <span
                    key={dotIdx}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      filled
                        ? 'bg-teal scale-110 shadow-[0_0_8px_#00C2A8]'
                        : 'bg-white/15 scale-90'
                    }`}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* Physical Illuminated PIN Keypad (lights up keys sequentially during authorization) */}
        {!compact && (
          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => {
              const isPressed = activeDigit === digit
              return (
                <div
                  key={digit}
                  className={`py-1 rounded-lg text-center font-mono text-xs font-bold border transition-all duration-150 ${
                    isPressed
                      ? 'bg-teal text-teal-ink border-white scale-95 shadow-[0_0_15px_#00C2A8]'
                      : 'bg-[#08152F] border-white/10 text-[#9FB2D0]'
                  }`}
                >
                  {digit}
                </div>
              )
            })}
            <div className="py-1 rounded-lg bg-red-500/20 border border-red-400/30 text-center font-mono text-[9px] font-bold text-red-300">
              CLR
            </div>
            <div className="py-1 rounded-lg bg-[#08152F] border border-white/10 text-center font-mono text-xs font-bold text-[#9FB2D0]">
              0
            </div>
            <div
              className={`py-1 rounded-lg text-center font-mono text-[9px] font-extrabold transition-all ${
                activeDigit === 'OK' || phase.charged
                  ? 'bg-emerald-400 text-[#032018] shadow-[0_0_14px_#34D399]'
                  : 'bg-teal/80 text-teal-ink'
              }`}
            >
              OK
            </div>
          </div>
        )}

        {/* Bottom EMV Smart Card Insertion Slot with LED Guide */}
        <div className="mt-3 mx-auto w-52 h-3 rounded-full bg-[#02060E] border-2 border-teal/50 shadow-[0_0_15px_rgba(0,194,168,0.4)] flex items-center justify-center relative">
          <div
            className={`w-40 h-1 rounded-full transition-colors ${
              phase.cardInserted ? 'bg-teal animate-pulse' : 'bg-white/20'
            }`}
          />
        </div>
      </div>

      {/* CUSTOMER EMV CHIP CARD PHYSICALLY SLIDING UP & INSERTING INTO BOTTOM SLOT */}
      <div className="relative z-10 w-48 sm:w-52 h-24 flex items-start justify-center -mt-5 overflow-visible">
        <div
          className={`w-full rounded-2xl bg-gradient-to-br from-[#0256CD] via-[#0B2F70] to-[#00C2A8] p-3 text-white border-2 border-white/40 shadow-[0_18px_40px_rgba(2,86,205,0.55)] transition-all duration-700 ease-in-out ${
            phase.cardInserted
              ? '-translate-y-4 scale-100 rotate-0'
              : 'translate-y-8 scale-95 rotate-3 opacity-85'
          }`}
        >
          {/* Gold EMV Contact Chip entering the slot */}
          <div className="flex items-center justify-between">
            <div className="w-8 h-6 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-100 shadow-inner flex items-center justify-center">
              <div className="w-5 h-3.5 border border-amber-700/50 rounded-sm" />
            </div>
            <span className="text-[9px] font-mono font-bold tracking-widest text-teal-bright">
              {phase.cardInserted ? '▲ CHIP LOCKED IN SLOT' : '▲ INSERT CUSTOMER CARD'}
            </span>
          </div>
          <div className="mt-2 font-mono text-xs font-bold tracking-wider">
            5399 •••• •••• 8842
          </div>
          <div className="mt-1 flex justify-between text-[8.5px] font-mono text-white/80">
            <span>CUSTOMER EMV DEBIT</span>
            <span>EXP 08/29</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 2. 3D Orbital ISO 8583 Payment Switch & Multi-Processor Failover Object
 */
export function IsoSwitch3DMotion({ failover = false }) {
  const [packetStage, setPacketStage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPacketStage((prev) => (prev + 1) % 4)
    }, 1400)
    return () => clearInterval(timer)
  }, [])

  const rails = [
    { name: 'NIBSS EPMS', proto: 'ISO 8583 · 0200', status: failover ? 'TIMEOUT → REROUTE' : 'PRIMARY · 180ms', active: !failover },
    { name: 'CoralPay Switch', proto: 'ISO 8583 · TLS', status: failover ? 'FAILOVER ACTIVE · 165ms' : 'STANDBY HEALTHY', active: failover },
    { name: 'Interswitch Kimono', proto: 'ISO / REST', status: 'ACTIVE · 210ms', active: true },
    { name: 'Zone / UP Rail', proto: 'BIN Route #4', status: 'READY · 195ms', active: true },
  ]

  return (
    <div className="relative flex flex-col items-center justify-center py-4 select-none">
      {/* 3D Rotating Orbital Switching Rings */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-teal/40 animate-orbit-ring" />
        <div className="absolute inset-6 rounded-full border border-cyber-blue/50 animate-orbit-reverse" />
        <div className="absolute inset-12 rounded-full border border-teal/30" />

        {/* Orbiting Live ISO 8583 Transaction Packet */}
        <div className="absolute inset-0 animate-orbit-ring">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-teal text-teal-ink font-mono text-[9px] font-extrabold shadow-[0_0_16px_#00C2A8]">
            {packetStage < 2 ? '0200 REQ' : '0210 OK'}
          </span>
        </div>

        {/* Central 3D ISO 8583 Switch Engine Core */}
        <div className="relative z-10 w-36 h-36 rounded-3xl bg-gradient-to-br from-[#122D5E] via-[#081736] to-[#040B1A] border-2 border-teal shadow-[0_0_45px_rgba(0,194,168,0.45)] flex flex-col items-center justify-center p-3 text-center">
          <span className="text-2xl text-teal font-bold">⇄</span>
          <span className="text-xs font-extrabold font-outfit text-white mt-1">
            GWABS ISO 8583
          </span>
          <span className="text-[9px] font-mono text-teal mt-0.5">
            BIN ROUTER CORE
          </span>
          <span className="mt-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-[8.5px] font-bold">
            99.98% UPTIME
          </span>
        </div>
      </div>

      {/* 4 Orbiting Processor Rail Cards */}
      <div className="mt-3 grid grid-cols-2 gap-2 w-full max-w-xs">
        {rails.map((r) => (
          <div
            key={r.name}
            className={`rounded-xl p-2.5 border text-left transition-all ${
              r.active
                ? 'bg-[#091D42]/90 border-teal/50 shadow-[0_0_15px_rgba(0,194,168,0.2)]'
                : 'bg-amber-500/15 border-amber-400/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-white truncate">{r.name}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  r.active ? 'bg-teal animate-ping' : 'bg-amber-400'
                }`}
              />
            </div>
            <div className="text-[8.5px] font-mono text-[#9FB2D0]">{r.proto}</div>
            <div
              className={`text-[8.5px] font-mono font-bold mt-0.5 ${
                r.active ? 'text-teal' : 'text-amber-300'
              }`}
            >
              {r.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * 3. 3D Exploded Unified Hardware HAL SDK & Simultaneous 3-Vendor POS Execution
 */
export function HalSdk3DMotion() {
  const [pulseStep, setPulseStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseStep((prev) => (prev + 1) % 3)
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  const vendors = [
    { name: 'Topwise MP35', kernel: 'EMV L2 + Printer', status: 'CHARGED ₦250K' },
    { name: 'Urovo i5300', kernel: 'DUKPT PIN Pad', status: 'CHARGED ₦250K' },
    { name: 'Blumen S60', kernel: 'NFC Tap + ISO', status: 'CHARGED ₦250K' },
  ]

  return (
    <div className="relative flex flex-col items-center justify-center py-4 select-none w-full max-w-xs mx-auto">
      {/* Top Layer: Single Kotlin / Flutter Payment Call */}
      <div className="w-full rounded-2xl bg-[#071836] border border-teal/50 p-3 text-center shadow-lg">
        <span className="text-[9px] font-mono uppercase tracking-widest text-teal block">
          1. SINGLE HOST CALL (KOTLIN / FLUTTER)
        </span>
        <code className="text-xs font-mono font-bold text-white">
          GwabsPosSdk.chargeCard(250_000_00)
        </code>
      </div>

      {/* Animated Vertical Laser Bus */}
      <div className="h-6 w-0.5 bg-gradient-to-b from-teal to-cyber-blue relative">
        <span className="absolute -left-1 top-1/2 w-2.5 h-2.5 rounded-full bg-teal animate-ping" />
      </div>

      {/* Middle 3D Isometric HAL Silicon Core */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-[#0D2A5C] via-[#133875] to-[#0D2A5C] border-2 border-teal p-3.5 text-center shadow-[0_0_35px_rgba(0,194,168,0.4)] relative">
        <div className="flex items-center justify-between text-[9px] font-mono text-teal mb-1">
          <span>2. UNIFIED HAL CORE v1.4.2</span>
          <span>DUKPT · EMV · JPOS</span>
        </div>
        <div className="text-sm font-extrabold font-outfit text-white">
          Hardware Abstraction Layer
        </div>
        <div className="text-[9px] font-mono text-[#9FB2D0] mt-0.5">
          Normalizes Card Reader · PIN Pad · Key Slots · Thermal Printer
        </div>
      </div>

      {/* 3 Branching Laser Traces to 3 Physical POS Vendors */}
      <div className="grid grid-cols-3 gap-2 w-full mt-4">
        {vendors.map((v, idx) => {
          const highlighted = pulseStep === idx
          return (
            <div
              key={v.name}
              className={`rounded-xl p-2.5 border text-center transition-all duration-300 ${
                highlighted
                  ? 'bg-teal/20 border-teal scale-105 shadow-[0_0_20px_rgba(0,194,168,0.4)]'
                  : 'bg-[#06132C] border-white/15'
              }`}
            >
              {/* Mini Receipt popping out of each vendor device */}
              <div className="mx-auto w-12 h-3 rounded-t bg-white text-[#06122B] font-mono text-[7px] font-bold leading-3 mb-1">
                PAID ✓
              </div>
              <div className="text-[10px] font-bold text-white font-outfit truncate">
                {v.name}
              </div>
              <div className="text-[8px] font-mono text-[#9FB2D0] mt-0.5 truncate">
                {v.kernel}
              </div>
              <div className="mt-1 text-[8px] font-mono font-bold text-teal">
                {v.status}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * 4. 3D Fleet Geofence Radar & Multi-Tenant T+0 Virtual Account Settlement Vaults
 */
export function FleetAndSaas3DMotion() {
  return (
    <div className="relative flex flex-col items-center justify-center py-4 select-none w-full max-w-xs mx-auto">
      {/* 3D Rotating CBN Geofence & Fleet TMS Radar Dome */}
      <div className="relative w-56 h-56 rounded-full bg-[#040D21] border-2 border-teal/50 shadow-[0_0_45px_rgba(0,194,168,0.3)] overflow-hidden flex items-center justify-center">
        {/* Concentric Radar Distance Rings */}
        <div className="absolute inset-4 rounded-full border border-teal/25" />
        <div className="absolute inset-10 rounded-full border border-teal/25" />
        <div className="absolute inset-16 rounded-full border border-teal/30" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-teal/20" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-teal/20" />

        {/* Rotating Conical Radar Sweep Beam */}
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-radar-sweep"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(0, 194, 168, 0.38) 0deg, transparent 75deg, transparent 360deg)',
          }}
        />

        {/* Active Geolocked Terminal Blips */}
        <span className="absolute top-10 left-14 w-2.5 h-2.5 rounded-full bg-teal shadow-[0_0_10px_#00C2A8] animate-ping" />
        <span className="absolute bottom-12 right-12 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34D399]" />
        <span className="absolute top-16 right-10 w-2 h-2 rounded-full bg-cyber-blue shadow-[0_0_10px_#0256CD]" />

        {/* Central T+0 Vault Badge */}
        <div className="relative z-10 px-3 py-2 rounded-2xl bg-[#071836]/95 border border-teal text-center shadow-lg">
          <span className="text-[9px] font-mono text-teal block font-bold">
            CBN 50m GEOFENCE OK
          </span>
          <span className="text-xs font-extrabold font-outfit text-white">
            T+0 DVA SETTLED
          </span>
          <span className="text-[8.5px] font-mono text-emerald-300 block">
            WSS PUSH &lt; 12ms
          </span>
        </div>
      </div>

      {/* Multi-Tenant SaaS & Bank Platform Vaults */}
      <div className="mt-3 grid grid-cols-2 gap-2 w-full">
        {[
          { title: 'Gwabs Business Suite', tag: 'gbs.ng · Multi-Tenant POS' },
          { title: 'Reconcile LMS', tag: 'reconcile.ng · Lending' },
          { title: 'Okada FleetOS', tag: 'okadaos.ng · GPS & Fuel-Cut' },
          { title: 'BlumenTMS & MFBs', tag: 'Otech · Regent · OTA Fleet' },
        ].map((p) => (
          <div
            key={p.title}
            className="rounded-xl bg-[#081838]/90 border border-teal/35 p-2 text-left"
          >
            <div className="text-[10px] font-bold text-white truncate">{p.title}</div>
            <div className="text-[8.5px] font-mono text-teal truncate">{p.tag}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
