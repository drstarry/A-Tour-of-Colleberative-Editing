import { useState, useRef } from 'react';
import { Content, Delete, Insert } from '../crdt';
import type { Operation, LogEntry, EditorProps } from '../types';
import OperationLog from './OperationLog';
import './Editor.css';

const NODE_STYLES = [
  { color: '#5a9eaa', glow: 'rgba(90,158,170,0.25)', tilt: '-0.6deg' },
  { color: '#e67e73', glow: 'rgba(230,126,115,0.25)', tilt: '0.5deg' },
];

export default function Editor({ me, peer, ops }: EditorProps) {
  const content = useRef(new Content(me));
  const [value, setValue] = useState('');
  const logs = useRef<Operation[]>([]);
  const idx = useRef(0);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const { color, glow, tilt } = NODE_STYLES[me] ?? NODE_STYLES[0]!;

  function getCursor(): number {
    const text = textRef.current;
    if (!text) return 0;
    return text.selectionStart;
  }

  function onChange(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue = evt.target.value;
    setValue(newValue);

    let loc: number;
    let ch: string | undefined;
    let type: 'ins' | 'del';

    if (newValue.length > content.current.len()) {
      loc = getCursor() - 1;
      ch = newValue[loc];
      type = 'ins';
    } else {
      loc = getCursor();
      type = 'del';
    }

    const op = content.current.apply(loc, type, ch ?? '');
    logs.current.push(op);
    setLogEntries(prev => [...prev, { type, loc, ch }]);
  }

  function sync() {
    const peerOps = ops[peer]!;
    let i = idx.current;
    while (i < peerOps.length) {
      const op = peerOps[i]!;
      if (op instanceof Delete) {
        content.current.applyDelete(op);
      }
      if (op instanceof Insert) {
        content.current.applyInsert(op);
      }
      i++;
    }
    idx.current = i;
    setValue(content.current.toString());
  }

  function commit() {
    const myOps = ops[me]!;
    for (const op of logs.current) {
      myOps.push(op);
    }
    logs.current = [];
    setLogEntries([]);
  }

  return (
    <section
      className="editor-section"
      style={{ '--node-color': color, '--node-glow': glow, '--card-tilt': tilt } as React.CSSProperties}
    >
      <h2 className="editor-title">
        <img className="editor-logo" src="/logo.png" alt="logo" />
        Node {me}
      </h2>
      <textarea
        ref={textRef}
        className="editor-textarea"
        value={value}
        onChange={onChange}
        placeholder="Start typing here..."
      />
      <div className="editor-actions">
        <button className="btn btn-commit" onClick={commit}>
          <img className="action-icon" src="/save.png" alt="commit" />
          Commit
        </button>
        <button className="btn btn-sync" onClick={sync}>
          <img className="action-icon" src="/update.png" alt="sync" />
          Sync
        </button>
      </div>
      <OperationLog entries={logEntries} />
    </section>
  );
}
