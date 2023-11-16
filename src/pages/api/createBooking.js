// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {
    console.log(req.query);
  const result  = await executeQuery ({
    query:`INSERT INTO booking (room_id, check_in_date, check_out_date, amount_paid)
    VALUES (?, ?, ?, ?);`,
    values: [req.body.room_id, req.body.check_in_date, req.body.check_out_date, req.body.price]
  });
  const otherResult  = await executeQuery ({
    query:`INSERT INTO renting (booking_id, check_in_date, check_out_date)
    SELECT booking_id, ?, ?
    FROM booking
    WHERE room_id = ?
    ORDER BY booking_id DESC
    LIMIT 1;`,
    values:[req.body.check_in_date, req.body.check_out_date, req.body.room_id]
  });
  const thirdResult  = await executeQuery ({
    query:`insert into books values(?,?)`,
    values:[req.body.customer_id, req.body.room_id]
  });
  res.status(200).json({result, otherResult, thirdResult});
}
 

