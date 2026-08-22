export const mockData = [
  {
    id: "P-1001",
    Mfg_Part_Num: "6204-2RS",
    Part_Desc: "Deep Groove Ball Bearing, 20x47x14mm, Rubber Seal",
    Part_Manuf: "SKF",
    E1_Brand: "SKF",
    status: "export_ready",
    errors: [],
    ai_confidence: 98,
    enriched_data: {
      short_desc: "SKF 6204-2RS Deep Groove Ball Bearing 20mm",
      invoice_desc: "BRG BALL 20X47X14 SEALED",
      long_desc: "Deep groove ball bearing with rubber seals on both sides, pre-lubricated for life. Dimensions: 20mm bore x 47mm OD x 14mm width.",
      classpath: "Mechanical Components / Bearings / Ball Bearings",
      attributes: [
        { label: "Bore Size", value: "20", uom: "mm" },
        { label: "Outside Diameter", value: "47", uom: "mm" },
        { label: "Width", value: "14", uom: "mm" },
      ]
    }
  },
  {
    id: "P-1002",
    Mfg_Part_Num: "V-405",
    Part_Desc: "Valve brass 1/2 in NPT",
    Part_Manuf: "-- No Mfr --",
    E1_Brand: "Unbranded",
    status: "needs_fixing",
    errors: ["Missing Manufacturer", "Contains placeholder 'Unbranded'"],
    ai_confidence: 0,
    enriched_data: null
  },
  {
    id: "P-1003",
    Mfg_Part_Num: "M-3P-400",
    Part_Desc: "Motor 3 phase 400V 5HP",
    Part_Manuf: "Siemens",
    E1_Brand: "Siemens",
    status: "fixed_by_ai",
    errors: [],
    ai_confidence: 94,
    enriched_data: {
      short_desc: "Siemens 5HP 3-Phase AC Motor 400V",
      invoice_desc: "MTR AC 3PH 5HP 400V",
      long_desc: "Three-phase AC induction motor. Power rating: 5 HP. Operating voltage: 400V.",
      classpath: "Electrical / Motors / AC Motors",
      attributes: [
        { label: "Power", value: "5", uom: "HP" },
        { label: "Voltage", value: "400", uom: "V" },
        { label: "Phase", value: "3", uom: "" },
      ]
    }
  },
  {
    id: "P-1004",
    Mfg_Part_Num: "HX-50",
    Part_Desc: "Hex bolt",
    Part_Manuf: "Fastenal",
    E1_Brand: "Fastenal",
    status: "needs_fixing",
    errors: ["Description too short", "Missing dimensions"],
    ai_confidence: 0,
    enriched_data: null
  },
  {
    id: "P-1005",
    Mfg_Part_Num: "C-RJ45-S",
    Part_Desc: "Shielded RJ45 Connector Cat6",
    Part_Manuf: "Amphenol",
    E1_Brand: "Amphenol",
    status: "export_ready",
    errors: [],
    ai_confidence: 99,
    enriched_data: {
      short_desc: "Amphenol RJ45 Shielded Connector Cat6",
      invoice_desc: "CONN RJ45 CAT6 SHIELDED",
      long_desc: "Premium shielded RJ45 connector for Cat6 ethernet cables, ensuring high-speed data transfer and reduced interference.",
      classpath: "Electrical / Networking / Connectors",
      attributes: [
        { label: "Type", value: "RJ45", uom: "" },
        { label: "Category", value: "Cat6", uom: "" },
        { label: "Shielded", value: "Yes", uom: "" },
      ]
    }
  },
  {
    id: "P-1006",
    Mfg_Part_Num: "RLY-12V-30A",
    Part_Desc: "12V relay 30 amp automotive",
    Part_Manuf: "Bosch",
    E1_Brand: "Bosch",
    status: "fixed_by_ai",
    errors: [],
    ai_confidence: 92,
    enriched_data: {
      short_desc: "Bosch 12V 30A Automotive Relay",
      invoice_desc: "RELAY AUTO 12V 30A",
      long_desc: "Heavy-duty automotive relay, 12V DC coil, 30A switching capacity. Ideal for lighting and motor circuits.",
      classpath: "Electrical / Relays / Automotive Relays",
      attributes: [
        { label: "Coil Voltage", value: "12", uom: "VDC" },
        { label: "Current Rating", value: "30", uom: "A" },
      ]
    }
  },
  {
    id: "P-1007",
    Mfg_Part_Num: "WSH-FL-1/4",
    Part_Desc: "Flat washer 1/4\" SS",
    Part_Manuf: "McMaster-Carr",
    E1_Brand: "McMaster",
    status: "export_ready",
    errors: [],
    ai_confidence: 97,
    enriched_data: {
      short_desc: "McMaster Flat Washer 1/4\" Stainless Steel",
      invoice_desc: "WASHER FLAT 1/4 SS",
      long_desc: "Stainless steel flat washer for 1/4 inch screw size. Provides corrosion resistance and distributes load.",
      classpath: "Hardware / Fasteners / Washers",
      attributes: [
        { label: "Size", value: "1/4", uom: "inch" },
        { label: "Material", value: "Stainless Steel", uom: "" },
      ]
    }
  },
  {
    id: "P-1008",
    Mfg_Part_Num: "SEN-TEMP-K",
    Part_Desc: "Temp sensor K type",
    Part_Manuf: "Omega",
    E1_Brand: "Omega",
    status: "needs_fixing",
    errors: ["Ambiguous Description", "No HSN Code"],
    ai_confidence: 45,
    enriched_data: null
  },
  {
    id: "P-1009",
    Mfg_Part_Num: "PUMP-C-100",
    Part_Desc: "Centrifugal pump 100 GPM",
    Part_Manuf: "Goulds",
    E1_Brand: "Goulds Pumps",
    status: "fixed_by_ai",
    errors: [],
    ai_confidence: 88,
    enriched_data: {
      short_desc: "Goulds Centrifugal Pump 100 GPM",
      invoice_desc: "PUMP CENT 100 GPM",
      long_desc: "High-efficiency centrifugal water pump with a maximum flow rate of 100 Gallons Per Minute.",
      classpath: "Fluid Handling / Pumps / Centrifugal Pumps",
      attributes: [
        { label: "Flow Rate", value: "100", uom: "GPM" },
        { label: "Pump Type", value: "Centrifugal", uom: "" },
      ]
    }
  },
  {
    id: "P-1010",
    Mfg_Part_Num: "CBL-USB-C-6FT",
    Part_Desc: "USB C cable 6ft black",
    Part_Manuf: "Belkin",
    E1_Brand: "Belkin",
    status: "export_ready",
    errors: [],
    ai_confidence: 99,
    enriched_data: {
      short_desc: "Belkin USB-C to USB-C Cable 6ft Black",
      invoice_desc: "CABLE USB-C 6FT BLK",
      long_desc: "Durable 6-foot USB Type-C to Type-C charging and data sync cable. Black color.",
      classpath: "Electrical / Cables / USB Cables",
      attributes: [
        { label: "Length", value: "6", uom: "ft" },
        { label: "Connector Type", value: "USB-C", uom: "" },
        { label: "Color", value: "Black", uom: "" },
      ]
    }
  },
  {
    id: "P-1011",
    Mfg_Part_Num: "SW-LIM-01",
    Part_Desc: "Limit switch",
    Part_Manuf: "Honeywell",
    E1_Brand: "Honeywell",
    status: "needs_fixing",
    errors: ["Description too short", "Missing Operating Force"],
    ai_confidence: 0,
    enriched_data: null
  },
  {
    id: "P-1012",
    Mfg_Part_Num: "GKT-S-2",
    Part_Desc: "Silicone Gasket 2 inch",
    Part_Manuf: "Garlock",
    E1_Brand: "Garlock",
    status: "fixed_by_ai",
    errors: [],
    ai_confidence: 95,
    enriched_data: {
      short_desc: "Garlock 2\" Silicone Flange Gasket",
      invoice_desc: "GASKET SILICONE 2 IN",
      long_desc: "High-temperature silicone rubber flange gasket for 2-inch pipe fittings. Excellent chemical resistance.",
      classpath: "Mechanical Components / Seals / Gaskets",
      attributes: [
        { label: "Size", value: "2", uom: "inch" },
        { label: "Material", value: "Silicone", uom: "" },
      ]
    }
  },
  {
    id: "P-1013",
    Mfg_Part_Num: "V-BELT-A42",
    Part_Desc: "V-Belt A Section 42 inch",
    Part_Manuf: "Gates",
    E1_Brand: "Gates",
    status: "export_ready",
    errors: [],
    ai_confidence: 98,
    enriched_data: {
      short_desc: "Gates A42 Classical V-Belt 44\" Outside Length",
      invoice_desc: "BELT V A SEC 42IN",
      long_desc: "Classical profile V-belt, A section. 42-inch pitch length, wrapped construction for drives.",
      classpath: "Power Transmission / Belts / V-Belts",
      attributes: [
        { label: "Profile", value: "A Section", uom: "" },
        { label: "Length", value: "42", uom: "inch" },
      ]
    }
  },
  {
    id: "P-1014",
    Mfg_Part_Num: "FLT-AIR-10",
    Part_Desc: "Air filter panel",
    Part_Manuf: "Donaldson",
    E1_Brand: "Donaldson",
    status: "needs_fixing",
    errors: ["Missing dimensions", "No MERV rating"],
    ai_confidence: 30,
    enriched_data: null
  },
  {
    id: "P-1015",
    Mfg_Part_Num: "CB-20A-1P",
    Part_Desc: "Circuit Breaker 20A 1 Pole 120V",
    Part_Manuf: "Square D",
    E1_Brand: "Square D",
    status: "export_ready",
    errors: [],
    ai_confidence: 100,
    enriched_data: {
      short_desc: "Square D 20A 1-Pole Circuit Breaker 120V",
      invoice_desc: "BRKR 20A 1P 120V",
      long_desc: "Miniature circuit breaker, 20 amp, 1 pole, 120/240 VAC. QO series plug-on mount.",
      classpath: "Electrical / Circuit Breakers / Miniature",
      attributes: [
        { label: "Amperage", value: "20", uom: "A" },
        { label: "Poles", value: "1", uom: "" },
        { label: "Voltage", value: "120", uom: "VAC" },
      ]
    }
  },
  {
    id: "P-1016",
    Mfg_Part_Num: "CYL-P-50X100",
    Part_Desc: "Pneumatic cylinder 50mm bore 100mm stroke",
    Part_Manuf: "Festo",
    E1_Brand: "Festo",
    status: "fixed_by_ai",
    errors: [],
    ai_confidence: 96,
    enriched_data: {
      short_desc: "Festo Pneumatic Cylinder 50mm Bore 100mm Stroke",
      invoice_desc: "CYL PNEU 50X100MM",
      long_desc: "Double-acting pneumatic cylinder, ISO 15552 standard. 50mm bore, 100mm stroke.",
      classpath: "Fluid Power / Pneumatics / Cylinders",
      attributes: [
        { label: "Bore", value: "50", uom: "mm" },
        { label: "Stroke", value: "100", uom: "mm" },
        { label: "Action", value: "Double", uom: "" },
      ]
    }
  },
  {
    id: "P-1017",
    Mfg_Part_Num: "LUB-GRS-LITH",
    Part_Desc: "Lithium grease tube",
    Part_Manuf: "Mobil",
    E1_Brand: "Mobil",
    status: "needs_fixing",
    errors: ["Missing Volume/Weight"],
    ai_confidence: 60,
    enriched_data: null
  },
  {
    id: "P-1018",
    Mfg_Part_Num: "CON-MAG-9A",
    Part_Desc: "Magnetic Contactor 9A 24VDC Coil",
    Part_Manuf: "Schneider Electric",
    E1_Brand: "Schneider",
    status: "export_ready",
    errors: [],
    ai_confidence: 99,
    enriched_data: {
      short_desc: "Schneider 9A Magnetic Contactor 24VDC Coil",
      invoice_desc: "CONT MAG 9A 24VDC",
      long_desc: "TeSys D magnetic contactor, 3 poles, 9A AC-3 rating, 24V DC coil.",
      classpath: "Electrical / Contactors / Motor Control",
      attributes: [
        { label: "Current Rating", value: "9", uom: "A" },
        { label: "Coil Voltage", value: "24", uom: "VDC" },
      ]
    }
  },
  {
    id: "P-1019",
    Mfg_Part_Num: "HOS-AIR-3/8",
    Part_Desc: "Air hose 3/8 in 50 ft rubber",
    Part_Manuf: "Goodyear",
    E1_Brand: "Goodyear",
    status: "fixed_by_ai",
    errors: [],
    ai_confidence: 91,
    enriched_data: {
      short_desc: "Goodyear 3/8\" x 50ft Rubber Air Hose",
      invoice_desc: "HOSE AIR 3/8X50FT RBR",
      long_desc: "Heavy-duty rubber air hose for compressors and pneumatic tools. 3/8 inch inner diameter, 50 feet long, 300 PSI max pressure.",
      classpath: "Fluid Power / Pneumatics / Hoses",
      attributes: [
        { label: "Diameter", value: "3/8", uom: "inch" },
        { label: "Length", value: "50", uom: "ft" },
        { label: "Material", value: "Rubber", uom: "" },
      ]
    }
  },
  {
    id: "P-1020",
    Mfg_Part_Num: "LED-IND-R-24V",
    Part_Desc: "LED Indicator Red 24V",
    Part_Manuf: "Eaton",
    E1_Brand: "Eaton",
    status: "export_ready",
    errors: [],
    ai_confidence: 98,
    enriched_data: {
      short_desc: "Eaton 22mm Red LED Indicator Light 24V AC/DC",
      invoice_desc: "IND LED RED 24V",
      long_desc: "Panel mount LED indicator light, red lens, 22.5mm hole size, 24V AC/DC operation.",
      classpath: "Electrical / Automation / Pilot Lights",
      attributes: [
        { label: "Color", value: "Red", uom: "" },
        { label: "Voltage", value: "24", uom: "V" },
        { label: "Mount Size", value: "22.5", uom: "mm" },
      ]
    }
  },
  {
    id: "P-1021",
    Mfg_Part_Num: "BRG-FLG-1",
    Part_Desc: "Flange bearing 1 in",
    Part_Manuf: "Timken",
    E1_Brand: "Timken",
    status: "needs_fixing",
    errors: ["Missing Bolt Hole Count", "Ambiguous Housing Material"],
    ai_confidence: 70,
    enriched_data: null
  },
  {
    id: "P-1022",
    Mfg_Part_Num: "FTG-TEE-1/2-SS",
    Part_Desc: "Tee fitting 1/2 NPT SS",
    Part_Manuf: "Swagelok",
    E1_Brand: "Swagelok",
    status: "fixed_by_ai",
    errors: [],
    ai_confidence: 94,
    enriched_data: {
      short_desc: "Swagelok 1/2\" Female NPT Tee Fitting 316SS",
      invoice_desc: "FTG TEE 1/2 NPT SS",
      long_desc: "Stainless steel 316 pipe tee fitting, 1/2 in. female NPT connections on all ends. High pressure rated.",
      classpath: "Piping / Fittings / Tees",
      attributes: [
        { label: "Size", value: "1/2", uom: "inch" },
        { label: "Thread", value: "NPT", uom: "" },
        { label: "Material", value: "316 SS", uom: "" },
      ]
    }
  },
  {
    id: "P-1023",
    Mfg_Part_Num: "BATT-SLA-12V7AH",
    Part_Desc: "Sealed Lead Acid Battery 12V 7Ah",
    Part_Manuf: "Yuasa",
    E1_Brand: "Yuasa",
    status: "export_ready",
    errors: [],
    ai_confidence: 99,
    enriched_data: {
      short_desc: "Yuasa 12V 7Ah Sealed Lead Acid Battery",
      invoice_desc: "BATT SLA 12V 7AH",
      long_desc: "Rechargeable sealed lead-acid (SLA) battery, 12 volts, 7 amp-hours. Ideal for UPS and alarm systems.",
      classpath: "Electrical / Power / Batteries",
      attributes: [
        { label: "Voltage", value: "12", uom: "V" },
        { label: "Capacity", value: "7", uom: "Ah" },
        { label: "Chemistry", value: "SLA", uom: "" },
      ]
    }
  },
  {
    id: "P-1024",
    Mfg_Part_Num: "TAPE-DUCT-2X50",
    Part_Desc: "Duct tape silver",
    Part_Manuf: "3M",
    E1_Brand: "3M",
    status: "needs_fixing",
    errors: ["Missing Width", "Missing Length"],
    ai_confidence: 50,
    enriched_data: null
  },
  {
    id: "P-1025",
    Mfg_Part_Num: "VFD-1HP-230V",
    Part_Desc: "Variable Frequency Drive 1HP 230V 1PH Input",
    Part_Manuf: "Yaskawa",
    E1_Brand: "Yaskawa",
    status: "export_ready",
    errors: [],
    ai_confidence: 97,
    enriched_data: {
      short_desc: "Yaskawa V1000 1HP VFD 230V 1-Phase Input",
      invoice_desc: "VFD 1HP 230V 1PH IN",
      long_desc: "Compact variable frequency drive. 1 HP (0.75 kW) rating. 200-240V single-phase input, 3-phase output.",
      classpath: "Electrical / Motor Control / VFDs",
      attributes: [
        { label: "Power", value: "1", uom: "HP" },
        { label: "Input Voltage", value: "230", uom: "VAC" },
        { label: "Input Phase", value: "1", uom: "" },
      ]
    }
  }
];

export const summaryStats = {
  totalItems: 25,
  fixedByAi: 8,
  needsFixing: 8,
  exportReady: 9
};

export const errorCategories = [
  { name: "Missing Manufacturer", count: 12 },
  { name: "Description too short", count: 8 },
  { name: "Missing dimensions", count: 15 },
  { name: "No HSN Code", count: 5 },
  { name: "Ambiguous Description", count: 7 }
];

export const completionHistory = [
  { date: "Aug 15", total: 100, completed: 40 },
  { date: "Aug 16", total: 100, completed: 55 },
  { date: "Aug 17", total: 100, completed: 68 },
  { date: "Aug 18", total: 100, completed: 75 },
  { date: "Aug 19", total: 100, completed: 89 },
  { date: "Aug 20", total: 100, completed: 92 },
  { date: "Aug 21", total: 100, completed: 100 }
];

export const topManufacturers = [
  { name: "SKF", value: 45 },
  { name: "Siemens", value: 30 },
  { name: "Festo", value: 20 },
  { name: "Schneider", value: 15 },
  { name: "Other", value: 40 }
];
