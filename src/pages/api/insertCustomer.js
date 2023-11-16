// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
    console.log(req.query);
  const result  = await executeQuery ({
    query:`INSERT INTO customer(username, pwd, ssn, f_name, l_name, street, city, country)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?);`,
    values: [req.body.username, req.body.password, req.body.ssn, req.body.firstName, req.body.lastName, req.body.street, req.body.city, req.body.country]
  });
  res.status(200).json(result)
}
 