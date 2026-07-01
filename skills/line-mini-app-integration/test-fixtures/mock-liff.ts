/**
 * Mock @line/liff for unit testing.
 */

export interface MockLiffState {
  isInClient: boolean;
  isLoggedIn: boolean;
  idToken: string | null;
  profile: {
    userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
  } | null;
}

export function createMockLiff(initial: Partial<MockLiffState> = {}) {
  const state: MockLiffState = {
    isInClient: true,
    isLoggedIn: true,
    idToken: "mock-id-token-12345",
    profile: {
      userId: "U1234567890abcdef",
      displayName: "Test User",
      pictureUrl: "https://example.com/pic.jpg",
    },
    ...initial,
  };

  return {
    init: jest.fn(async (config: { liffId: string; withLoginOnExternalBrowser?: boolean }) => {
      if (!config.liffId) throw new Error("liffId is required");
      return;
    }),
    isInClient: jest.fn(() => state.isInClient),
    isLoggedIn: jest.fn(() => state.isLoggedIn),
    getIDToken: jest.fn(() => state.idToken),
    getProfile: jest.fn(async () => state.profile),
    getDecodedIDToken: jest.fn(() => ({
      iss: "https://access.line.me",
      sub: "U1234567890abcdef",
      aud: "test-channel-id",
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
      name: "Test User",
      picture: "https://example.com/pic.jpg",
    })),
    login: jest.fn(),
    logout: jest.fn(),
    sendMessages: jest.fn(async () => {}),
    openWindow: jest.fn(),
    closeWindow: jest.fn(),
    _state: state,
  };
}

export const mockLineVerifySuccess = {
  iss: "https://access.line.me",
  sub: "U1234567890abcdef",
  aud: "test-channel-id",
  exp: Math.floor(Date.now() / 1000) + 3600,
  iat: Math.floor(Date.now() / 1000),
  name: "Test User",
  picture: "https://example.com/pic.jpg",
  email: "test@example.com",
};

export const mockLineVerifyExpired = {
  ...mockLineVerifySuccess,
  exp: Math.floor(Date.now() / 1000) - 3600,
};

export const mockLineVerifyWrongIssuer = {
  ...mockLineVerifySuccess,
  iss: "https://evil.com",
};

export const mockLineVerifyWrongAudience = {
  ...mockLineVerifySuccess,
  aud: "wrong-channel-id",
};
