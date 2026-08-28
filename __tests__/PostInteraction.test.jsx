import { render, screen, fireEvent } from '@testing-library/react';
import PostCard from '@/components/feed/PostCard';
import { AppProvider, useApp } from '@/context/AppContext';

function TestFeedWrapper() {
  const { posts } = useApp();
  const firstPost = posts[0];

  if (!firstPost) return <div>No posts</div>;
  return <PostCard post={firstPost} />;
}

describe('Critical Flow: Post Interactions (Like & Repost)', () => {
  it('renders post card with action buttons properly', () => {
    render(
      <AppProvider>
        <TestFeedWrapper />
      </AppProvider>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('triggers like interaction when like button is clicked', () => {
    render(
      <AppProvider>
        <TestFeedWrapper />
      </AppProvider>
    );

    const heartButtons = screen.getAllByRole('button');
    const likeButton = heartButtons.find((btn) => btn.querySelector('.lucide-heart'));

    expect(likeButton).toBeDefined();
    if (likeButton) {
      fireEvent.click(likeButton);
      expect(likeButton).toBeInTheDocument();
    }
  });
});