// src/pages/ShowtimesPage.tsx
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Clock, MapPin, Ticket } from "lucide-react"; // Thêm icon Ticket

// Mock data (GIỮ NGUYÊN)
const showtimesData = [
  {
    id: 1,
    title: "Mưa Đỏ",
    poster: "/src/assets/MƯA ĐỎ.jpg",
    cinemas: [
      { name: "CGV Vincom", times: ["14:30", "17:00", "20:15", "22:45"] },
      { name: "Galaxy Nguyễn Du", times: ["13:00", "16:00", "19:30", "21:45"] },
    ],
  },
  {
    id: 2,
    title: "Băng Đảng Quái Kiệt 2",
    poster: "/src/assets/bangdang.jpg",
    cinemas: [
      { name: "Lotte Cinema", times: ["13:00", "16:30", "19:45", "22:30"] },
      { name: "BHD Star Bitexco", times: ["12:00", "15:30", "18:30", "21:00"] },
    ],
  },
  {
    id: 3,
    title: "Cô dâu ma",
    poster: "/src/assets/codauma.jpg",
    cinemas: [
      { name: "CGV Landmark 81", times: ["15:00", "18:30", "21:45"] },
      { name: "Cinestar Quốc Thanh", times: ["14:15", "17:45", "20:15"] },
    ],
  },
  {
    id: 4,
    title: "Làm Giàu Với Ma",
    poster: "/src/assets/lamgiauvoima.jpg",
    cinemas: [
      { name: "MegaGS Cao Thắng", times: ["14:00", "16:30", "19:00", "21:30"] },
      { name: "CGV Aeon Tân Phú", times: ["13:30", "17:00", "20:00", "22:15"] },
    ],
  },
  {
    id: 5,
    title: "Em xinh tinh quái",
    poster: "/src/assets/emxinhtinhquai.jpg",
    cinemas: [
      { name: "Galaxy Tân Bình", times: ["12:30", "15:30", "18:30", "21:30"] },
      { name: "Lotte Gò Vấp", times: ["13:15", "16:15", "19:15", "22:15"] },
    ],
  },
  {
    id: 6,
    title: "Quỷ Móc Ruột",
    poster: "/src/assets/quymocruot.jpg",
    cinemas: [
      { name: "CGV Hùng Vương", times: ["15:30", "18:30", "21:30"] },
      { name: "BHD Phạm Hùng", times: ["14:45", "17:45", "20:45"] },
    ],
  },
];

const ShowtimesPage = () => {
  return (
    // Nền đen sâu (black) để tối đa hóa hiệu ứng glow
    <div className="flex flex-col min-h-screen bg-black text-gray-100"> 
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        {/* Title với hiệu ứng phát sáng mạnh hơn */}
        <h1 className="text-5xl font-mono font-bold mb-16 text-center text-cinema-primary tracking-widest uppercase"
            style={{ textShadow: '0 0 10px var(--cinema-primary), 0 0 20px var(--cinema-primary)' }}>
          <Ticket className="w-8 h-8 inline-block mr-3 transform -rotate-12"/>
          Lịch Chiếu Hôm Nay
        </h1>

        {/* List of Showtimes */}
        <div className="grid gap-14 max-w-5xl mx-auto">
          {showtimesData.map((movie) => (
            <Card
              key={movie.id}
              // Card với viền phát sáng và góc vuông
              className="overflow-hidden bg-gray-950 border-2 border-cinema-primary/40 rounded-lg shadow-xl shadow-cinema-primary/10 transition-all duration-300 hover:shadow-cinema-primary/40 hover:scale-[1.01]"
            >
              <CardContent className="flex flex-col md:flex-row items-stretch gap-8 p-0">
                
                {/* Poster Block */}
                <div className="relative w-full md:w-64 flex-shrink-0">
                  <div className="w-full h-96 overflow-hidden">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      // Poster nổi bật hơn
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  {/* Tiêu đề overlay với nền gradient đen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-5">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider"
                        style={{ textShadow: '0 0 5px #fff' }}>
                      {movie.title}
                    </h2>
                  </div>
                </div>

                {/* Info Block (Danh sách rạp và suất chiếu) */}
                <div className="flex-1 space-y-6 p-6 md:p-8 w-full">
                  {movie.cinemas.map((cinema, idx) => (
                    <div
                      key={idx}
                      // Khối Rạp: Nền tối, viền dưới phát sáng nhẹ
                      className="bg-gray-800/60 p-4 rounded-md border-b-2 border-cinema-primary/60 shadow-inner shadow-black/50"
                    >
                      {/* Tên Rạp */}
                      <h3 className="flex items-center gap-2 text-xl font-semibold mb-3 text-white tracking-wide">
                        <MapPin className="w-5 h-5 text-cinema-primary" />
                        {cinema.name}
                      </h3>

                      {/* Suất Chiếu */}
                      <div className="flex flex-wrap gap-4 mt-4 border-t border-gray-700/50 pt-3">
                        {cinema.times.map((time, i) => (
                          <Link key={i} to={`/movie/${movie.id}/booking?time=${time}&cinema=${cinema.name}`}>
                            <Button
                              size="sm"
                              // Nút suất chiếu: Kiểu dáng sắc nét, glow effect
                              className="bg-cinema-primary text-gray-900 font-extrabold rounded-sm px-5 py-2 flex items-center gap-1 shadow-lg shadow-cinema-primary/50 transition-all duration-200 hover:scale-105 hover:bg-cinema-primary/90"
                            >
                              <Clock className="w-4 h-4" />
                              <span className="text-base">{time}</span>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShowtimesPage;