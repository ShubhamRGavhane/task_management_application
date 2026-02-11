import axios from "axios";
import { useEffect, useState } from "react";

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
`,
  styleSheet.cssRules.length,
);

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks`, {
      headers: { Authorization: token },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchTasks();
  }, [token, fetchTasks]);

  const openAddModal = () => {
    setIsEdit(false);
    setTitle("");
    setStatus("pending");
    setError("");
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setIsEdit(true);
    setEditId(task._id);
    setTitle(task.title);
    setStatus(task.status);
    setError("");
    setShowModal(true);
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  const saveTask = async () => {
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    if (isEdit) {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/tasks/${editId}`,
        { title, status },
        { headers: { Authorization: token } },
      );
    } else {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/tasks`,
        { title, status },
        { headers: { Authorization: token } },
      );
    }

    setShowModal(false);
    fetchTasks();
  };

  const confirmDelete = async () => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/tasks/${deleteId}`,
      {
        headers: { Authorization: token },
      },
    );
    setDeleteId(null);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar with logout*/}
      <aside style={styles.sidebar}>
        <h2>Task Manager</h2>
        <button style={styles.logout} onClick={logout}>
          Logout
        </button>
      </aside>

      {/* display tasks */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h2>My Tasks</h2>
          <button style={styles.addBtn} onClick={openAddModal}>
            + Add Task
          </button>
        </header>

        <div style={styles.filters}>
          {["all", "pending", "in-progress", "done"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                background: filter === f ? "#4f46e5" : "#e5e7eb",
                color: filter === f ? "#fff" : "#111",
              }}
            >
              {f.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <p style={styles.empty}>
            No tasks available right now, for this status.
          </p>
        )}

        <ul style={styles.list}>
          {filteredTasks.map((t) => (
            <li
              key={t._id}
              style={styles.task}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div>
                <strong>{t.title}</strong>
                <span
                  style={{
                    ...styles.badge,
                    background:
                      t.status === "pending"
                        ? "#f59e0b"
                        : t.status === "in-progress"
                          ? "#3b82f6"
                          : "#16a34a",
                  }}
                >
                  {t.status.replace("-", " ")}
                </span>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button style={styles.edit} onClick={() => openEditModal(t)}>
                  Edit
                </button>
                <button
                  style={styles.delete}
                  onClick={() => setDeleteId(t._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* Add / Edit Modal */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>{isEdit ? "Update Task" : "Add Task"}</h3>

            <input
              style={styles.input}
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              style={styles.input}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.modalActions}>
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button style={styles.primary} onClick={saveTask}>
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Delete Task?</h3>
            <p>This action cannot be undone.</p>

            <div style={styles.modalActions}>
              <button onClick={() => setDeleteId(null)}>Cancel</button>
              <button style={styles.danger} onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#f3f4f6",
  },
  sidebar: {
    width: 220,
    background: "#1f2937",
    color: "#fff",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  main: {
    flex: 1,
    padding: 30,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  addBtn: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer",
  },
  logout: {
    background: "#ef4444",
    border: "none",
    padding: 8,
    color: "#fff",
    borderRadius: 6,
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  filters: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  filterBtn: {
    border: "none",
    padding: "6px 12px",
    borderRadius: 20,
    cursor: "pointer",
    fontSize: 12,
  },
  task: {
    background: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  badge: {
    marginLeft: 10,
    color: "#fff",
    padding: "2px 10px",
    borderRadius: 20,
    fontSize: 12,
  },
  edit: {
    background: "#e0e7ff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
  delete: {
    background: "transparent",
    border: "none",
    color: "#ef4444",
    cursor: "pointer",
  },
  empty: {
    color: "#6b7280",
    marginTop: 20,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 320,
    animation: "fadeIn 0.2s ease-in-out",
  },
  input: {
    width: "100%",
    padding: 8,
    marginTop: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 15,
  },
  primary: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
  },
  danger: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
  },
  error: {
    color: "red",
    fontSize: 13,
  },
};
