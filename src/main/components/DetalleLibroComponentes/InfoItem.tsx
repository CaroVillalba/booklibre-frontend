

export const InfoItem = ({ label, value }: { label: string, value: string | number | React.ReactNode }) => (
    <div className="flex flex-column mb-4 gap-1">
        <span className='font-bold opacity-70'>{label}</span>
        <span className="font-bold">{value}</span>
    </div>
);