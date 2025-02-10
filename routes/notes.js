const router = require("express").Router();
const { Op } = require("sequelize");

const {
  sequelize: {
    models: { Note },
  },
} = require("../models/index");

router.get("/", async (req, res, next) => {
  try {
    const { title, content } = req.query;
    const whereClause = {};

    if (title) {
      whereClause.title = {
        [Op.iLike]: `%${title}%`,
      };
    }

    if (content) {
      whereClause.content = {
        [Op.iLike]: `%${content}%`,
      };
    }

    const notes = await Note.findAll({
      where: whereClause,
    });
    res.json({ data: notes });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const newNote = Note.build({
      title,
      content,
    });
    await newNote.save();

    res.json({ message: "Success", data: newNote });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    if (!note) throw `Can't find item with id ${id}`;
    res.json({ data: note });
  } catch (error) {
    res.json({ error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    const note = await Note.findByPk(id);

    await note.update(
      { title, content },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: note });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);

    await note.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: note });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
