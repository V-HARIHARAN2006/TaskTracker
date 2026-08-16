import React, { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [notification, setNotification] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingTask, setEditingTask] = useState(null);

    const [newTask, setNewTask] = useState({
        title: "",
        description: ""
    });

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
        setNotification("");
    }, 2500);
};

    // =========================
    // GET TASKS
    // =========================

    const fetchTasks = async () => {
        try {
            setLoading(true);

            const response = await api.get("/tasks");

            const data = response.data;

            if (Array.isArray(data)) {
                setTasks(data);
            } else if (Array.isArray(data.tasks)) {
                setTasks(data.tasks);
            } else {
                setTasks([]);
            }

        } catch (err) {
            console.error("Error fetching tasks:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load tasks"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);


    // =========================
    // INPUT CHANGE
    // =========================

    const handleChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        });
    };


    // =========================
    // ADD TASK
    // =========================

    const addTask = async (e) => {
        e.preventDefault();

        if (!newTask.title.trim()) {
            alert("Please enter a task title");
            return;
        }

        try {

            const response = await api.post(
                "/tasks",
                {
                    title: newTask.title,
                    description: newTask.description
                }
            );

            console.log("Task created:", response.data);

            setNewTask({
                title: "",
                description: ""
            });

            setShowForm(false);
showNotification("Task created successfully!");
            fetchTasks();

        } catch (err) {

            console.error("Error creating task:", err);

            alert(
                err.response?.data?.message ||
                "Unable to create task"
            );
        }
    };
// =========================
// EDIT TASK
// =========================

