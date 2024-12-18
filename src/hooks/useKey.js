import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(event) {
        if (event.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);

      // Cleanup function
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [key, action]
  );
}
