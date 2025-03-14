const PendingBadge = ({ label }: { label: string }) => {
    return (
        <div>
            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-500/10 dark:text-blue-500">
                <svg
                    className="shrink-0 size-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="12" x2="12" y1="2" y2="6"></line>
                    <line x1="12" x2="12" y1="18" y2="22"></line>
                    <line x1="4.93" x2="7.76" y1="4.93" y2="7.76"></line>
                    <line x1="16.24" x2="19.07" y1="16.24" y2="19.07"></line>
                    <line x1="2" x2="6" y1="12" y2="12"></line>
                    <line x1="18" x2="22" y1="12" y2="12"></line>
                    <line x1="4.93" x2="7.76" y1="19.07" y2="16.24"></line>
                    <line x1="16.24" x2="19.07" y1="7.76" y2="4.93"></line>
                </svg>
                {label}
            </span>
        </div>
    );
};

export default PendingBadge;
