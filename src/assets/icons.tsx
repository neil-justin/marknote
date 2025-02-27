interface IconProps {
  size: number;
}

export const Label = ({ size }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    className='fill-base-content'
  >
    <path d='M7.78428 14L8.2047 10H4V8H8.41491L8.94043 3H10.9514L10.4259 8H14.4149L14.9404 3H16.9514L16.4259 8H20V10H16.2157L15.7953 14H20V16H15.5851L15.0596 21H13.0486L13.5741 16H9.58509L9.05957 21H7.04855L7.57407 16H4V14H7.78428ZM9.7953 14H13.7843L14.2047 10H10.2157L9.7953 14Z'></path>
  </svg>
);

export const Menu = ({ size }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    className='fill-base-content'
  >
    <path d='M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z'></path>
  </svg>
);

export const Note = ({ size }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    className='fill-base-content'
  >
    <path d='M9.97308 18H14.0269C14.1589 16.7984 14.7721 15.8065 15.7676 14.7226C15.8797 14.6006 16.5988 13.8564 16.6841 13.7501C17.5318 12.6931 18 11.385 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 11.3843 6.46774 12.6917 7.31462 13.7484C7.40004 13.855 8.12081 14.6012 8.23154 14.7218C9.22766 15.8064 9.84103 16.7984 9.97308 18ZM14 20H10V21H14V20ZM5.75395 14.9992C4.65645 13.6297 4 11.8915 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 11.8925 19.3428 13.6315 18.2443 15.0014C17.624 15.7748 16 17 16 18.5V21C16 22.1046 15.1046 23 14 23H10C8.89543 23 8 22.1046 8 21V18.5C8 17 6.37458 15.7736 5.75395 14.9992ZM13 10.0048H15.5L11 16.0048V12.0048H8.5L13 6V10.0048Z'></path>
  </svg>
);

export const Logout = ({ size }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    width={size}
    height={size}
  >
    <path d='M1.99805 21.0001V19.0001L3.99805 18.9999V4.83465C3.99805 4.35136 4.34367 3.93723 4.81916 3.85078L14.2907 2.12868C14.6167 2.0694 14.9291 2.28564 14.9884 2.61167C14.9948 2.64708 14.998 2.68301 14.998 2.719V3.9999L18.998 4.00007C19.5503 4.00007 19.998 4.44779 19.998 5.00007V18.9999L21.998 19.0001V21.0001H17.998V6.00007L14.998 5.9999V21.0001H1.99805ZM12.998 4.3965L5.99805 5.66923V19.0001H12.998V4.3965ZM11.998 11.0001V13.0001H9.99805V11.0001H11.998Z'></path>
  </svg>
);

export const CreateNote = ({ size }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    className='fill-base-content'
  >
    <path d='M16.7574 2.99678L14.7574 4.99678H5V18.9968H19V9.23943L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z'></path>
  </svg>
);

export const MoreAction = ({ size }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    className='fill-base-content'
  >
    <path d='M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z'></path>
  </svg>
);
