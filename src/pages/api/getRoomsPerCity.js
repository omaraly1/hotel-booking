// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
  const result  = await executeQuery ({
    query:`select num_rooms from rooms_area where city = ?`,
    values: [req.query.city]
  });
  res.status(200).json(result)
}
 