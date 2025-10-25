// src/pages/CommunityPage.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, ThumbsUp, UserCircle, X, Send } from "lucide-react";

// 1. ĐỊNH NGHĨA KIỂU DỮ LIỆU MỚI
type Comment = {
  id: number;
  author: string;
  avatar: string | null;
  text: string;
};

type Post = {
  id: number;
  category: "review" | "qa" | "general";
  author: string;
  avatar: string | null;
  time: string;
  title: string;
  content: string;
  likes: number;
  comments: Comment[]; // <-- THAY ĐỔI TỪ number SANG Comment[]
};

type PostCategory = "all" | "review" | "qa" | "general";

// 2. CẬP NHẬT MOCK DATA VỚI MẢNG BÌNH LUẬN
const initialMockPosts: Post[] = [
  {
    id: 1,
    category: "review",
    author: "User123",
    avatar: null,
    time: "5 phút trước",
    title: 'Chủ đề: Thảo luận "Mưa Đỏ"',
    content: "Bộ phim này hay quá, mọi người thấy sao?",
    likes: 12,
    comments: [
      { id: 101, author: "CineFan", avatar: "https://i.pravatar.cc/150?img=12", text: "Đồng ý, phim hay thật!" },
      { id: 102, author: "CriticMan", avatar: null, text: "Cũng bình thường, kịch bản hơi yếu." },
    ],
  },
  {
    id: 2,
    category: "qa",
    author: "CineFan",
    avatar: "https://i.pravatar.cc/150?img=12",
    time: "1 giờ trước",
    title: 'Hỏi đáp: Nên xem "Băng Đảng Quái Kiệt 2" không?',
    content:
      "Mình đang phân vân không biết có nên đi xem không, ai xem rồi cho mình xin review với!",
    likes: 5,
    comments: [], // Bài này chưa có bình luận
  },
  {
    id: 3,
    category: "general",
    author: "MovieLover",
    avatar: "https://i.pravatar.cc/150?img=5",
    time: "3 giờ trước",
    title: "Tìm bạn xem phim chung cuối tuần này",
    content: "Mình ở TP.HCM, có bạn nữ nào rảnh cuối tuần đi xem 'Cô dâu ma' với mình không?",
    likes: 2,
    comments: [
      { id: 103, author: "User123", avatar: null, text: "Mình rảnh nè, bạn ở quận mấy?" },
    ],
  },
  {
    id: 4,
    category: "review",
    author: "CriticMan",
    avatar: null,
    time: "1 ngày trước",
    title: '"Em xinh tinh quái" - Một cú lừa!',
    content: "Phim quảng cáo một đằng, nội dung một nẻo. Thất vọng toàn tập.",
    likes: 28,
    comments: [],
  },
];


