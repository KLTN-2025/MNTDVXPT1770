import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password, "Remember:", rememberMe);

    // 🚀 Sau này sẽ gọi API login, lưu token vào localStorage
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cinema-primary/10 to-cinema-accent/10 px-4 relative z-10">
      <Card className="w-full max-w-md shadow-lg border border-border/40 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-cinema-primary to-cinema-accent bg-clip-text text-transparent">
            Đăng nhập MovieGo
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
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

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <Label htmlFor="remember">Nhớ tôi</Label>
              </div>
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-cinema-primary cursor-pointer hover:underline"
              >
                Quên mật khẩu?
              </span>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-button hover:shadow-glow transition-bounce text-white"
            >
              Đăng nhập
            </Button>

            {/* Register Link */}
            <p className="text-sm text-center text-muted-foreground">
              Chưa có tài khoản?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-cinema-primary cursor-pointer hover:underline"
              >
                Đăng ký ngay
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
