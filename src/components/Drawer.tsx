import { NavLink, Outlet } from 'react-router';
import * as Icons from '@assets/icons';
import classNames from 'classnames';
import { JSX, useState } from 'react';
import { logoutUser } from '@/services/user';
import { User } from 'firebase/auth';
import { getNotes, removeManyLabels, updateLabel } from '@/services/note';
import { useMutation, useQuery } from '@tanstack/react-query';
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

  const labelMutation = useMutation({ mutationFn: updateLabel });
  const { mutate: mutateManyLabels } = useMutation({
    mutationFn: removeManyLabels,
  });

  const [activeLabel, setActiveLabel] = useState<string | null>(null);

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

  const handleEditLabelClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // This prevents the button from propagating to NavLink. Hence preventing
    // navigation to label page
    e.preventDefault();

    const label = (e.target as HTMLButtonElement).value;

    setActiveLabel(label);
  };

  const handleLabelUpdate = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      // Prevents line break
      e.preventDefault();

      const newLabel = (e.target as HTMLSpanElement).textContent as string;

      // activeLabel is the previous value of newLabel
      labelMutation.mutate(
        { label: activeLabel as string, newLabel },
        {
          onSuccess() {
            setActiveLabel(null);
            refetch();
          },
        }
      );
    }
  };

  const handleRemoveLabel = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const label = (e.target as HTMLButtonElement).value;

    console.log('label', label);
    mutateManyLabels(
      { label },
      {
        onSuccess() {
          setActiveLabel(null);
          refetch();
        },
      }
    );
  };

  return (
    <div className='flex'>
      <div className='drawer max-w-fit z-10'>
        <input
          id='my-drawer'
          type='checkbox'
          className='drawer-toggle'
        />
        <div className='drawer-content shadow-sm py-2'>
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
                  {item.icon}{' '}
                  <span
                    contentEditable={activeLabel === item.text}
                    suppressContentEditableWarning={activeLabel === item.text}
                    onClick={(e) => e.preventDefault()}
                    className={classNames('truncate p-1', {
                      'hover:cursor-auto outline-1 rounded-sm':
                        activeLabel === item.text,
                    })}
                    onKeyDown={(e) => handleLabelUpdate(e)}
                  >
                    {item.text}
                  </span>
                  {activeLabel ? (
                    <button
                      className={classNames('btn btn-ghost invisible', {
                        'group-hover:visible': activeLabel === item.text,
                      })}
                      onClick={(e) => handleRemoveLabel(e)}
                      value={item.text}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleEditLabelClick(e)}
                      value={item.text}
                      className='btn btn-ghost invisible group-hover:visible'
                    >
                      Edit
                    </button>
                  )}
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