// 3. COMPONENT MỚI: COMMENTS_SECTION
// Component này quản lý việc hiển thị và thêm mới bình luận
const CommentsSection = ({
  comments,
  onAddComment,
}: {
  comments: Comment[];
  onAddComment: (text: string) => void;
}) => {
  // State riêng cho nội dung bình luận đang gõ
  const [newCommentText, setNewCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    onAddComment(newCommentText);
    setNewCommentText(""); // Xóa input sau khi gửi
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      {/* Form thêm bình luận mới */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <UserCircle className="w-9 h-9 text-gray-400 flex-shrink-0" /> {/* Giả lập avatar người dùng hiện tại */}
        <input
          type="text"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Viết bình luận của bạn..."
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-cinema-primary focus:border-cinema-primary"
        />
        <Button type="submit" size="icon" className="bg-cinema-primary hover:bg-cinema-primary/90 flex-shrink-0">
          <Send className="w-4 h-4" />
        </Button>
      </form>

      {/* Danh sách bình luận */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">Chưa có bình luận nào.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              {comment.avatar ? (
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <UserCircle className="w-8 h-8 text-gray-400" />
              )}
              <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm w-full">
                <span className="font-semibold text-gray-800 block">{comment.author}</span>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 4. COMPONENT POST_CARD (Cập nhật)
const PostCard = ({
  post,
  onLike,
  onToggleComments, // <-- Prop mới
  onAddComment,     // <-- Prop mới
  isExpanded,       // <-- Prop mới
}: {
  post: Post;
  onLike: (id: number) => void;
  onToggleComments: (id: number) => void;
  onAddComment: (postId: number, text: string) => void;
  isExpanded: boolean;
}) => (
  <div className="bg-white p-5 rounded-lg shadow border transition-all hover:shadow-md">
    <div className="flex items-center mb-3">
      {post.avatar ? (
        <img
          src={post.avatar}
          alt={post.author}
          className="w-10 h-10 rounded-full mr-3"
        />
      ) : (
        <UserCircle className="w-10 h-10 text-gray-400 mr-3" />
      )}
      <div>
        <span className="font-semibold text-gray-800">{post.author}</span>
        <p className="text-xs text-gray-500">{post.time}</p>
      </div>
    </div>
    <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-cinema-primary cursor-pointer">
      {post.title}
    </h2>
    <p className="text-gray-700 mb-4">{post.content}</p>
    <div className="flex items-center justify-between text-gray-500 border-t pt-3">
      <div className="flex gap-4">
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center gap-1.5 text-sm hover:text-cinema-primary"
        >
          <ThumbsUp className="w-4 h-4" /> {post.likes}
        </button>
        {/* NÚT COMMENT GIỜ ĐÃ BẤM ĐƯỢC */}
        <button
          onClick={() => onToggleComments(post.id)}
          className={`flex items-center gap-1.5 text-sm hover:text-cinema-primary ${isExpanded ? 'text-cinema-primary' : ''}`}
        >
          <MessageSquare className="w-4 h-4" /> {post.comments.length} {/* <-- ĐẾM BẰNG .length */}
        </button>
      </div>
      <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
        {post.category === "review"
          ? "Review"
          : post.category === "qa"
          ? "Hỏi Đáp"
          : "Thảo Luận Chung"}
      </span>
    </div>
    
    {/* HIỂN THỊ CÓ ĐIỀU KIỆN MỤC BÌNH LUẬN */}
    {isExpanded && (
      <CommentsSection
        comments={post.comments}
        onAddComment={(text) => onAddComment(post.id, text)}
      />
    )}
  </div>
);

// 5. COMPONENT CHÍNH: COMMUNITY_PAGE (Cập nhật logic)
const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState<PostCategory>("all");
  const [posts, setPosts] = useState<Post[]>(initialMockPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<"review" | "qa" | "general">("general");
  
  // *** STATE MỚI: Theo dõi bài đăng đang mở comment ***
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  const filteredPosts =
    activeTab === "all"
      ? posts
      : posts.filter((post) => post.category === activeTab);

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newPost: Post = {
      id: Date.now(),
      category: newCategory,
      author: "CurrentUser",
      avatar: null,
      time: "vài giây trước",
      title: newTitle,
      content: newContent,
      likes: 0,
      comments: [], // Bài mới chưa có comment
    };
    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
    setNewTitle("");
    setNewContent("");
    setNewCategory("general");
  };

  // *** HÀM MỚI: Bật/tắt mục bình luận ***
  const handleToggleComments = (postId: number) => {
    setExpandedPostId((prevId) => (prevId === postId ? null : postId));
  };

  // *** HÀM MỚI: Thêm bình luận ***
  const handleAddComment = (postId: number, text: string) => {
    const newComment: Comment = {
      id: Date.now(),
      author: "CurrentUser", // Giả lập người dùng hiện tại
      avatar: null,
      text: text,
    };

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] } // Thêm comment mới vào mảng
          : post
      )
    );
  };

  // Component Tabs
  const TabButton = ({
    label,
    value,
  }: {
    label: string;
    value: PostCategory;
  }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 font-medium rounded-md text-sm
        ${
          activeTab === value
            ? "bg-cinema-primary text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-24 pt-28">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Cộng đồng MovieGo</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-button text-white"
          >
            <Plus className="w-4 h-4 mr-2" /> Tạo bài viết
          </Button>
        </div>

        <div className="flex gap-2 mb-6 border-b pb-3">
          <TabButton label="Tất cả" value="all" />
          <TabButton label="Review Phim" value="review" />
          <TabButton label="Hỏi Đáp" value="qa" />
          <TabButton label="Thảo Luận Chung" value="general" />
        </div>

        {/* Cập nhật props cho PostCard */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onToggleComments={handleToggleComments}
                onAddComment={handleAddComment}
                isExpanded={expandedPostId === post.id}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              <p>Chưa có bài viết nào trong mục này.</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL TẠO BÀI VIẾT (Không thay đổi) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
            <h2 className="text-2xl font-bold mb-4">Tạo bài viết mới</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
            <form onSubmit={handleAddPost}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cinema-primary focus:border-cinema-primary"
                    placeholder="Bạn đang nghĩ gì?"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nội dung
                  </label>
                  <textarea
                    id="content"
                    rows={5}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cinema-primary focus:border-cinema-primary"
                    placeholder="Viết nội dung bài đăng của bạn..."
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Danh mục
                  </label>
                  <select
                    id="category"
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as "review" | "qa" | "general")
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cinema-primary focus:border-cinema-primary"
                  >
                    <option value="general">Thảo Luận Chung</option>
                    <option value="review">Review Phim</option>
                    <option value="qa">Hỏi Đáp</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-button text-white"
                >
                  Đăng bài
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;