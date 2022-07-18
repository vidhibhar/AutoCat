const express = require("express");

const { Client } = require("pg");

const app = express();
const port = 8000;

let pg = null;

async function initPostgres() {
  pg = new Client({
    user: "postgres",
    host: "localhost",
    database: "autocat",
    port: 5432, // postgres default
  });
  await pg.connect();
  const res = await pg.query("SELECT NOW()");
  console.log("query test", res.rows);
}

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);

app.get("/", (req, res) => {
  res.json({ test: "hello" });
});

const searchDefaults = {
  priceMin: 1000,
  priceMax: 100000,
};

app.get("/options/makes", async (req, res) => {
  try {
    let query = `SELECT DISTINCT make from car`;
    console.log("Executing final DB query: ", query);

    const dbResult = await pg.query(query);
    const makes = dbResult.rows;
    return res.json({
      result: makes,
      count: makes.length,
    });
  } catch (e) {
    console.error(e);
  }
});

app.get("/options/styles", async (req, res) => {
  try {
    let query = `SELECT DISTINCT body_style from body`;
    console.log("Executing final DB query: ", query);

    const dbResult = await pg.query(query);
    const rows = dbResult.rows;
    return res.json({
      result: rows,
      count: rows.length,
    });
  } catch (e) {
    console.error(e);
  }
});

app.get("/options/drives", async (req, res) => {
  try {
    let query = `SELECT DISTINCT drive_wheel from body`;
    console.log("Executing final DB query: ", query);

    const dbResult = await pg.query(query);
    const rows = dbResult.rows;
    return res.json({
      result: rows,
      count: rows.length,
    });
  } catch (e) {
    console.error(e);
  }
});

app.get("/options/fuel", async (req, res) => {
  try {
    let query = `SELECT DISTINCT fuel_type from fuel`;
    console.log("Executing final DB query: ", query);

    const dbResult = await pg.query(query);
    const rows = dbResult.rows;
    return res.json({
      result: rows,
      count: rows.length,
    });
  } catch (e) {
    console.error(e);
  }
});

app.get("/options/cylinders", async (req, res) => {
  try {
    let query = `SELECT DISTINCT cylinders from engine`;
    console.log("Executing final DB query: ", query);

    const dbResult = await pg.query(query);
    const rows = dbResult.rows;
    return res.json({
      result: rows,
      count: rows.length,
    });
  } catch (e) {
    console.error(e);
  }
});

app.get("/options/engSizes", async (req, res) => {
  try {
    let query = `SELECT DISTINCT engine_size from engine`;
    console.log("Executing final DB query: ", query);

    const dbResult = await pg.query(query);
    const rows = dbResult.rows;
    return res.json({
      result: rows,
      count: rows.length,
    });
  } catch (e) {
    console.error(e);
  }
});

