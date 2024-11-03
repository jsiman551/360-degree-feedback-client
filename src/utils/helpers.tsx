export const renderStars = (score: number) => {
    const fullStars = Math.floor(score);
    const halfStar = score % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<span key={i} className="text-yellow-500" >★</span>);
        } else if (i === fullStars && halfStar) {
            stars.push(<span key={i} className="text-yellow-500" >☆</span>);
        } else {
            stars.push(<span key={i} className="text-gray-400" >☆</span>);
        }
    }

    return <div className="flex justify-center text-2xl" > {stars} </div>;
};

export const getPerformanceMessage = (averageScore: number) => {
    if (averageScore >= 4.5) return "Excellent performance!";
    if (averageScore >= 3.5) return "Good performance!";
    if (averageScore >= 2.5) return "Needs improvement.";
    return "Poor performance. Consider focusing on key areas.";
};
