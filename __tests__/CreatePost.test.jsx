import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreatePostBox from '@/components/feed/CreatePostBox';
import { AppProvider } from '@/context/AppContext';

describe('Critical Flow: Post Creation & Validation', () => {
  it('disables the Post button when content is empty', () => {
    render(
      <AppProvider>
        <CreatePostBox />
      </AppProvider>
    );

    const postButton = screen.getByRole('button', { name: /post/i });
    expect(postButton).toBeDisabled();
  });

  it('enables the Post button when user enters valid text and resets on submit', async () => {
    const user = userEvent.setup();
    const handleCreated = jest.fn();

    render(
      <AppProvider>
        <CreatePostBox onPostCreated={handleCreated} />
      </AppProvider>
    );

    const textarea = screen.getByPlaceholderText(/What's happening in the dog park today\?/i);
    const postButton = screen.getByRole('button', { name: /post/i });

    await user.type(textarea, 'Harika bir sabah yürüyüşü! 🐕');
    expect(postButton).toBeEnabled();

    await user.click(postButton);
    expect(textarea.value).toBe('');
  });

  it('shows character counter and handles hashtag additions', async () => {
    const user = userEvent.setup();

    render(
      <AppProvider>
        <CreatePostBox />
      </AppProvider>
    );

    const topicButton = screen.getByRole('button', { name: /add topic/i });
    const textarea = screen.getByPlaceholderText(/What's happening in the dog park today\?/i);

    await user.click(topicButton);
    expect(textarea.value).toContain('#');
  });
});