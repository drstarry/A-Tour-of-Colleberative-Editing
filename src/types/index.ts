import type Insert from '../crdt/Insert';
import type Delete from '../crdt/Delete';

export type Operation = Insert | Delete;

export interface LogEntry {
  type: 'ins' | 'del';
  loc: number;
  ch?: string;
}

export interface EditorProps {
  me: number;
  peer: number;
  ops: Operation[][];
}