const editTask = async (e) => {
    e.preventDefault();

    if (!editingTask.title.trim()) {
        alert("Please enter a task title");
        return;
    }

    try {
        await api.put(
            `/tasks/${editingTask._id || editingTask.id}`,
            {
                title: editingTask.title,
                description: editingTask.description
            }
        );

        setEditingTask(null);

        showNotification("Task updated successfully!");

        fetchTasks();

    } catch (err) {
        console.error("Edit error:", err);

        alert(
            err.response?.data?.message ||
            "Unable to edit task"
        );
    }
};

    // =========================
    // DELETE TASK
    // =========================

    const deleteTask = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/tasks/${id}`);

            showNotification("Task deleted successfully!");

            fetchTasks();

        } catch (err) {

            console.error("Delete error:", err);

            alert(
                err.response?.data?.message ||
                "Unable to delete task"
            );
        }
    };


    // =========================
    // TOGGLE STATUS
    // =========================

    const toggleStatus = async (task) => {

        const newStatus =
            task.status === "completed"
                ? "pending"
                : "completed";

        try {

            await api.put(
                `/tasks/${task._id}`,
                {
                    status: newStatus
                }
            );

            showNotification(
    newStatus === "completed"
        ? "Task completed!"
        : "Task moved to pending!"
);


            fetchTasks();

        } catch (err) {

            console.error("Status update error:", err);

            alert(
                err.response?.data?.message ||
                "Unable to update task"
            );
        }
    };


    // =========================
    // LOGOUT
    // =========================

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    };
    const totalTasks = tasks.length;

const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
).length;

const completedTasks = tasks.filter(
    (task) => task.status === "completed"
).length;

const filteredTasks = tasks.filter((task) => {

    const matchesFilter =
        filter === "all" ||
        task.status === filter;

    const searchText = search.toLowerCase();

    const matchesSearch =
        task.title?.toLowerCase().includes(searchText) ||
        task.description?.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
});

    return (

        <div className="dashboard">
            {notification && (
    <div className="notification">
        ✓ {notification}
    </div>
)}

            {/* HEADER */}

            <header className="dashboard-header">

                <div>
                    <h1>Task Tracker</h1>

                    <p>
                        Welcome, {user.name || "User"} 👋
                    </p>
                </div>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </header>


            {/* CONTENT */}

            <main className="dashboard-content">

                <div className="stats-container">

    <div className="stat-card">
        <div className="stat-icon">📋</div>

        <div>
            <p>Total Tasks</p>
            <h2>{totalTasks}</h2>
        </div>
    </div>

    <div className="stat-card">
        <div className="stat-icon">⏳</div>

        <div>
            <p>Pending</p>
            <h2>{pendingTasks}</h2>
        </div>
    </div>

    <div className="stat-card">
        <div className="stat-icon">✅</div>

        <div>
            <p>Completed</p>
            <h2>{completedTasks}</h2>
        </div>
    </div>

</div>

                <div className="task-header">

                    <div>

                        <h2>My Tasks</h2>

                        <p>
                            Manage your tasks and stay productive.
                        </p>

                    </div>


                    <button
                        className="add-task-btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        + Add Task
                    </button>

                </div>

                <div className="task-filters">
                    <div className="search-container">

    <input
        type="text"
        placeholder="🔎 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

</div>

    <button
        className={filter === "all" ? "active-filter" : ""}
        onClick={() => setFilter("all")}
    >
        All
    </button>

    <button
        className={filter === "pending" ? "active-filter" : ""}
        onClick={() => setFilter("pending")}
    >
        Pending
    </button>

    <button
        className={filter === "completed" ? "active-filter" : ""}
        onClick={() => setFilter("completed")}
    >
        Completed
    </button>

</div>

{/* EDIT TASK FORM */}

{editingTask && (

    <form
        className="task-form"
        onSubmit={editTask}
    >

        <h3>Edit Task</h3>

        <input
            type="text"
            value={editingTask.title}
            onChange={(e) =>
                setEditingTask({
                    ...editingTask,
                    title: e.target.value
                })
            }
            placeholder="Task title"
        />

        <textarea
            value={editingTask.description || ""}
            onChange={(e) =>
                setEditingTask({
                    ...editingTask,
                    description: e.target.value
                })
            }
            placeholder="Task description"
        />

        <div>

            <button
                type="submit"
                className="save-btn"
            >
                Save Changes
            </button>

            <button
                type="button"
                className="cancel-btn"
                onClick={() => setEditingTask(null)}
            >
                Cancel
            </button>

        </div>

    </form>

)}

                {/* ADD TASK FORM */}

                {showForm && (

                    <form
                        className="task-form"
                        onSubmit={addTask}
                    >

                        <input
                            type="text"
                            name="title"
                            placeholder="Task title"
                            value={newTask.title}
                            onChange={handleChange}
                        />

                        <textarea
                            name="description"
                            placeholder="Task description"
                            value={newTask.description}
                            onChange={handleChange}
                        />

                        <div>

                            <button
                                type="submit"
                                className="save-btn"
                            >
                                Create Task
                            </button>

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                )}


                {error && (

                    <div className="error">
                        {error}
                    </div>

                )}


                {/* TASKS */}

                {loading ? (

                    <p>Loading tasks...</p>

                ) : tasks.length === 0 ? (

                    <div className="empty-state">

                        <h3>No tasks yet</h3>

                        <p>
                            Create your first task to get started.
                        </p>

                    </div>

                ) : (

                    <div className="task-list">

                        {filteredTasks.map((task) => (

                            <div
                                className="task-card"
                                key={task._id || task.id}
                            >

                                <div className="task-info">

    <h3>
        {task.title}
    </h3>

    <p>
        {task.description}
    </p>

    <div className="task-meta">

        <span
            className={
                task.status === "completed"
                    ? "status completed"
                    : "status pending"
            }
        >
            {task.status}
        </span>

        {task.createdAt && (
            <span className="task-date">
                📅 Created:{" "}
                {new Date(task.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                )}
            </span>
        )}

    </div>

</div>


                                <div className="task-actions">

    <button
        onClick={() =>
            toggleStatus(task)
        }
    >
        {task.status === "completed"
            ? "↩ Pending"
            : "✓ Complete"
        }
    </button>

    <button
        onClick={() =>
            setEditingTask({
                ...task
            })
        }
    >
        ✏️ Edit
    </button>

    <button
        onClick={() =>
            deleteTask(
                task._id || task.id
            )
        }
    >
        🗑 Delete
    </button>

</div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default Dashboard;