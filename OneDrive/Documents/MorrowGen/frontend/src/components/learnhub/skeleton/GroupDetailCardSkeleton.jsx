const GroupCardSkeleton = () => {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
            {Array(4).fill(null).map((_,idx) => (

                <div className="rounded-3xl p-6 bg-white shadow-md    animate-pulse h-40" key={idx}>
                    <div className="h-5 w-1/2 bg-gray-300 rounded mb-2" />
                    <div className="h-4 w-1/3 bg-gray-300 rounded" />
                </div>
            ))}
        </div>
    );
};

export default GroupCardSkeleton;
