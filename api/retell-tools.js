export default async function handler(req, res) {
  // ✅ Check if the webhook itself is live
  if (req.method !== "POST") {
    return res.status(200).json({ ok: true, msg: "Webhook is live" });
  }

  // ✅ Parse the request body
  const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
  const tool = body.tool_name || body.tool || body.name;

  // ✅ If the AI agent is asking for available appointment slots
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

  // ✅ If the AI agent is finalizing a booking
  if (tool === "finalize_booking") {
    return res.json({
      ok: true,
      data: {
        confirmation: "Appointment booked successfully!"
      }
    });
  }

  // ❌ If no tool matched
  return res.status(400).json({ ok: false, error: "Unknown tool" });
}
