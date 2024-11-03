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
