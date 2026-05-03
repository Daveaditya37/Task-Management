import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../service/index";

const ROLE_REDIRECT: Record<string, string> = {
  ADMIN: "/admin/dashboard",
  MEMBER: "/member/dashboard",
};

export function useLogin() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,

    onSuccess: (response) => {
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate(ROLE_REDIRECT[user.role] ?? "/member/dashboard", {
        replace: true,
      });
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | null,
    reset: mutation.reset,
  };
}
