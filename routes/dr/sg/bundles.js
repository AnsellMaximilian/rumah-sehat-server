const router = require("express").Router();
const { Op } = require("sequelize");
const { makeError } = require("../../../helpers/errors");
const {
  sequelize: {
    models: { DrSgItem, DrSgBundle, DrSgBundleItem },
  },
  sequelize,
} = require("../../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const bundles = await DrSgBundle.findAll({
      include: [
        { model: DrSgBundleItem, include: [DrSgItem] },
        { model: DrSgItem },
      ],
    });
    res.json({ data: bundles });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { parentItemId, bundleItems } = req.body;

    const foundBundle = await DrSgBundle.findOne({
      where: {
        DrSgItemId: parentItemId,
      },
    });

    if (foundBundle)
      throw `Bundle for this item already exists (#${foundBundle.id})`;

    const transaction = await sequelize.transaction();

    const bundle = await DrSgBundle.create(
      {
        DrSgItemId: parentItemId,
      },
      {
        transaction,
      }
    );

    const savedBundleItems = await Promise.all(
      bundleItems.map((item) => {
        return DrSgBundleItem.create(
          { DrSgBundleId: bundle.id, DrSgItemId: item.itemId, qty: item.qty },
          { transaction }
        );
      })
    );

    transaction.commit();

    res.json({
      message: "Success",
      data: { ...bundle, DrSgBundleItems: savedBundleItems },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const bundle = await DrSgBundle.findByPk(id, {
      include: [
        { model: DrSgBundleItem, include: [DrSgItem] },
        { model: DrSgItem },
      ],
    });
    if (!bundle) throw `Can't find bundle with id ${id}`;
    res.json({ data: bundle });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { parentItemId, bundleItems } = req.body;
    const { id } = req.params;

    const foundOtherBundle = await DrSgBundle.findOne({
      where: {
        DrSgItemId: parentItemId,
      },
    });

    if (foundOtherBundle && parentItemId !== foundOtherBundle.DrSgItemId)
      throw `Bundle for this item already exists (#${foundOtherBundle.id})`;

    const transaction = await sequelize.transaction();

    const bundle = await DrSgBundle.findByPk(id);

    bundle.DrSgItemId = parentItemId;
    await bundle.save({ transaction });

    await DrSgBundleItem.destroy({
      where: { DrSgBundleId: id },
      transaction,
    });

    const updatedBundleItems = await Promise.all(
      bundleItems.map((item) => {
        return DrSgBundleItem.create(
          { DrSgBundleId: bundle.id, DrSgItemId: item.itemId, qty: item.qty },
          { transaction }
        );
      })
    );

    await transaction.commit();

    res.json({ data: { ...bundle, DrSgBundleItems: updatedBundleItems } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const bundle = await DrSgBundle.findByPk(id, {
      include: [{ model: DrSgBundleItem, include: [DrSgItem] }],
    });

    await bundle.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: bundle });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
