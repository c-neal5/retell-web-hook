{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\margl1440\margr1440\vieww33400\viewh19380\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 export default async function handler(req, res) \{\
  if (req.method !== "POST") \{\
    return res.status(200).json(\{ ok: true, msg: "Webhook is live" \});\
  \}\
\
  const \{ tool_name \} = req.body;\
\
  if (tool_name === "calendar_search") \{\
    return res.json(\{\
      ok: true,\
      data: \{\
        slots: [\
          \{ start: "2025-10-03T14:00:00Z", end: "2025-10-03T15:00:00Z" \},\
          \{ start: "2025-10-03T16:00:00Z", end: "2025-10-03T17:00:00Z" \}\
        ]\
      \}\
    \});\
  \}\
\
  if (tool_name === "finalize_booking") \{\
    return res.json(\{ ok: true, data: \{ confirmation: "Booked successfully!" \} \});\
  \}\
\
  return res.status(400).json(\{ ok: false, error: "Unknown tool" \});\
\}\
}