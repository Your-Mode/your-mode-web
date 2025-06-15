import { useState } from "react";

export const useManageComment = () => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "사용자1",
      content: "정말 유용한 정보네요! 감사합니다.",
      date: "2025년 06월 15일",
      isOwn: false,
    },
    {
      id: 2,
      author: "나",
      content: "저도 이런 스타일 좋아해요",
      date: "2025년 06월 16일",
      isOwn: true,
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "나",
        content: newComment,
        date: new Date().toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        isOwn: true,
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleEditComment = (id: number) => {
    const comment = comments.find((c) => c.id === id);
    if (comment) {
      setEditingComment(id);
      setEditContent(comment.content);
    }
  };

  const handleSaveEdit = (id: number) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, content: editContent } : c)));
    setEditingComment(null);
    setEditContent("");
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  return {
    comments,
    editingComment,
    showComments,
    newComment,
    editContent,
    setEditContent,
    setEditingComment,
    setNewComment,
    handleSaveEdit,
    setShowComments,
    handleAddComment,
    handleDeleteComment,
    handleEditComment,
  };
};
