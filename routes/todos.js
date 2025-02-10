const router = require("express").Router();
const { Op } = require("sequelize");

const {
  sequelize: {
    models: { Todo },
  },
} = require("../models/index");

router.get("/", async (req, res, next) => {
  try {
    const { title, description, isDone } = req.query;
    const whereClause = {};

    if (title) {
      whereClause.title = {
        [Op.iLike]: `%${title}%`,
      };
    }

    if (description) {
      whereClause.description = {
        [Op.iLike]: `%${description}%`,
      };
    }

    if (isDone) whereClause.isDone = isDone === "true";

    const todos = await Todo.findAll({
      where: whereClause,
    });
    res.json({ data: todos });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, description, isDone } = req.body;

    const newTodo = Todo.build({
      title,
      description,
      isDone,
    });
    await newTodo.save();

    res.json({ message: "Success", data: newTodo });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) throw `Can't find item with id ${id}`;
    res.json({ data: todo });
  } catch (error) {
    res.json({ error });
  }
});

router.patch("/:id/toggle", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);

    await todo.update(
      { isDone: !todo.isDone },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: todo });
  } catch (error) {
    res.json({ error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { title, description, isDone } = req.body;
    const { id } = req.params;

    const todo = await Todo.findByPk(id);

    await todo.update(
      { title, description, isDone },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: todo });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    await todo.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: todo });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
