import { mockFetch } from './mock.js';

const db = {
  root: [
    { id: '1', name: 'Docs', type: 'folder' },
    { id: '5', name: 'README.md', type: 'file' },
    { id: '6', name: 'Empty Folder', type: 'folder' },
  ],
  1: [
    { id: '2', name: 'Roadmap.md', type: 'file' },
    { id: '3', name: 'Specs', type: 'folder' },
  ],
  3: [{ id: '4', name: 'Auth.md', type: 'file' }],
  6: [],
};

export const getChildren = (id) => mockFetch(db[id] ?? [], 600, 0.3);

getChildren("3").then((data) => console.log(data)).catch((err) => console.error("failed:", err));