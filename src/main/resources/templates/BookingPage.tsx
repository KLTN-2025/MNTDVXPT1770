// src/pages/BookingPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { SeatSelection } from "@/components/SeatSelection"; // Giả định component này đã được tối ưu
import { ArrowLeft, Calendar, Clock, MapPin, Ticket as TicketIcon } from "lucide-react"; // Đổi tên Ticket để tránh trùng
import { toast } from "sonner"; // Sonner notifications

// Import hình ảnh
import moviePoster1 from "@/assets/MƯA ĐỎ.jpg";
import moviePoster2 from "@/assets/bangdang.jpg";
import moviePoster3 from "@/assets/codauma.jpg";
import moviePoster4 from "@/assets/lamgiauvoima.jpg";
import moviePoster5 from "@/assets/emxinhtinhquai.jpg";
import moviePoster6 from "@/assets/quymocruot.jpg";

interface Seat {
  id: string;
  row: string;
  number: number;
  type: "regular" | "vip" | "couple";
  status: "available" | "occupied" | "selected";
  price: number;
}

const MOVIES = {
  "1": { title: "Mưa đỏ", poster: moviePoster1, duration: "125 phút" },
  "2": { title: "Băng Đảng Quái Kiệt", poster: moviePoster2, duration: "140 phút" },
  "3": { title: "Cô dâu ma", poster: moviePoster3, duration: "155 phút" },
  "4": { title: "Làm Giàu Với Ma", poster: moviePoster4, duration: "125 phút" },
  "5": { title: "Em xinh tinh quái", poster: moviePoster5, duration: "140 phút" },
  "6": { title: "Quỷ Móc Ruột", poster: moviePoster6, duration: "155 phút" },
};

const BookingPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [step, setStep] = useState<"seats" | "payment">("seats");

  const movie = movieId ? MOVIES[movieId as keyof typeof MOVIES] : null;

  if (!movie) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Card className="p-6">
          <h2 className="text-xl font-bold">Phim không tồn tại</h2>
          <Button onClick={() => navigate('/')} className="mt-4">Quay về trang chủ</Button>
        </Card>
      </div>
    );
  }

  const handleSeatsSelected = (seats: Seat[]) => {
    setSelectedSeats(seats);
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      toast.error("Vui lòng chọn ít nhất một ghế để tiếp tục.");
      return;
    }
    setStep("payment");
  };

  const handleBooking = () => {
    toast.success("Đặt vé thành công! Vui lòng thanh toán tại quầy trước khi suất chiếu bắt đầu.", {
      action: {
        label: "Xem vé",
        onClick: () => navigate('/my-tickets'), // Giả định có trang vé của tôi
      },
    });
    navigate("/"); // Chuyển hướng về trang chủ sau khi đặt vé
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <div className="pt-20 pb-8 relative z-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-cinema-accent transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Quay lại
            </Button>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              🎬 Đặt vé xem phim
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Movie Info Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-gradient-card border border-cinema-primary/20 rounded-xl shadow-lg sticky top-24 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-4 leading-tight">
                  {movie.title}
                </h2>

                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cinema-accent" />
                    <span>Thời lượng: {movie.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cinema-accent" />
                    <span>Ngày chiếu: Thứ 7, 10/09/2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cinema-accent" />
                    <span>Giờ chiếu: 20:15</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cinema-accent" />
                    <span>Rạp: CGV Vincom Center</span>
                  </div>
                </div>

                {selectedSeats.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-border/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-lg text-foreground">Tổng tiền:</span>
                      <span className="text-3xl font-extrabold text-cinema-accent animate-pulse">
                        {totalPrice.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{selectedSeats.length} ghế:</span>{" "}
                      {selectedSeats.map((s) => s.id).join(", ")}
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === "seats" ? (
                <Card className="p-6 bg-card border border-border/20 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Chọn ghế của bạn
                  </h3>
                  {/* Component SeatSelection đã được tối ưu ở file khác */}
                  <SeatSelection onSeatsSelected={handleSeatsSelected} />

                  <div className="flex justify-end mt-8">
                    <Button
                      onClick={handleContinue}
                      disabled={selectedSeats.length === 0}
                      className="bg-gradient-button hover:shadow-glow transition-bounce text-white px-8 py-3 text-lg font-semibold rounded-lg"
                    >
                      <TicketIcon className="w-5 h-5 mr-2" />
                      Tiếp tục thanh toán
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 bg-card border border-border/20 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Chi tiết đơn hàng & Thanh toán
                  </h3>

                  <div className="space-y-6">
                    {/* Thông tin đặt vé */}
                    <div className="p-6 bg-gradient-card border border-cinema-primary/20 rounded-lg shadow-md">
                      <h4 className="font-bold text-xl text-foreground mb-4">
                        Thông tin vé của bạn
                      </h4>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex justify-between items-center pb-2 border-b border-border/20">
                          <span>Phim:</span>
                          <span className="font-medium text-foreground">{movie.title}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-border/20">
                          <span>Rạp:</span>
                          <span className="font-medium text-foreground">CGV Vincom Center</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-border/20">
                          <span>Suất chiếu:</span>
                          <span className="font-medium text-foreground">20:15 - 10/09/2024</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-border/20">
                          <span>Ghế đã chọn ({selectedSeats.length}):</span>
                          <span className="font-medium text-foreground">
                            {selectedSeats.map((s) => s.id).join(", ")}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-3 font-semibold text-lg text-foreground">
                          <span>Tổng cộng:</span>
                          <span className="text-cinema-accent text-3xl font-extrabold">
                            {totalPrice.toLocaleString("vi-VN")}đ
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-xl text-foreground">
                        Chọn phương thức thanh toán
                      </h4>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* VNPay (Online) */}
                        <Button
                          className="flex-1 h-12 bg-gradient-button hover:shadow-glow transition-bounce text-white text-lg font-semibold rounded-lg"
                          onClick={async () => {
                            toast.loading("Đang xử lý thanh toán...", { id: "payment-toast" });
                            try {
                              // Giả lập gọi API backend tạo URL thanh toán
                              await new Promise((resolve) =>
                                setTimeout(resolve, 2000)
                              );

                              toast.success("Chuyển đến trang thanh toán VNPay...", { id: "payment-toast" });

                              // Giả lập chuyển hướng sang VNPay
                              // Trong thực tế, bạn sẽ nhận được một URL từ backend và chuyển hướng đến đó
                              window.location.href = `/payment/success?amount=${totalPrice}&orderId=mock123`;
                            } catch (error) {
                              toast.error("Không thể khởi tạo thanh toán. Vui lòng thử lại sau!", { id: "payment-toast" });
                            }
                          }}
                        >
                          Thanh toán online (VNPay)
                        </Button>

                        {/* Pay at counter */}
                        <Button
                          variant="outline"
                          onClick={handleBooking}
                          className="flex-1 h-12 border-2 border-cinema-primary/50 text-foreground hover:bg-cinema-primary/10 transition-colors duration-200 text-lg font-semibold rounded-lg"
                        >
                          Thanh toán tại quầy
                        </Button>
                      </div>
                    </div>

                    {/* Quay lại chọn ghế */}
                    <div className="flex justify-center mt-6">
                      <Button
                        variant="ghost"
                        onClick={() => setStep("seats")}
                        className="text-muted-foreground hover:text-cinema-accent transition-colors duration-200"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Quay lại chọn ghế
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;