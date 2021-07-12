type MenuDataType = {
  label: string;
  path: string;
  key: number;
};

const MenuData: MenuDataType[] = [
  { label: 'Features', path: '#features', key: 1 },
  { label: 'Create Room', path: '#', key: 2 },
  { label: 'Testimonials', path: '#', key: 3 },
];

export default MenuData;
