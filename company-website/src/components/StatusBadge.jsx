const StatusBadge = ({ status }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-coral-soft/60 px-3 py-1 text-xs font-semibold text-ink">
    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-violet" />
    {status}
  </span>
);

export default StatusBadge;
