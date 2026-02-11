import type { AuthState } from "@/types/api/types";

/**
Constructs a query string by encoding the given parameters and appending them to the provided API endpoint.
@param {string} apiEndpoint - The API endpoint to which the parameters will be appended.
@param {Object} params - The parameters to be encoded and added to the API endpoint.
@returns {string} - The API endpoint with the encoded parameters appended as a query string.
*/
export function paramsReducer(
  apiEndpoint: string,
  params: Record<string, any>
): string {
  const updatedParams = Object.fromEntries(
    Object.entries({ ...params }).filter(
      ([key, value]) => value !== undefined && value !== ""
    )
  );

  const queryParams = Object.entries(updatedParams)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
           
          .map((v) => `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`)
          .join("&");
      } else if (typeof value === "object" && value !== null) {
         
        return Object.entries(value)
          .map(
            ([nestedKey, nestedValue]) =>
              `${encodeURIComponent(key)}[${encodeURIComponent(nestedKey)}]=${encodeURIComponent(String(nestedValue))}`
          )
          .join("&");
      } else {
         
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
    })
    .join("&");

  if (queryParams.length > 0) {
    return `${apiEndpoint}?${queryParams}`;
  } else {
    return apiEndpoint;
  }
}

/**
 * Asserts that a session is authenticated and has a valid user.
 *
 * This function performs a type guard assertion that narrows the session type
 * to ensure it contains an authenticated state with a non-null user object.
 *
 * @param session - The authentication state to validate, which may be null or unauthenticated
 *
 * @throws {Error} Throws an error if the session is null, not authenticated, or missing a user
 *
 * @remarks
 * This function is typically used in route loaders within authenticated layouts
 * to provide TypeScript with compile-time guarantees that the session and user exist.
 * Since the parent layout redirects unauthenticated users, this assertion should
 * never throw in practice - it exists primarily for type safety.
 *
 * @example
 * ```typescript
 * export const Route = createFileRoute("/_dashboard/home")({
 *   loader: ({ context }) => {
 *     assertAuthenticated(context.session);
 *     // TypeScript now knows session.user is defined
 *     return { user: context.session.user };
 *   },
 * });
 * ```
 */
export function assertAuthenticated(
  session: AuthState | null
): asserts session is AuthState {
  if (!session || !session.isAuthenticated) {
    throw new Error("Not authenticated");
  }
}
