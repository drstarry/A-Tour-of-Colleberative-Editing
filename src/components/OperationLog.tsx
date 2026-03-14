import type { LogEntry } from '../types';

interface OperationLogProps {
  entries: LogEntry[];
}

export default function OperationLog({ entries }: OperationLogProps) {
  return (
    <div className="op-log">
      <h3>Uncommitted Operations</h3>
      <div className="op-log-entries">
        {entries.length === 0 ? (
          <span className="op-log-empty">No pending operations</span>
        ) : (
          entries.map((entry, i) => (
            <div key={i} className="op-log-entry">
              {entry.type === 'ins' ? (
                <span className="op-insert">+ {entry.ch} at location {entry.loc}</span>
              ) : (
                <span className="op-delete">− at location {entry.loc}</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
