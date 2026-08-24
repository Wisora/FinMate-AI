// Example auth service — replace with Firebase, Supabase, or your backend API
export async function getUserProfile() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'user123',
        name: 'Craig',
        email: 'craig@example.com',
        plan: 'Free Plan',
        avatarUrl: null, // optional: add avatar support
      });
    }, 500);
  });
}
