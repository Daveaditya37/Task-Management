import { Request, Response } from "express";
import { loginService, signupService } from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await signupService(
      name,
      email,
      password,
      role
    );

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await loginService(email, password);

    return res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
