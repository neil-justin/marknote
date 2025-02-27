import { NavLink, Outlet } from 'react-router';
import * as Icons from '@assets/icons';
import classNames from 'classnames';
import { JSX } from 'react';
import { logoutUser } from '@/services/user';
import { User } from 'firebase/auth';
import { getNotes } from '@/services/note';
import { useQuery } from '@tanstack/react-query';
import kebabCase from 'just-kebab-case';

interface DrawerItem {
  text: string;
  path: string;
  icon: JSX.Element;
  isLabel?: boolean;
}

const staticItems: DrawerItem[] = [
  { text: 'Notes', path: '/notes', icon: <Icons.Note size={24} /> },
  {
    text: 'Log out',
    path: '/home',
    icon: <Icons.Logout size={24} />,
  },
];

interface DrawerProps {
  user: User | null;
}

const Drawer = ({ user }: DrawerProps) => {
  const { data: notes, refetch } = useQuery({
    queryKey: ['notes'],
    queryFn: () => {
      // Provided queryFn callback won't run when User accidentally visited
      // /notes (or related) path if User is not yet signed in
      if (!user) return;

      return getNotes(user.email as string);
    },
  });

  if (!notes) return;

  // This line: (1) Flattens an Array of Objects of Array 'labels',
  // (2) turn it into a Set (to filter duplicate values), then
  // (3) converts it back to Array
  const labels = Array.from(new Set(notes.flatMap((note) => note.labels)));

  const labelItems: DrawerItem[] = labels.map((label) => {
    return {
      text: label,
      path: `/labels/${kebabCase(label)}`,
      icon: <Icons.Label size={24} />,
      isLabel: true,
    };
  });

  const drawerItems = [
    ...staticItems.slice(0, -1),
    ...labelItems,
    // Log out item
    ...staticItems.slice(-1),
  ];

  return (
    <div className='flex'>
      <div className='drawer max-w-fit z-10'>
        <input
          id='my-drawer'
          type='checkbox'
          className='drawer-toggle'
        />
        <div className='drawer-content shadow-sm'>
          <label
            htmlFor='my-drawer'
            className='btn bg-base-100 border-0 drawer-button'
            data-testid='app-drawer'
          >
            <Icons.Menu size={24} />
          </label>
        </div>
        <div className='drawer-side'>
          <label
            htmlFor='my-drawer'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu bg-base-200 min-h-full w-80 py-8 px-0'>
            {drawerItems.map((item) => (
              <li
                // If item is Log out, push item at the bottom of the drawer
                className={classNames({ 'mt-auto': item.text === 'Log out' })}
                key={item.text}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    classNames('gap-5 font-medium px-6 py-3 rounded-none', {
                      'bg-primary/70': isActive,
                      group: item.isLabel,
                    })
                  }
                  onClick={item.text === 'Log out' ? logoutUser : undefined}
                >
                  {item.icon} <span>{item.text}</span>
                  <button
                    data-label={item.text}
                    className='btn btn-ghost invisible group-hover:visible'
                  >
                    Edit
                  </button>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Outlet context={{ notes, refetch }} />
    </div>
  );
};

export default Drawer;
