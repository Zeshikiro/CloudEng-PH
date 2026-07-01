'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

interface Discussion {
  id: string;
  display_name: string;
  content: string;
  created_at: string;
  parent_id: string | null;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function DiscussionSection({ lessonSlug }: { lessonSlug: string }) {
  const { user, profile } = useAuth();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDiscussions = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from('discussions')
        .select('*')
        .eq('lesson_slug', lessonSlug)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;
      if (data) {
        setDiscussions(data);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [lessonSlug]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDiscussions();
  }, [fetchDiscussions]);

  const postComment = async (content: string, parentId: string | null = null) => {
    if (!user || !content.trim()) return;
    setPosting(true);
    try {
      const supabase = createClient();
      const { error: insertError } = await supabase.from('discussions').insert({
        lesson_slug: lessonSlug,
        user_id: user.id,
        display_name: profile?.display_name || user.email?.split('@')[0] || 'Anonymous',
        content: content.trim(),
        parent_id: parentId,
      });
      if (insertError) throw insertError;
      setNewComment('');
      setReplyText('');
      setReplyTo(null);
      await fetchDiscussions();
    } catch {
      // Post failed
    } finally {
      setPosting(false);
    }
  };

  const topLevel = discussions.filter(d => !d.parent_id);
  const getReplies = (parentId: string) => discussions.filter(d => d.parent_id === parentId);

  if (error) {
    return (
      <div className="mt-16 p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08]">
        <h2 className="text-xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-3">💬 Discussion</h2>
        <p className="text-slate-500 text-sm">Discussion feature is being set up. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.08]">
      <h2 className="text-xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-6">💬 Discussion</h2>

      {/* Post Input */}
      {user ? (
        <div className="mb-8">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {(profile?.display_name || user.email || '?').substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Ask a question or share your thoughts..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all resize-none"
              />
              <button
                onClick={() => postComment(newComment)}
                disabled={!newComment.trim() || posting}
                className="mt-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold hover:from-blue-400 hover:to-purple-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {posting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
          <p className="text-slate-400 text-sm">
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">Log in</Link> to join the discussion.
          </p>
        </div>
      )}

      {/* Comments */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : topLevel.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-4">Be the first to start a discussion! 💬</p>
      ) : (
        <div className="space-y-6">
          {topLevel.map(comment => (
            <div key={comment.id}>
              <CommentCard
                comment={comment}
                onReply={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                isReplyOpen={replyTo === comment.id}
              />
              {/* Replies */}
              {getReplies(comment.id).map(reply => (
                <div key={reply.id} className="ml-12 mt-3">
                  <CommentCard comment={reply} />
                </div>
              ))}
              {/* Reply Input */}
              {replyTo === comment.id && user && (
                <div className="ml-12 mt-3 flex gap-2">
                  <input
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                  <button
                    onClick={() => postComment(replyText, comment.id)}
                    disabled={!replyText.trim() || posting}
                    className="px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-colors disabled:opacity-40"
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CommentCard({ comment, onReply, isReplyOpen }: { comment: Discussion; onReply?: () => void; isReplyOpen?: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
        {(comment.display_name || '?').substring(0, 2).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-white">{comment.display_name}</span>
          <span className="text-xs text-slate-600">{timeAgo(comment.created_at)}</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{comment.content}</p>
        {onReply && (
          <button
            onClick={onReply}
            className={`mt-1 text-xs font-medium transition-colors ${isReplyOpen ? 'text-blue-400' : 'text-slate-600 hover:text-slate-400'}`}
          >
            {isReplyOpen ? 'Cancel' : 'Reply'}
          </button>
        )}
      </div>
    </div>
  );
}
