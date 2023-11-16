// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
  // if (req.query.stars != 0){
  //   const result  = await executeQuery ({
  //     query:'select distinct chain_name from hotel where star_category = ?',
  //     values: [req.query.stars]
  //   });
  // }
  // else {
    const result  = await executeQuery ({
      query:'select distinct chain_name from hotel',
    });
  // }
  
  res.status(200).json(result)
}
 