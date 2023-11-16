// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
  const result  = await executeQuery ({
    query:`SELECT capacity 
    FROM hotel_room_capacity 
    WHERE hotel_id = ?`,
    values: [req.query.hotel_id]
  });
  res.status(200).json(result)
}
 