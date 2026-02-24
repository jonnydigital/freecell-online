'use client';

import { useState } from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameNumber: number | null;
  moveCount: number;
}

export default function FeedbackModal({ isOpen, onClose, gameNumber, moveCount }: FeedbackModalProps) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          email: email.trim() || undefined,
          context: {
            gameNumber,
            moveCount,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            userAgent: navigator.userAgent,
            url: window.location.href,
          },
        }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('');
        setEmail('');
        setTimeout(() => {
          onClose();
          setStatus('idle');
        }, 2000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Something went wrong');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#0e2e0e] border border-[#1a5c1a]/50 rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Send Feedback</h2>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white/80 text-xl leading-none"
          >
            &times;
          </button>
        </div>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-3">&#10003;</div>
            <p className="text-white/80">Thank you for your feedback!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's on your mind? Bug reports, feature requests, or general feedback..."
              className="w-full h-32 bg-[#072907] border border-[#1a5c1a]/40 rounded p-3 text-white/90 text-sm placeholder:text-white/30 resize-none focus:outline-none focus:border-[#2a7c2a]"
              maxLength={2000}
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional, for follow-up)"
              className="w-full mt-3 bg-[#072907] border border-[#1a5c1a]/40 rounded p-3 text-white/90 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#2a7c2a]"
            />

            {errorMsg && (
              <p className="text-red-400 text-sm mt-2">{errorMsg}</p>
            )}

            <div className="flex items-center justify-between mt-4">
              <span className="text-white/30 text-xs">
                {message.length}/2000
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white/80"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === 'sending' || !message.trim()}
                  className="px-4 py-2 text-sm bg-[#1a5c1a] hover:bg-[#2a7c2a] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors"
                >
                  {status === 'sending' ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
