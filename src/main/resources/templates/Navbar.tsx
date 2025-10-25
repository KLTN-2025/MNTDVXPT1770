// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Film, Menu, Search, User, X, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Mock data phim
const moviesData = [
  { id: 1, title: "Mưa Đỏ" },
  { id: 2, title: "Băng Đảng Quái Kiệt 2" },
  { id: 3, title: "Cô dâu ma" },
  { id: 4, title: "Làm Giàu Với Ma" },
  { id: 5, title: "Em xinh tinh quái" },
  { id: 6, title: "Quỷ Móc Ruột" },
];

const Navbar = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState<string>("guest");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const savedRole = localStorage.getItem("role") || "guest";
    setRole(savedRole);
  }, []);

  // Cập nhật thời gian thực
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(timeString);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fake login
  const handleFakeLogin = (userRole: "user" | "admin" | "staff") => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", userRole);
    setRole(userRole);
    setUserMenuOpen(false); // Đóng menu nếu đang mở
  };

  const handleLogout = () => {
    localStorage.clear();
    setRole("guest");
    setUserMenuOpen(false);
    navigate("/");
  };

  const filteredMovies =
    searchTerm.length > 0
      ? moviesData.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  // Mobile Menu Links - Tách ra để dễ quản lý
  const mobileNavLinks = (
    <div className="flex flex-col space-y-2 mt-4">
      <Link to="/about" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Về chúng tôi</Link>
      <Link to="/news" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Tin tức</Link>
      <Link to="/reviews" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Đánh giá</Link>
      
      {/* MỚI: Thêm link Cộng đồng cho Mobile */}
      <Link to="/community" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Cộng đồng</Link>

      <Link to="/trailers" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Trailer</Link>
      <Link to="/movies" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Phim</Link>
      <Link to="/cinemas" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Lịch chiếu</Link>
      <Link to="/promotions" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Khuyến mãi</Link>
      <Link to="/contact" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Liên hệ</Link>
      <Link to="/support" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Hỗ trợ</Link>
      {role === "guest" && (
        <div className="flex flex-col space-y-2 pt-4 border-t">
          <Button onClick={() => handleFakeLogin("user")} className="w-full bg-gradient-button text-white">Đăng nhập User</Button>
          <Button onClick={() => handleFakeLogin("admin")} className="w-full bg-gradient-button text-white">Đăng nhập Admin</Button>
          <Button onClick={() => handleFakeLogin("staff")} className="w-full bg-gradient-button text-white">Đăng nhập Staff</Button>
        </div>
      )}
      {role !== "guest" && (
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 border-t mt-2"
        >
          Đăng xuất
        </button>
      )}
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/20">
      <div className="container mx-auto px-4">
        {/* THAY ĐỔI: Giảm chiều cao thanh Navbar từ h-16 xuống h-14 */}
        <div className="flex items-center justify-between h-14">
          {/* Logo - Giảm kích thước logo và biểu tượng Film */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-foreground"
          >
            <Film className="w-6 h-6 text-cinema-primary" /> {/* Giảm từ w-8/h-8 xuống w-6/h-6 */}
            <span className="text-transparent bg-gradient-to-r from-cinema-primary to-cinema-accent bg-clip-text">
              MovieGo
            </span>
          </Link>

          {/* Desktop menu - Giữ nguyên text size nhỏ (text-xs/xl:text-sm) */}
          <div className="hidden lg:flex items-center gap-4 text-xs xl:text-sm">
            <Link to="/about" className="hover:text-cinema-primary">Về chúng tôi</Link>
            <Link to="/news" className="hover:text-cinema-primary">Tin tức</Link>
            <Link to="/reviews" className="hover:text-cinema-primary">Đánh giá</Link>

            {/* MỚI: Thêm link Cộng đồng cho Desktop */}
            <Link to="/community" className="hover:text-cinema-primary">Cộng đồng</Link>

            <Link to="/trailers" className="hover:text-cinema-primary">Trailer</Link>
            <Link to="/movies" className="hover:text-cinema-primary">Phim</Link>
            <Link to="/cinemas" className="hover:text-cinema-primary">Lịch chiếu</Link>
            <Link to="/promotions" className="hover:text-cinema-primary">Khuyến mãi</Link>
            <Link to="/contact" className="hover:text-cinema-primary">Liên hệ</Link>
            <Link to="/support" className="hover:text-cinema-primary">Hỗ trợ</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 relative">
            {/* Search - Giảm nhẹ padding và kích thước placeholder text */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Tìm phim..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-28 lg:w-36 xl:w-48 px-2 py-1 rounded-md border text-xs focus:outline-none focus:ring-2 focus:ring-cinema-primary bg-gray-700 text-white placeholder-gray-400"
              />
              {/* Căn chỉnh lại icon Search */}
              <Search className="w-3 h-3 absolute right-3 top-2 text-gray-400" />

              {filteredMovies.length > 0 && (
                <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                  {filteredMovies.map((movie) => (
                    <button
                      key={movie.id}
                      className="w-full text-left px-3 py-1 hover:bg-gray-100 text-xs"
                      onClick={() => {
                        setSearchTerm("");
                        navigate(`/movies/${movie.id}`);
                      }}
                    >
                      {movie.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ⏰ Thời gian thực (dạng LED) */}
            <div className="hidden lg:flex items-center justify-center px-2 py-0.5 rounded-sm border border-gray-300 bg-black text-green-400 font-mono text-[10px] tracking-widest shadow-inner">
              {currentTime}
            </div>

            {/* User/Admin/Staff Menu */}
            {role !== "guest" ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon" // Dùng size="icon" để giữ nút nhỏ gọn
                  className="text-foreground hover:text-cinema-primary w-8 h-8"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  {role === "admin" || role === "staff" ? (
                    <LayoutDashboard className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </Button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 text-sm"> {/* Giảm font size menu */}
                    {role === "user" && (
                      <>
                        <Link
                          to="/profile"
                          className="block px-4 py-1.5 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Trang cá nhân
                        </Link>
                        <Link
                          to="/my-tickets"
                          className="block px-4 py-1.5 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Vé của tôi
                        </Link>
                      </>
                    )}

                    {/* Admin links */}
                    {role === "admin" && (
                        <>
                            <Link to="/admin" className="block px-4 py-1.5 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>Dashboard</Link>
                            <Link to="/admin/customers" className="block px-4 py-1.5 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>Quản lý khách hàng</Link>
                            <Link to="/admin/movies" className="block px-4 py-1.5 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>Quản lý phim</Link>
                            <Link to="/admin/tickets" className="block px-4 py-1.5 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>Quản lý vé</Link>
                        </>
                    )}
                    {/* Staff links */}
                    {role === "staff" && (
                        <>
                            <Link to="/staff" className="block px-4 py-1.5 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>Dashboard nhân viên</Link>
                            <Link to="/staff/check-ticket" className="block px-4 py-1.5 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>Kiểm tra vé</Link>
                            <Link to="/staff/manage-ticket" className="block px-4 py-1.5 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>Quản lý vé</Link>
                            <Link to="/staff/manage-seats" className="block px-4 py-1.5 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>Quản lý ghế</Link>
                        </>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-1.5 hover:bg-gray-100 text-red-600"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
                // ### BẮT ĐẦU THAY ĐỔI ###
                // Thay vì một nút, chúng ta hiển thị cả ba nút cho desktop
                <div className="hidden md:flex items-center gap-2">
                    <Button
                        onClick={() => handleFakeLogin("user")}
                        className="bg-gradient-button text-white text-xs" // text-xs cho gọn
                        size="sm"
                    >
                        Login User
                    </Button>
                    <Button
                        onClick={() => handleFakeLogin("admin")}
                        className="bg-gradient-button text-white text-xs"
                        size="sm"
                    >
                        Login Admin
                    </Button>
                    <Button
                        onClick={() => handleFakeLogin("staff")}
                        className="bg-gradient-button text-white text-xs"
                        size="sm"
                    >
                        Login Staff
                    </Button>
                </div>
                // ### KẾT THÚC THAY ĐỔI ###
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon" // Dùng size="icon" để giữ nút nhỏ gọn
              className="md:hidden text-foreground w-8 h-8"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />} {/* Giảm kích thước icon */}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Content - Căn chỉnh lại top để khớp với h-14 mới */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white border-b border-gray-200 shadow-md p-4 z-40">
          {mobileNavLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;