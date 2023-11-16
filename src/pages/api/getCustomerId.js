// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
  const result  = await executeQuery ({
    query:`select customer_id from customer where username = ?`,
    values: [req.query.username]
  });
  res.status(200).json(result);
}
 