app.get("/cars", async (req, res) => {
  try {
    const filters = {
      model: req.query.model,
      make: req.query.make,
      priceMin: req.query.priceMin,
      priceMax: req.query.priceMax,
      safety: req.query.safety,
      fuelType: req.query.fuelType,
      doorsMin: req.query.doorsMin,
      seatsMin: req.query.seatsMin,
      doorsMax: req.query.doorsMax,
      seatsMax: req.query.seatsMax,
      cityMpgMin: req.query.cityMpgMin,
      cityMpgMax: req.query.cityMpgMax,
      highwayMpgMin: req.query.highwayMpgMin,
      highwayMpgMax: req.query.highwayMpgMax,
      driveWheel: req.query.driveWheel,
      style: req.query.style,
      cylinders: req.query.cylinders,
      horsepowerMin: req.query.horsepowerMin,
      horsepowerMax: req.query.horsepowerMax,
      engineSize: req.query.engineSize,
      engineLoc: req.query.engineLoc,
    };

    let query = `SELECT make, model, price, safety_rating, image_url FROM car`;
    let where = [];
    let whereOr = [];
    let from = {};

    if (
      filters.doorsMin ||
      filters.doorsMax ||
      filters.seatsMin ||
      filters.seatsMax ||
      filters.driveWheel ||
      filters.style
    ) {
      from["body"] = true;
      from["car_has_body"] = true;
    }

    if (
      filters.fuelType ||
      filters.highwayMpgMax ||
      filters.highwayMpgMin ||
      filters.cityMpgMax ||
      filters.cityMpgMin
    ) {
      from["fuel"] = true;
      from["runs_on"] = true;
    }

    if (
      filters.engineLoc ||
      filters.engineSize ||
      filters.cylinders ||
      filters.horsepowerMax ||
      filters.horsepowerMin
    ) {
      from["engine"] = true;
      from["car_contains_engine"] = true;
    }

    // primary filters
    if (filters.make) {
      where.push(`make = '${filters.make}'`);
    }

    if (filters.priceMin) {
      where.push(`price > ${filters.priceMin || searchDefaults.priceMin}`);
    }

    if (filters.priceMax) {
      where.push(`price < ${filters.priceMax || searchDefaults.priceMax}`);
    }

    if (filters.safety) {
      where.push(`safety_rating >= ${filters.safety || searchDefaults.safety}`);
    }

    // fuel filters
    if (filters.fuelType) {
      where.push(`car.car_id = runs_on.car_id`);
      where.push(`runs_on.fuel_id = fuel.fuel_id`);
      where.push(`fuel.fuel_type = '${filters.fuelType}'`);
    }

    if (filters.highwayMpgMin) {
      where.push(`car.car_id = runs_on.car_id`);
      where.push(`runs_on.fuel_id = fuel.fuel_id`);
      where.push(`fuel.highway_mpg >= ${filters.highwayMpgMin}`);
    }

    if (filters.highwayMpgMax) {
      where.push(`car.car_id = runs_on.car_id`);
      where.push(`runs_on.fuel_id = fuel.fuel_id`);
      where.push(`fuel.highway_mpg <= ${filters.highwayMpgMax}`);
    }

    if (filters.cityMpgMin) {
      where.push(`car.car_id = runs_on.car_id`);
      where.push(`runs_on.fuel_id = fuel.fuel_id`);
      where.push(`fuel.city_mpg >= ${filters.cityMpgMin}`);
    }

    if (filters.cityMpgMax) {
      where.push(`car.car_id = runs_on.car_id`);
      where.push(`runs_on.fuel_id = fuel.fuel_id`);
      where.push(`fuel.city_mpg <= ${filters.cityMpgMax}`);
    }

    // body filters
    if (filters.doorsMin) {
      where.push(`car.car_id = car_has_body.car_id`);
      where.push(`car_has_body.body_id = body.body_id`);
      where.push(`body.doors >= ${filters.doorsMin}`);
    }

    if (filters.doorsMax) {
      where.push(`car.car_id = car_has_body.car_id`);
      where.push(`car_has_body.body_id = body.body_id`);
      where.push(`body.doors <= ${filters.doorsMax}`);
    }

    if (filters.seatsMin) {
      where.push(`car.car_id = car_has_body.car_id`);
      where.push(`car_has_body.body_id = body.body_id`);
      where.push(`body.seats >= ${filters.seatsMin}`);
    }

    if (filters.seatsMax) {
      where.push(`car.car_id = car_has_body.car_id`);
      where.push(`car_has_body.body_id = body.body_id`);
      where.push(`body.seats <= ${filters.seatsMax}`);
    }

    // engine filters
    if (filters.horsepowerMax) {
      where.push(`car.car_id = car_contains_engine.car_id`);
      where.push(`car_contains_engine.engine_id = engine.engine_id`);
      where.push(`engine.horsepower <= ${filters.horsepowerMax}`);
    }

    if (filters.horsepowerMin) {
      where.push(`car.car_id = car_contains_engine.car_id`);
      where.push(`car_contains_engine.engine_id = engine.engine_id`);
      where.push(`engine.horsepower >= ${filters.horsepowerMin}`);
    }

    if (filters.cylinders) {
      where.push(`car.car_id = car_contains_engine.car_id`);
      where.push(`car_contains_engine.engine_id = engine.engine_id`);
      where.push(`engine.cylinders = '${filters.cylinders}'`);
    }

    if (filters.engineLoc) {
      where.push(`car.car_id = car_contains_engine.car_id`);
      where.push(`car_contains_engine.engine_id = engine.engine_id`);
      where.push(`engine.engine_loc = '${filters.engineLoc}'`);
    }

    if (filters.engineSize) {
      where.push(`car.car_id = car_contains_engine.car_id`);
      where.push(`car_contains_engine.engine_id = engine.engine_id`);
      where.push(`engine.engine_size = ${filters.engineSize}`);
    }

    if (filters.style) {
      where.push(`car.car_id = car_has_body.car_id`);
      where.push(`car_has_body.body_id = body.body_id`);
      const options = filters.style.split(",");
      let orQuery = `(body.body_style = '${options[0]}'`;
      if (options.length > 1) {
        for (let i = 1; i < options.length; i++) {
          orQuery += ` OR body.body_style = '${options[i]}'`;
        }
        orQuery += ")";
        whereOr.push(orQuery);
      } else {
        orQuery += ")";

        where.push(orQuery);
      }
    }

    if (filters.driveWheel) {
      where.push(`car.car_id = car_has_body.car_id`);
      where.push(`car_has_body.body_id = body.body_id`);
      const options = filters.driveWheel.split(",");
      let orQuery = `(body.drive_wheel = '${options[0]}'`;

      if (options.length > 1) {
        for (let i = 1; i < options.length; i++) {
          orQuery += ` OR body.drive_wheel = '${options[i]}'`;
        }
        orQuery += ")";
        whereOr.push(orQuery);
      } else {
        orQuery += ")";
        where.push(orQuery);
      }
    }

    // construct the FROM depending on what tables we read from
    const fromTables = Object.keys(from);
    if (fromTables.length > 0) {
      query += ", " + fromTables.join(" , ");
    }

    // combine basic WHERE conditions
    if (where.length > 0) {
      query += " WHERE " + where.join(" AND ");
    }

    // combine complex OR conditions
    if (whereOr.length > 0) query += " AND ";
    for (let i = 0; i < whereOr.length; i++) {
      query += whereOr[i];
      if (i != whereOr.length - 1) {
        query += " AND ";
      }
    }

    console.log("Executing final DB query: ", query);

    const dbResult = await pg.query(query);
    const cars = dbResult.rows;
    return res.json({
      result: cars,
      count: cars.length,
    });
  } catch (error) {
    console.error("res error: ", error);
  }
});

app.listen(port, async () => {
  await initPostgres();
  console.log(`autocat-api running on port ${port}`, port);
});
