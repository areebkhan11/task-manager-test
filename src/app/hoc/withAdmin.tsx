"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAdmin = (WrappedComponent: any) => {
  return function AdminComponent(props: any) {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // Redirect to login if no token
        return;
      }

      // Decode token to check role
      const user = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      if (user.role !== "admin") {
        router.push("/dashboard"); // Redirect non-admins to dashboard
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    }, []);

    if (loading) return <p className="text-center mt-10 text-gray-500">Checking permissions...</p>;
    if (!isAdmin) return null; // Prevent rendering for non-admins

    return <WrappedComponent {...props} />;
  };
};

export default withAdmin;
