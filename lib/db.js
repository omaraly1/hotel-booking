import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    host: 'localhost',
    port: '[YOUR MYSQL PORT]',
    database: 'hotel',
    user: '[YOUR MYSQL USERNAME]',
    password: '[YOUR MYSQL PASSWORD]'
  }
});
export default async function executeQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    // console.log(results);
    await db.end();
    return results;
  } catch (error) {
    console.log(error);
    return { error };
  }
}