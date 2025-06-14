import { Button } from "@/components/ui/button";
import { Edit, MessageCircleIcon as MessageCircle2, Trash2 } from "lucide-react";
import styled from "@emotion/styled";
import { useManageComment } from "@/src/widgets/content/feature/useManageComment";

const Comments = () => {
  const {
    handleEditComment,
    comments,
    showComments,
    editingComment,
    setNewComment,
    newComment,
    editContent,
    setShowComments,
    handleSaveEdit,
    handleDeleteComment,
    handleAddComment,
    setEditingComment,
    setEditContent,
  } = useManageComment();

  return (
    <CommentsSection>
      <CommentsHeader>
        <CommentsTitle>댓글 {comments.length}개</CommentsTitle>
        <Button variant="outline" size="sm" onClick={() => setShowComments(!showComments)}>
          <MessageCircle2 size={16} />
          {showComments ? "댓글 닫기" : "댓글 열기"}
        </Button>
      </CommentsHeader>

      {showComments && (
        <>
          <CommentsList>
            {comments.map((comment) => (
              <CommentItem key={comment.id}>
                <CommentHeader>
                  <div>
                    <CommentAuthor>{comment.author}</CommentAuthor>
                    <CommentDate> • {comment.date}</CommentDate>
                  </div>
                  {comment.isOwn && (
                    <CommentActions>
                      <CommentActionButton onClick={() => handleEditComment(comment.id)}>
                        <Edit size={12} />
                      </CommentActionButton>
                      <CommentActionButton onClick={() => handleDeleteComment(comment.id)}>
                        <Trash2 size={12} />
                      </CommentActionButton>
                    </CommentActions>
                  )}
                </CommentHeader>
                {editingComment === comment.id ? (
                  <div>
                    <CommentTextarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                    <div style={{ marginTop: "0.5rem" }}>
                      <CommentSubmitButton onClick={() => handleSaveEdit(comment.id)}>저장</CommentSubmitButton>
                      <CommentActionButton onClick={() => setEditingComment(null)}>취소</CommentActionButton>
                    </div>
                  </div>
                ) : (
                  <CommentContent>{comment.content}</CommentContent>
                )}
              </CommentItem>
            ))}
          </CommentsList>

          <CommentForm>
            <CommentTextarea
              placeholder="댓글을 입력하세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <CommentSubmitButton onClick={handleAddComment} disabled={!newComment.trim()}>
              댓글 달기
            </CommentSubmitButton>
          </CommentForm>
        </>
      )}
    </CommentsSection>
  );
};

export default Comments;

const CommentsSection = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const CommentsHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentsTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
`;

const CommentsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const CommentItem = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CommentAuthor = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 0.875rem;
`;

const CommentDate = styled.span`
  color: #666;
  font-size: 0.75rem;
`;

const CommentContent = styled.p`
  color: #333;
  line-height: 1.5;
  margin: 0;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const CommentActionButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    color: #333;
  }
`;

const CommentForm = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid #eaeaea;
  background-color: #f9f9f9;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #ff3e6c;
  }
`;

const CommentSubmitButton = styled.button`
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  background-color: #ff3e6c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e6356a;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
