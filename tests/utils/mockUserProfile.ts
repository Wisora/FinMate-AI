// Adjust the import path if your UserProfile type lives elsewhere
import type { UserProfile } from '../src/types/UserProfile';

export function createMockUserProfile(
  overrides?: Partial<UserProfile>
): UserProfile {
  return {
    name: 'Test User',
    email: 'test@example.com',
    plan: 'Free',
    avatarUrl: 'https://example.com/avatar.png',
    joinedDate: new Date('2024-01-01'),
    persona: 'tester',
    // add any other required fields from UserProfile here with sensible defaults
    ...overrides, // allow overriding specific fields when needed
  };
}
