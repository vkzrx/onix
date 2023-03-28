import type { Component } from 'solid-js';

export const CopyIcon: Component<{ class?: string }> = (props) => {
  return (
    <svg
      class={`${props.class} fill-current`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 0.0330928C6.39525 0.0330928 5.86274 0.0331776 5.49955 0.033256C5.22348 0.0333155 5 0.257142 5 0.533219V9.0331C5 9.63775 5 10.1702 5 10.5334C5 10.8095 5.22386 11.0331 5.5 11.0331H15.5C15.7761 11.0331 16 10.8095 16 10.5334C16 10.1702 16 9.63775 16 9.0331V0.502818C16 0.225578 15.7774 0.00123863 15.5002 0.00271328C14.0134 0.0106214 9.56328 0.0330928 7 0.0330928ZM0.49274 5.0841C0.219468 5.08807 1.98629e-05 5.31062 1.44502e-05 5.58392C7.47501e-06 5.93611 0 6.44965 0 7.0331V14.0331C0 14.6294 7.38117e-06 15.1463 1.43184e-05 15.5004C1.9728e-05 15.7766 0.223874 16.0004 0.500011 16.0004H10.5C10.7761 16.0004 11 15.7766 11 15.5004C11 15.1463 11 14.6294 11 14.0331V12.5331C11 12.257 10.7761 12.0331 10.5 12.0331H9.5C9.22386 12.0331 9 12.257 9 12.5331V13.5331C9 13.8092 8.77614 14.0331 8.5 14.0331H2.5C2.22386 14.0331 2 13.8092 2 13.5331V7.5331C2 7.25695 2.22386 7.0331 2.5 7.0331H3.5C3.77614 7.0331 4 6.80924 4 6.5331V5.54042C4 5.26143 3.77169 5.03641 3.49273 5.04047L0.49274 5.0841Z" />
    </svg>
  );
};
