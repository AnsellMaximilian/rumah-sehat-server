const router = require("express").Router();
const { Op } = require("sequelize");
const { makeError } = require("../../../helpers/errors");
const {
  sequelize: {
    models: { DrIdItem, DrIdDeliveryDetail, DrIdBundle, DrIdBundleItem },
  },
  sequelize,
} = require("../../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const bundles = await DrIdBundle.findAll({
      include: [
        { model: DrIdBundleItem, include: [DrIdItem] },
        { model: DrIdItem },
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

    const foundBundle = await DrIdBundle.findOne({
      where: {
        DrIdItemId: parentItemId,
      },
    });

    if (foundBundle)
      throw `Bundle for this item already exists (#${foundBundle.id})`;

    const transaction = await sequelize.transaction();

    const bundle = await DrIdBundle.create(
      {
        DrIdItemId: parentItemId,
      },
      {
        transaction,
      }
    );

    const savedBundleItems = await Promise.all(
      bundleItems.map((item) => {
        return DrIdBundleItem.create(
          { DrIdBundleId: bundle.id, DrIdItemId: item.itemId, qty: item.qty },
          { transaction }
        );
      })
    );

    transaction.commit();

    res.json({
      message: "Success",
      data: { ...bundle, DrIdBundleItems: savedBundleItems },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const bundle = await DrIdBundle.findByPk(id, {
      include: [
        { model: DrIdBundleItem, include: [DrIdItem] },
        { model: DrIdItem },
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

    const foundOtherBundle = await DrIdBundle.findOne({
      where: {
        DrIdItemId: parentItemId,
      },
    });

    if (foundOtherBundle && parentItemId !== foundOtherBundle.DrIdItemId)
      throw `Bundle for this item already exists (#${foundOtherBundle.id})`;

    const transaction = await sequelize.transaction();

    const bundle = await DrIdBundle.findByPk(id);

    bundle.DrIdItemId = parentItemId;
    await bundle.save({ transaction });

    await DrIdBundleItem.destroy({
      where: { DrIdBundleId: id },
      transaction,
    });

    const updatedBundleItems = await Promise.all(
      bundleItems.map((item) => {
        return DrIdBundleItem.create(
          { DrIdBundleId: bundle.id, DrIdItemId: item.itemId, qty: item.qty },
          { transaction }
        );
      })
    );

    await transaction.commit();

    res.json({ data: { ...bundle, DrIdBundleItems: updatedBundleItems } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const bundle = await DrIdBundle.findByPk(id, {
      include: [{ model: DrIdBundleItem, include: [DrIdItem] }],
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
