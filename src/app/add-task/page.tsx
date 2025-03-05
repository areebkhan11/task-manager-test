"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../graphql/mutations";
import { useRouter } from "next/navigation";
import withAdmin from "../hoc/withAdmin";
import { useSelector } from "react-redux";
import { fetchUsers } from "../../redux/slices/usersSlice";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createTask, { error }] = useMutation(CREATE_TASK);
  const [assignedTo, setAssignedTo] = useState("");
  // Fetch users from Redux state
  const { users, status } = useSelector((state: RootState) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask({ variables: { title, description } });
      router.push("/dashboard");
    } catch (err) {
      console.error("Task creation failed", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            className="w-full p-2 border rounded mb-2"
          ></textarea>
          {/* <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select User</option>
            {status === "loading" ? (
              <option>Loading users...</option>
            ) : (
              users?.map((user) => (
                <option key={user?.id.toString()} value={user?.id.toString()}>
                  {user?.name} ({user?.email})
                </option>
              ))
            )}
          </select> */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded"
          >
            Create Task
          </button>
          {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddTask;
