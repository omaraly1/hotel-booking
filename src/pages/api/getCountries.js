// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
  const result  = await executeQuery ({
    query:'select distinct country from hotel',
  });
  res.status(200).json(result)
}
 