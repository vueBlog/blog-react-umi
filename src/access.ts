// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.admin && currentUser.admin === 1,
    canUser: currentUser && currentUser.admin === 0 && currentUser.authority === 1,
  };
}
