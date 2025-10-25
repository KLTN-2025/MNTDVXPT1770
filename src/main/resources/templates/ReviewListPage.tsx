// src/pages/ReviewListPage.tsx
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { reviewData } from "@/data/reviewData"; // Đảm bảo reviewData đã có 10 bài
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";

// Tách bài viết đầu tiên làm "Nổi bật"
const featuredReview = reviewData[0];
// Lấy các bài viết còn lại
const otherReviews = reviewData.slice(1);

const ReviewListPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-transparent bg-gradient-to-r from-cinema-primary to-cinema-accent bg-clip-text">
          Đánh Giá & Phê Bình Phim
        </h1>

        {/* === BÀI VIẾT NỔI BẬT === */}
        {featuredReview && (
          <Card className="mb-12 overflow-hidden shadow-xl transition-shadow duration-300 hover:shadow-2xl">
            {/* Bọc cả thẻ trong 1 link duy nhất */}
            <Link 
              to={`/reviews/${featuredReview.id}`} 
              className="grid grid-cols-1 md:grid-cols-2"
            >
              {/* Hình ảnh */}
              <div className="w-full">
                <img
                  src={featuredReview.image}
                  alt={featuredReview.title}
                  className="w-full h-64 md:h-full object-cover" // h-full để khớp chiều cao
                />
              </div>

              {/* Nội dung */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <Badge className="mb-3 w-fit" variant="destructive">
                  Mới nhất
                </Badge>
                
                <h2 className="text-2xl lg:text-3xl font-bold mb-3 line-clamp-2">
                  {featuredReview.title}
                </h2>

                <div className="flex items-center gap-4 mb-4">
                  {/* Link tới phim */}
                  <Badge variant="secondary">{featuredReview.movieTitle}</Badge>
                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xl font-bold">
                      {featuredReview.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">/ 10</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {featuredReview.summary}
                </p>

                <p className="text-sm text-muted-foreground mb-6">
                  Bởi <strong>{featuredReview.author}</strong> - {featuredReview.date}
                </p>

                {/* Call to action */}
                <div className="flex items-center text-cinema-primary font-semibold group">
                  Đọc chi tiết
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </Card>
        )}

        {/* === CÁC BÀI VIẾT KHÁC === */}
        <h2 className="text-2xl font-bold mb-6">Đánh giá khác</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherReviews.map((review) => (
            <Link to={`/reviews/${review.id}`} key={review.id}>
              {/* Sử dụng lại thẻ Card như cũ cho các bài viết này */}
              <Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-lg group">
                <div className="overflow-hidden">
                  <img
                    src={review.image}
                    alt={review.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary">{review.movieTitle}</Badge>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-sm">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-[56px] group-hover:text-cinema-primary transition-colors">
                    {review.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {review.summary}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ReviewListPage;