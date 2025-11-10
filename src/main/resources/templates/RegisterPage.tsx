// src/pages/RegisterPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    console.log("Tên:", name, "Email:", email, "Password:", password);
    // 🚀 sau này sẽ gọi API để lưu thông tin user
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cinema-primary/10 to-cinema-accent/10 px-4 relative z-10">
      <Card className="w-full max-w-md shadow-lg border border-border/40 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-cinema-primary to-cinema-accent bg-clip-text text-transparent">
            Đăng ký MovieGo
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                type="text"
                placeholder="nhập họ tên..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="focus:ring-2 focus:ring-cinema-primary"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nhập email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:ring-2 focus:ring-cinema-primary"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:ring-2 focus:ring-cinema-primary"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="focus:ring-2 focus:ring-cinema-primary"
              />
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-button hover:shadow-glow transition-bounce text-white"
            >
              Đăng ký
            </Button>

            {/* Login Link */}
            <p className="text-sm text-center text-muted-foreground">
              Đã có tài khoản?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-cinema-primary cursor-pointer hover:underline"
              >
                Đăng nhập ngay
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
