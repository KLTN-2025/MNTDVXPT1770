// src/pages/ReviewDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import { reviewData } from "@/data/reviewData"; // Import dữ liệu review
import Navbar from "@/components/Navbar";
import { ArrowLeft, Star, Film } from "lucide-react"; // Thêm icon Star và Film

const ReviewDetailPage = () => {
  const { id } = useParams();
  const review = reviewData.find((item) => item.id === id);

  if (!review) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold text-center">
            Bài đánh giá không tồn tại
          </h1>
          <div className="text-center mt-6">
            <Link to="/reviews" className="text-cinema-primary hover:underline">
              ← Quay lại trang Đánh giá
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            to="/reviews" // Quay lại trang danh sách review
            className="flex items-center gap-2 text-cinema-primary hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
          </Link>

          {/* Image */}
          <img
            src={review.image}
            alt={review.title}
            className="w-full h-72 object-cover rounded-lg mb-6 shadow-md"
          />

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">{review.title}</h1>

          {/* PHẦN THÔNG TIN BỔ SUNG */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 p-4 border rounded-lg bg-muted/50">
            {/* Link tới phim */}
            <Link 
              to={`/movies/${review.movieId}`} 
              className="flex items-center gap-2 font-semibold text-cinema-primary hover:underline"
            >
              <Film className="w-5 h-5" />
              <span>{review.movieTitle}</span>
            </Link>
            
            {/* Đánh giá (Rating) */}
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-xl font-bold">{review.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">/ 10</span>
            </div>

            {/* Thông tin tác giả và ngày */}
            <div className="text-sm text-muted-foreground">
              <span>Viết bởi <strong>{review.author}</strong></span>
              <span className="mx-2">|</span>
              <span>{review.date}</span>
            </div>
          </div>


          {/* Content */}
          <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
            {review.content}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewDetailPage;