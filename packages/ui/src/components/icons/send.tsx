import type { Component } from 'solid-js';

export const SendIcon: Component<{ class?: string }> = (props) => {
  return (
    <svg
      class={`${props.class} fill-current`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.45833 3.03571C8.33333 2.92857 8.16667 2.85714 8 2.85714C7.79167 2.85714 7.625 2.92857 7.5 3.03571L1.5 8.17857C1.25 8.39286 1.25 8.78571 1.5 9C1.75 9.21429 2.20833 9.21429 2.45833 9L7.33333 4.82143V15.4286C7.33333 15.75 7.625 16 8 16C8.33333 16 8.66667 15.75 8.66667 15.4286V4.82143L13.5 9C13.75 9.21429 14.2083 9.21429 14.4583 9C14.7083 8.78571 14.7083 8.39286 14.4583 8.17857L8.45833 3.03571ZM15.3333 0H0.666667C0.291667 0 0 0.285714 0 0.571429C0 0.892857 0.291667 1.14286 0.666667 1.14286H15.3333C15.6667 1.14286 16 0.892857 16 0.571429C16 0.285714 15.6667 0 15.3333 0Z" />
    </svg>
  );
};