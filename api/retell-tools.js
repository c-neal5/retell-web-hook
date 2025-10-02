export default async function handler(req, res) {
  // ✅ Check if webhook itself is live
  if (req.method !== "POST") {
    return res.status(200).json({ ok: true, msg: "Webhook is live ✅" });
  }

  // ✅ Parse body & get tool name
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  const urlTool = req.query?.tool_name || undefined;
  const tool = body.tool_name || body.tool || urlTool;

  // ✅ 1. Calendar Search – return available appointment slots
  if (tool === "calendar_search") {
    return res.json({
      ok: true,
      data: {
        slots: [
          { start: "2025-10-03T14:00:00Z", end: "2025-10-03T15:00:00Z" },
          { start: "2025-10-03T16:00:00Z", end: "2025-10-03T17:00:00Z" }
        ]
      }
    });
  }

  // ✅ 2. Finalize Booking – confirm and save appointment
  if (tool === "finalize_booking") {
    const { customer_name, phone_number, service_type, preferred_date, preferred_time } = body;

    // Basic validation (optional but good practice)
    if (!customer_name || !phone_number || !service_type) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields: customer_name, phone_number, and service_type are required."
      });
    }

    // Simulate booking (in real-world, you'd save to a database or send to Google Calendar)
    return res.json({
      ok: true,
      data: {
        confirmation: `Appointment booked successfully for ${customer_name} on ${preferred_date || "TBD"} at ${preferred_time || "TBD"} for a ${service_type}. 📅`
      }
    });
  }

  // ❌ If tool not recognized
  return res.status(400).json({
    ok: false,
    error: "Unknown tool name. Use 'calendar_search' or 'finalize_booking'."
  });
}

