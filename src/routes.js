/**
 * Route Config
 * importPath is relative to src/pages
 * access: ['breakline', 'recruiter', 'participant']
 */
const routes = [
  {
    importPath: '/Home.js',
    name: 'Home',
    path: '/',
    tableId: 'one',
  },
  {
    importPath: '/About.js',
    name: 'About',
    path: '/about',
  },
];

export default routes;
