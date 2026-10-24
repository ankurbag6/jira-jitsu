export const tree = {
  id: 'root', name: 'My Space', type: 'folder', children: [
    { id: '1', name: 'Docs', type: 'folder', children: [
      { id: '2', name: 'Roadmap.md', type: 'file' },
      { id: '3', name: 'Specs', type: 'folder', children: [
        { id: '4', name: 'Auth.md', type: 'file' },
      ]},
    ]},
    { id: '5', name: 'README.md', type: 'file' },
    { id: '6', name: 'Empty Folder', type: 'folder', children: [] },
  ],
};