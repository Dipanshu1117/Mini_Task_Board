const express = require("express");
const { pool } = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, description, status, created_at FROM tasks ORDER BY created_at DESC"
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { title, description = "", status = "Todo" } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Task title is required" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
      [title.trim(), description.trim(), status]
    );

    const [rows] = await pool.query(
      "SELECT id, title, description, status, created_at FROM tasks WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      message: "Failed to create task",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const [existing] = await pool.query("SELECT id FROM tasks WHERE id = ?", [id]);

    if (!existing.length) {
      return res.status(404).json({ message: "Task not found" });
    }

    const values = [];
    const fields = [];

    if (title !== undefined) {
      fields.push("title = ?");
      values.push(title.trim());
    }

    if (description !== undefined) {
      fields.push("description = ?");
      values.push(description.trim());
    }

    if (status !== undefined) {
      fields.push("status = ?");
      values.push(status);
    }

    if (!fields.length) {
      return res.status(400).json({ message: "No task fields provided for update" });
    }

    values.push(id);

    await pool.query(
      `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    const [rows] = await pool.query(
      "SELECT id, title, description, status, created_at FROM tasks WHERE id = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      message: "Failed to update task",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      message: "Failed to delete task",
      error: error.message,
    });
  }
});

module.exports = router;
