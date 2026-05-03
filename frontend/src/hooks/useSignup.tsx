import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup } from "../service/index";

export function useSignup() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signup,

    onSuccess: () => {
      navigate("/login", { replace: true });
    },

    onError: (error: Error) => {
      console.error("Signup failed:", error.message);
    },
  });

  return {
    signup: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
