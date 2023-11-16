// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import executeQuery from "../../../lib/db";

export default async function handler(req, res) {

    let criteria = '';
    let vals = [req.query.price, req.query.city, req.query.country, req.query.startDate, req.query.endDate, req.query.minNumRooms];

    if (req.query.size) {
        criteria += "AND room.capacity = ? ";
        vals.splice(vals.length,0,req.query.size.toLowerCase());
    }
    if (req.query.chain) {
        criteria += "AND hotel_chain.chain_name = ? ";
        vals.splice(vals.length,0,req.query.chain);
    }
    if (req.query.stars > 0) {
        criteria += "AND hotel.star_category = ? ";
        vals.splice(vals.length,0,req.query.stars);
    }
    console.log("criteria",criteria);
  const result  = await executeQuery ({
    query:`SELECT room.capacity, room.view_type, hotel_chain.chain_name, hotel.hotel_id, hotel.city, hotel.country, room.room_id, room.price
    FROM room
    INNER JOIN hotel_room ON room.room_id = hotel_room.room_id
    INNER JOIN hotel ON hotel.hotel_id = hotel_room.hotel_id
    INNER JOIN hotel_chain ON hotel_chain.chain_name = hotel.chain_name
    WHERE room.price <= ?
    AND hotel.city = ?
    AND hotel.country = ?
    AND NOT EXISTS (
        SELECT *
        FROM renting
        INNER JOIN booking ON renting.booking_id = booking.booking_id
        WHERE renting.check_in_date <= ?
        AND renting.check_out_date >= ?
        AND booking.room_id = room.room_id
    )
    AND (
        SELECT COUNT(*)
        FROM hotel_room
        WHERE hotel_room.hotel_id = hotel.hotel_id
    ) >= ?
    ${criteria}`,
    values: vals
  });
  res.status(200).json(result)
}

// query:`SELECT room.capacity, room.view_type, hotel_chain.chain_name, hotel.hotel_id, hotel.city, hotel.country, room.room_id, room.price
// FROM room
// INNER JOIN hotel_room ON room.room_id = hotel_room.room_id
// INNER JOIN hotel ON hotel.hotel_id = hotel_room.hotel_id
// INNER JOIN hotel_chain ON hotel_chain.chain_name = hotel.chain_name
// WHERE room.price <= ?
// ${criteria}
// AND hotel.city = ?
// AND hotel.country = ?
// AND NOT EXISTS (
//     SELECT *
//     FROM renting
//     INNER JOIN booking ON renting.booking_id = booking.booking_id
//     WHERE renting.check_in_date <= ?
//     AND renting.check_out_date >= ?
//     AND booking.room_id = room.room_id
// )`,
 