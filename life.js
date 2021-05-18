/* //Object sample
user: {
  id: "asvd3ed57hj",
  name: "John Doe",
  dob: "1989-04-13",
}
response1: {
        id: "asvd3ed57hj",
        name: "John Doe",
        weeksLived: "1674.6",
        expectedWeeksLeft: "2604",
      }
response2: {
        expectedLifespanInWeeks: "4278.6",
        //dod: "2071-04-13"
      }
*/

//calculates how many weeks are between 2 dates
const weeksBetween = (d1, d2) => {
  return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

//returns an array with all parameters we need to use to calculate weeks between
const getActualDates = (user) => {
  const [year, month, day] = user.dob.split('-');
  const dYear = parseInt(year) + 82;

  return [year, month, day, dYear]
}

// returns result for life in weeks endpoint
const lifeInWeeks = (user) => {
  const [year, month, day, dYear] = getActualDates(user);

  const livedWeeks = weeksBetween(new Date(year, month - 1, day), new Date());

  const weeksToLive = weeksBetween(new Date(), new Date(dYear, month - 1, day));

  return {
    id: user.id,
    name: user.name,
    livedWeeks,
    weeksToLive
  }
};

//returns result for lifespan in weeks endpoint
const lifeSpanInWeeks = (user) => {
  const [year, month, day, dYear] = getActualDates(user);
  const expectedLifetimeInWeeks = weeksBetween(new Date(year, month - 1, day), new Date(dYear, month - 1, day));

  return {
    expectedLifetimeInWeeks
  }
};

module.exports = {
  lifeInWeeks,
  lifeSpanInWeeks,
};