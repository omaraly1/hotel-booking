// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
    console.log(req.query);
  const result  = await executeQuery ({
    query:`UPDATE customer SET username = ?, ssn = ?,  f_name = ?,  l_name = ?, street = ?, city = ?, country = ? WHERE customer_id = ?;`,
    values: [req.body.username, parseInt(req.body.ssn), req.body.firstName, req.body.lastName, req.body.street, req.body.city, req.body.country, req.body.customer_id]
  });
  res.status(200).json(result)
}
 