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
    const { parentItemId, bundleItemIds } = req.body;

    const transaction = await sequelize.transaction();

    const bundle = await DrIdBundle.create(
      {
        DrIdItemId: parentItemId,
      },
      {
        transaction,
      }
    );

    const bundleItems = await Promise.all(
      bundleItemIds.map((itemId) => {
        return DrIdBundleItem.create(
          { DrIdBundleId: bundle.id, DrIdItemId: itemId },
          { transaction }
        );
      })
    );

    res.json({
      message: "Success",
      data: { ...bundle, DrIdBundleItems: bundleItems },
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
    const { parentItemId, bundleItemIds } = req.body;
    const { id } = req.params;

    const transaction = await sequelize.transaction();

    const bundle = await DrIdBundle.findByPk(id);

    bundle.DrIdItemId = parentItemId;
    await bundle.save({ transaction });

    await DrIdBundleItem.destroy({
      where: { DrIdBundleId: id },
      transaction,
    });

    const bundleItems = await Promise.all(
      bundleItemIds.map((itemId) => {
        return DrIdBundleItem.create(
          { DrIdBundleId: bundle.id, DrIdItemId: itemId },
          { transaction }
        );
      })
    );

    await transaction.commit();

    res.json({ data: bundle });
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
    if (bundle.DrIdBundleItems.length > 0)
      throw "Cannot delete. Bundle has associated items.";
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
