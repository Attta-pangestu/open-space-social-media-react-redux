function postedAt (date) {
    const now = new Date();
    const posted = new Date(date);
    const diff = now -posted;
    const diffDays = Math.floor(diff/(1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff/(1000 * 60 * 60 ));

    if(diffDays > 0){
        return `${diffDays} days ago`;
    } if(diffHours > 0) {
        return `${diffHours} hours ago`;
    } return "just now";

}

export {postedAt};