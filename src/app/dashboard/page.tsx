"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS } from "../graphql/queries";
import { DELETE_TASK, EDIT_TASK } from "../graphql/mutations";
import { useState } from "react";

export default function Dashboard() {
  const { data, loading, refetch } = useQuery(GET_TASKS);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [editTask] = useMutation(EDIT_TASK);

  const [editingTask, setEditingTask] = useState<{ id: string; title: string; description: string } | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading tasks...</p>;

  // Handle Delete
  const handleDelete = async (id: string) => {
    try {
      await deleteTask({ variables: { taskId: id } });
      refetch(); // Refresh task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Start Edit Mode
  const startEditing = (task: any) => {
    setEditingTask(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
  };

  // Handle Edit Submission
  const handleEditSubmit = async () => {
    if (!editingTask) return;
    try {
      await editTask({
        variables: {
          taskId: editingTask.id,
          title: newTitle,
          description: newDescription,
        },
      });
      setEditingTask(null);
      refetch(); // Refresh task list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">My Assigned Tasks</h2>
      <ul className="space-y-4">
        {data?.tasks?.map((task: any) => (
          <li key={task.id} className="flex justify-between p-4 bg-white shadow rounded-lg border">
            <div>
              {editingTask?.id === task.id ? (
                <>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="border p-1 rounded w-full mb-2"
                  />
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                  <button
                    onClick={handleEditSubmit}
                    className="text-white bg-green-500 px-2 py-1 rounded mt-2"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                </>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => startEditing(task)}
                className="text-gray-600 p-2 cursor-pointer hover:text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-gray-600 cursor-pointer hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
