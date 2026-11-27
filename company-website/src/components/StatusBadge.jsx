const StatusBadge = ({ status }) => (
  <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-paper px-2.5 py-0.5 text-xs font-medium text-ink">
    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
    {status}
  </span>
);

export default StatusBadge;
