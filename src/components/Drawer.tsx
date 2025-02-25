import { NavLink, Outlet } from 'react-router';
import * as Icons from '@assets/icons';
import classNames from 'classnames';
import { JSX } from 'react';
import { logoutUser } from '@/services/user';
import { User } from 'firebase/auth';

interface StaticItem {
  text: 'Notes' | 'Log out';
  path: '/notes' | '/home';
  icon: JSX.Element;
}

const staticItem: StaticItem[] = [
  { text: 'Notes', path: '/notes', icon: <Icons.Note size={24} /> },
  { text: 'Log out', path: '/home', icon: <Icons.Logout size={24} /> },
];

interface DrawerProps {
  user: User | null;
}

const Drawer = ({ user }: DrawerProps) => {
  if (!user) return;

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
            {staticItem.map((item) => (
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
                    })
                  }
                  onClick={item.text === 'Log out' ? logoutUser : undefined}
                >
                  {item.icon} <span>{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Drawer;
