import { Popover, Transition } from '@headlessui/react';
import AvatarImage from 'assets/images/avatarMenu.png';
import { useAuth } from 'contexts/AuthContext';

const Menu = (): JSX.Element => {
  const { logout, user } = useAuth();
  return (
    <Popover className="relative">
      <Popover.Button>
        <img src={AvatarImage.src} className="max-h-10" />
      </Popover.Button>

      <Transition
        enter="transition duration-400 ease-out"
        enterFrom="transform scale-50 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-400 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-50 opacity-0"
      >
        <Popover.Panel className="absolute z-10 transform -left-full top-full mt-2 -translate-x-1/2">
          <div className="rounded bg-gray-50 shadow-2xl ring-1 ring-black ring-opacity-5 max-w-xs mr-6 break-words">
            <div className="py-4 px-8 flex flex-col space-y-2">
              <p className="text-primary-400 font-medium">{user.username}</p>
              <p className="text-gray-500 font-medium">{user.email}</p>
            </div>
            <hr className="bg-black w-10/12 mx-auto" />
            <div className="py-4 px-8 flex flex-col space-y-2">
              <p className="text-primary-400 font-medium cursor-pointer hover:text-accent-400">
                My Profile
              </p>
              <p className="text-primary-400 font-medium cursor-pointer hover:text-accent-400">
                Settings
              </p>
            </div>
            <hr className="bg-black w-full" />
            <div
              className="px-8 py-4 text-accent-600 font-medium cursor-pointer hover:text-accent-900 transition duration-400"
              onClick={logout}
            >
              Logout
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Menu;
