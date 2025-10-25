// src/pages/MoviesPage.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import moviePoster1 from "@/assets/MƯA ĐỎ.jpg";
import moviePoster2 from "@/assets/bangdang.jpg";
import moviePoster3 from "@/assets/codauma.jpg";
import moviePoster4 from "@/assets/lamgiauvoima.jpg";
import moviePoster5 from "@/assets/emxinhtinhquai.jpg";
import moviePoster6 from "@/assets/quymocruot.jpg";

const movies = [
  {
    id: "1",
    title: "Mưa Đỏ",
    poster: moviePoster1,
    genre: "Hành động • Phiêu lưu",
    duration: "125 phút",
    rating: 8.2,
    releaseDate: "2025",
  },
  {
    id: "2",
    title: "Băng Đảng Quái Kiệt 2",
    poster: moviePoster2,
    genre: "Hài hước • Gia đình",
    duration: "140 phút",
    rating: 7.9,
    releaseDate: "2024",
  },
  {
    id: "3",
    title: "Cô dâu ma",
    poster: moviePoster3,
    genre: "Kinh dị • Giật gân",
    duration: "155 phút",
    rating: 8.7,
    releaseDate: "2024",
  },
  {
    id: "4",
    title: "Làm Giàu Với Ma",
    poster: moviePoster4,
    genre: "Hài hước • Kinh dị",
    duration: "125 phút",
    rating: 8.2,
    releaseDate: "2024",
  },
  {
    id: "5",
    title: "Em xinh tinh quái",
    poster: moviePoster5,
    genre: "Hài hước • Gia đình",
    duration: "140 phút",
    rating: 7.9,
    releaseDate: "2024",
  },
  {
    id: "6",
    title: "Quỷ Móc Ruột",
    poster: moviePoster6,
    genre: "Kinh dị • Giật gân",
    duration: "155 phút",
    rating: 8.7,
    releaseDate: "2024",
  },
];

const MoviesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-black/80 to-background py-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-cinema-primary to-cinema-accent bg-clip-text text-transparent tracking-wide">
          🎥 Phim đang chiếu
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group relative overflow-hidden rounded-2xl shadow-xl border border-border/30 bg-black/40 hover:shadow-glow transition-all duration-500"
            >
              {/* Poster */}
              <div className="h-[420px] overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay khi hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-5 flex flex-col justify-end">
                <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-300 mb-1">{movie.genre}</p>
                <p className="text-sm text-gray-400">{movie.duration}</p>
                <div className="flex items-center gap-2 text-yellow-400 mt-2">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span className="font-semibold">{movie.rating}/10</span>
                </div>

                <Button
                  onClick={() => navigate("/cinemas")}
                  className="mt-4 w-full bg-gradient-button text-white font-semibold py-2 rounded-lg hover:shadow-glow transition-all duration-300"
                >
                  Đặt vé ngay
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
