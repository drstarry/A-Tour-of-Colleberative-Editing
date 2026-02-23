import { useState } from 'react';
import Editor from './components/Editor';
import type { Operation } from './types';
import './App.css';

export default function App() {
  const [ops] = useState<Operation[][]>(() => [[], []]);

  return (
    <div className="app">
      <header className="app-header">
        <img src="/topo.png" alt="topology" className="header-topo" />
        <h1>A Tour of Collaborative Editing</h1>
        <p className="header-sub">
          A list-based CmRDT demo. Type in one editor, <strong>Commit</strong> to
          push operations, then <strong>Sync</strong> in the other to pull.
        </p>
      </header>
      <main className="editors">
        <Editor me={0} peer={1} ops={ops} />
        <Editor me={1} peer={0} ops={ops} />
      </main>
    </div>
  );
}
