const router = require("express").Router();
const {
  sequelize: {
    models: { Customer },
  },
} = require("../models/index");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json({ data: customers });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { fullName, address, phone } = req.body;

    const newCustomer = Customer.build({ fullName, address, phone });
    await newCustomer.save();

    res.json({ message: "Success", data: newCustomer });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (!customer) throw `Can't find item with id ${id}`;
    res.json({ data: customer });
  } catch (error) {
    res.json({ error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { fullName, address, phone } = req.body;
    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    await customer.update(
      { fullName, address, phone },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: customer });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    await customer.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: customer });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
